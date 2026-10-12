import { skylineSVG, carSVG } from '@/lib/scenery';

export function Skyline() {
  return <div className="skyline-wrap" aria-hidden="true" dangerouslySetInnerHTML={{ __html: skylineSVG(26) }} />;
}
export function Car() {
  return <span className="road-car" aria-hidden="true" dangerouslySetInnerHTML={{ __html: carSVG() }} />;
}
