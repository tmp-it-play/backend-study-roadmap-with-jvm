type Point = { x: number; y: number };
type Segment =
  | { kind: 'line'; from: Point; to: Point; length: number }
  | { kind: 'arc'; center: Point; radius: number; start: number; sweep: number; length: number };
export type RoadBounds = { left: number; top: number; width: number; height: number; roadWidth: number; radius: number; side: 'left' | 'right' };
export type RoadLap = { top: number; bottom: number; length: number; segments: Segment[] };
export type RoadPose = Point & { angle: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const line = (from: Point, to: Point): Segment => ({ kind: 'line', from, to, length: Math.hypot(to.x - from.x, to.y - from.y) });
const arc = (center: Point, radius: number, start: number, sweep: number): Segment => ({ kind: 'arc', center, radius, start, sweep, length: radius * Math.abs(sweep) });

/** CSS border로 그린 도로의 중앙선을 잇는다. 겹치는 가로 도로는 중간 지점에서 다음 구간에 넘긴다. */
export function buildRoad(bounds: RoadBounds[]): RoadLap[] {
  return bounds.map((box, index) => {
    const half = box.roadWidth / 2;
    const left = box.left + half;
    const right = box.left + box.width - half;
    const top = box.top + half;
    const bottom = box.top + box.height - half;
    const radius = Math.max(0, Math.min(box.radius, box.height / 2, box.width) - half);
    const middle = (left + right) / 2;
    const clockwise = box.side === 'right';
    const edge = clockwise ? right : left;
    const cornerX = edge + (clockwise ? -radius : radius);
    const startX = index === 0 ? (clockwise ? left + half : right - half) : middle;
    const endX = index === bounds.length - 1 ? (clockwise ? left + half : right - half) : middle;
    const sweep = (clockwise ? 1 : -1) * Math.PI / 2;
    const segments = [
      line({ x: startX, y: top }, { x: cornerX, y: top }),
      arc({ x: cornerX, y: top + radius }, radius, -Math.PI / 2, sweep),
      line({ x: edge, y: top + radius }, { x: edge, y: bottom - radius }),
      arc({ x: cornerX, y: bottom - radius }, radius, clockwise ? 0 : Math.PI, sweep),
      line({ x: cornerX, y: bottom }, { x: endX, y: bottom }),
    ].filter((segment) => segment.length > 0);
    return { top, bottom, segments, length: segments.reduce((sum, segment) => sum + segment.length, 0) };
  });
}

export function poseOnLap(lap: RoadLap, progress: number): RoadPose {
  let distance = clamp(progress, 0, 1) * lap.length;
  for (const [index, segment] of lap.segments.entries()) {
    if (distance <= segment.length || index === lap.segments.length - 1) {
      const t = clamp(distance / segment.length, 0, 1);
      if (segment.kind === 'line') {
        const dx = segment.to.x - segment.from.x;
        const dy = segment.to.y - segment.from.y;
        return { x: segment.from.x + dx * t, y: segment.from.y + dy * t, angle: Math.atan2(dy, dx) * 180 / Math.PI };
      }
      const angle = segment.start + segment.sweep * t;
      return {
        x: segment.center.x + segment.radius * Math.cos(angle),
        y: segment.center.y + segment.radius * Math.sin(angle),
        angle: (angle + Math.sign(segment.sweep) * Math.PI / 2) * 180 / Math.PI,
      };
    }
    distance -= segment.length;
  }
  return { x: 0, y: lap.top, angle: 0 };
}

/** 구간 높이를 기준으로 스크롤을 배분해 긴 모바일 구간에서도 자동차가 읽는 위치 근처에 머무르게 한다. */
export function roadPose(road: RoadLap[], scrollY: number, trackTop: number, viewportHeight: number, pageHeight: number): RoadPose | undefined {
  if (!road.length) return undefined;
  const first = road[0];
  const last = road[road.length - 1];
  const maxScroll = Math.max(0, pageHeight - viewportHeight);
  const start = clamp(trackTop + first.top - viewportHeight / 2, 0, maxScroll);
  const end = clamp(trackTop + last.bottom - viewportHeight / 2, start, maxScroll);
  const progress = end > start ? clamp((scrollY - start) / (end - start), 0, 1) : 0;
  const y = first.top + (last.bottom - first.top) * progress;
  const lap = road.find((section) => y <= section.bottom) ?? last;
  return poseOnLap(lap, (y - lap.top) / (lap.bottom - lap.top));
}
