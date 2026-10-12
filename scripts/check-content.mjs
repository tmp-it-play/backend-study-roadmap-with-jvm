import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderRoadmap } from './generate-roadmap.mjs';

const curriculum = JSON.parse(readFileSync('src/content/curriculum.json', 'utf8'));
const notes = JSON.parse(readFileSync('src/content/notes.json', 'utf8'));
const stageIds = new Set();
const noteIds = new Set();
const chapterKeys = new Set();
const slug = /^[a-z][a-z0-9-]*$/;
const url = (value) => assert.equal(new URL(value).protocol, 'https:');
for (const s of curriculum.stages) {
  assert(slug.test(s.id) && !stageIds.has(s.id), `Invalid or duplicate stage: ${s.id}`);
  stageIds.add(s.id);
  for (const field of ['title', 'goal', 'lab', 'area', 'summary']) assert(s[field]?.trim(), `${s.id}: missing ${field}`);
  assert(s.chapters.length && s.checks.length && s.sources.length, `${s.id}: incomplete stage`);
  for (const c of s.chapters) {
    const key = `${s.id}/${c.id}`;
    assert(slug.test(c.id) && !chapterKeys.has(key), `Duplicate/invalid chapter: ${key}`);
    assert(c.title.trim() && c.topics.length >= 3 && c.topics.every((t) => t.trim()), `${key}: incomplete outline`);
    chapterKeys.add(key);
  }
  s.sources.forEach((s) => url(s.url));
}
const visited = new Set();
function visit(id, path = new Set()) {
  assert(stageIds.has(id), `Unknown prerequisite: ${id}`);
  assert(!path.has(id), `Prerequisite cycle: ${[...path, id].join(' -> ')}`);
  if (visited.has(id)) return;
  const stage = curriculum.stages.find((s) => s.id === id);
  for (const dependency of [...stage.prerequisites, ...(stage.anyPrerequisites ?? [])]) visit(dependency, new Set([...path, id]));
  visited.add(id);
}
stageIds.forEach((id) => visit(id));
for (const n of notes) {
  assert(slug.test(n.id) && !noteIds.has(n.id), `Duplicate/invalid note: ${n.id}`);
  noteIds.add(n.id);
  assert(n.title && n.body && n.pitfall && n.stages.length, `${n.id}: incomplete note`);
  n.stages.forEach((id) => assert(stageIds.has(id), `${n.id}: unknown stage ${id}`));
  url(n.source);
}
assert.equal(readFileSync('docs/ROADMAP.md', 'utf8'), renderRoadmap(curriculum, notes), 'ROADMAP.md is stale. Run npm run docs.');
console.log(`Content valid: ${stageIds.size} stages, ${chapterKeys.size} chapters, ${noteIds.size} notes; references and prerequisites consistent.`);
