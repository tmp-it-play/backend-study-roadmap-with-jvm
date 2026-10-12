import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
// ZIP store 형식: 별도 압축 도구 없이 실행 가능한 소스 묶음을 만든다.
function crc32(bytes) {
 let crc=0xffffffff;
 for(const byte of bytes) { crc^=byte; for(let bit=0;bit<8;bit++) crc=(crc>>>1)^((crc&1)?0xedb88320:0); }
 return (crc^0xffffffff)>>>0;
}
function walk(dir) {
 return readdirSync(dir).sort().flatMap(name=>{
  if(['build','.gradle','.kotlin','.DS_Store'].includes(name)) return [];
  const path=join(dir,name);
  return statSync(path).isDirectory()?walk(path):[path];
 });
}
const files=walk('examples');
const local=[]; const central=[]; let offset=0;
for(const path of files) {
 const name=Buffer.from('jvm-labs/'+path); const data=readFileSync(path); const crc=crc32(data);
 const header=Buffer.alloc(30); header.writeUInt32LE(0x04034b50); header.writeUInt16LE(20,4);
 header.writeUInt16LE(0x800,6); header.writeUInt16LE(33,12);
 header.writeUInt32LE(crc,14); header.writeUInt32LE(data.length,18); header.writeUInt32LE(data.length,22); header.writeUInt16LE(name.length,26);
 local.push(header,name,data);
 const entry=Buffer.alloc(46); entry.writeUInt32LE(0x02014b50); entry.writeUInt16LE(0x0314,4); entry.writeUInt16LE(20,6);
 entry.writeUInt16LE(0x800,8); entry.writeUInt16LE(33,14); entry.writeUInt32LE(crc,16);
 entry.writeUInt32LE(data.length,20); entry.writeUInt32LE(data.length,24); entry.writeUInt16LE(name.length,28);
 entry.writeUInt32LE(((path.endsWith('/gradlew')?0o100755:0o100644)<<16)>>>0,38); entry.writeUInt32LE(offset,42);
 central.push(entry,name); offset+=header.length+name.length+data.length;
}
const directory=Buffer.concat(central); const end=Buffer.alloc(22);
end.writeUInt32LE(0x06054b50); end.writeUInt16LE(files.length,8); end.writeUInt16LE(files.length,10);
end.writeUInt32LE(directory.length,12); end.writeUInt32LE(offset,16);
mkdirSync('public/downloads',{recursive:true});
writeFileSync('public/downloads/jvm-labs.zip',Buffer.concat([...local,directory,end]));
console.log('Packaged '+files.length+' learning files.');
