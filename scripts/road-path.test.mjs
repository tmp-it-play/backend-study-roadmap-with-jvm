import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildRoad, poseOnLap, roadPose } from '../src/lib/road-path.ts';

const close = (actual, expected) => assert(Math.abs(actual - expected) < 0.001, `${actual} != ${expected}`);
const heading = (angle) => (angle % 360 + 360) % 360;
const boxes = [
  { left: 30, top: 0, width: 990, height: 700, roadWidth: 40, radius: 115, side: 'right' },
  { left: 30, top: 660, width: 990, height: 850, roadWidth: 40, radius: 115, side: 'left' },
];
const road = buildRoad(boxes);

test('서로 다른 높이의 좌우 구간이 같은 위치와 진행 방향에서 이어진다', () => {
  const end = poseOnLap(road[0], 1);
  const start = poseOnLap(road[1], 0);
  close(end.x, 525); close(end.y, 680);
  close(end.x, start.x); close(end.y, start.y);
  close(heading(end.angle), 180); close(heading(start.angle), 180);
});

test('오른쪽 커브는 원형 중앙선을 따라 45도씩 회전한다', () => {
  const radius = 95;
  const topStraight = 905 - 70;
  const pose = poseOnLap(road[0], (topStraight + Math.PI * radius / 4) / road[0].length);
  close(pose.x, 905 + radius / Math.sqrt(2));
  close(pose.y, 115 - radius / Math.sqrt(2));
  close(pose.angle, 45);
});

test('왼쪽 커브도 반대 방향으로 회전하며 중앙선을 벗어나지 않는다', () => {
  const radius = 95;
  const topStraight = 525 - 145;
  const pose = poseOnLap(road[1], (topStraight + Math.PI * radius / 4) / road[1].length);
  close(pose.x, 145 - radius / Math.sqrt(2));
  close(pose.y, 775 - radius / Math.sqrt(2));
  close(heading(pose.angle), 135);
});

test('세로 도로의 중간에서는 자동차가 아래를 향한다', () => {
  for (const [index, x, y] of [[0, 1000, 350], [1, 50, 1085]]) {
    const lap = road[index];
    const distance = lap.segments[0].length + lap.segments[1].length + lap.segments[2].length / 2;
    const pose = poseOnLap(lap, distance / lap.length);
    close(pose.x, x); close(pose.y, y); close(heading(pose.angle), 90);
  }
});

test('커브와 직선의 모든 연결점에서 위치와 방향이 연속이다', () => {
  for (const lap of road) {
    let distance = 0;
    for (const segment of lap.segments.slice(0, -1)) {
      distance += segment.length;
      const a = poseOnLap(lap, (distance - 0.00001) / lap.length);
      const b = poseOnLap(lap, (distance + 0.00001) / lap.length);
      assert(Math.hypot(a.x - b.x, a.y - b.y) < 0.001);
      const delta = Math.abs(heading(a.angle) - heading(b.angle));
      assert(Math.min(delta, 360 - delta) < 0.001);
    }
  }
});

test('도로 전후의 스크롤은 출발점과 도착점에 고정된다', () => {
  const first = roadPose(road, -1000, 900, 720, 2600);
  const last = roadPose(road, 10000, 900, 720, 2600);
  close(first.x, 70); close(first.y, 20); close(first.angle, 0);
  close(last.x, 980); close(last.y, 1490); close(last.angle, 0);
});

test('역방향 스크롤은 같은 경로를 되짚고 위치 계산은 누적 상태에 의존하지 않는다', () => {
  const forward = [600, 900, 1200, 1500].map((y) => roadPose(road, y, 900, 720, 2600));
  const reverse = [1500, 1200, 900, 600].map((y) => roadPose(road, y, 900, 720, 2600)).reverse();
  assert.deepEqual(forward, reverse);
  assert(forward.every((pose, index) => index === 0 || pose.y >= forward[index - 1].y));
});

test('모바일 도로와 검색으로 남은 단일 구간도 양쪽 끝까지 이동한다', () => {
  const mobile = buildRoad([{ left: 13, top: 0, width: 364, height: 1000, roadWidth: 26, radius: 72, side: 'right' }]);
  const first = poseOnLap(mobile[0], 0);
  const last = poseOnLap(mobile[0], 1);
  close(first.x, 39); close(first.y, 13);
  close(last.x, 39); close(last.y, 987); close(heading(last.angle), 180);
  for (let i = 0; i <= 100; i++) {
    const pose = poseOnLap(mobile[0], i / 100);
    assert(pose.x >= 26 && pose.x <= 364);
    assert(pose.y >= 13 && pose.y <= 987);
  }
});

test('빈 결과와 스크롤할 수 없는 짧은 페이지를 안전하게 처리한다', () => {
  assert.equal(roadPose([], 0, 0, 720, 600), undefined);
  assert.deepEqual(roadPose(road, 0, 0, 3000, 2000), poseOnLap(road[0], 0));
});
