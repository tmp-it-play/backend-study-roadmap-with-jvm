import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const curriculum = JSON.parse(readFileSync('src/content/curriculum.json', 'utf8'));
const notes = JSON.parse(readFileSync('src/content/notes.json', 'utf8'));
const stageIds = new Set();
const noteIds = new Set();
const chapterKeys = new Set();
const lessonKeys = new Set();
const prose = new Set();
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
  const lessons = JSON.parse(readFileSync(`src/content/lessons/${s.id}.json`, 'utf8'));
  assert.equal(lessons.length, s.chapters.length, `${s.id}: chapter/lesson count mismatch`);
  for (const lesson of lessons) {
    const key = `${s.id}/${lesson.id}`;
    const chapter = s.chapters.find((c) => c.id === lesson.id);
    assert(chapter && !lessonKeys.has(key), `Unknown or duplicate lesson: ${key}`);
    lessonKeys.add(key);
    for (const field of ['goal', 'intro', 'explanation']) assert(lesson[field]?.trim().length >= 20, `${key}: missing ${field}`);
    assert.equal(lesson.sections.length, chapter.topics.length, `${key}: uncovered topic`);
    for (const paragraph of lesson.sections) {
      assert(paragraph.trim().length >= 50, `${key}: incomplete concept`);
      assert(!prose.has(paragraph), `${key}: duplicated concept prose`);
      prose.add(paragraph);
    }
    assert(lesson.examples.length > 0, `${key}: missing example`);
    const labels = new Set();
    for (const example of lesson.examples) {
      assert(example.label && !labels.has(example.label), `${key}: duplicate example label`);
      labels.add(example.label);
      assert(example.code.trim().length > 0 && !example.code.includes('```'), `${key}: empty example or nested Markdown fence`);
    }
    assert(lesson.exercise.steps.length >= 2 && lesson.exercise.steps.every((step) => step.length >= 10), `${key}: incomplete exercise`);
    assert(lesson.exercise.expected.length >= 20, `${key}: missing expected result`);
    assert(lesson.pitfalls.length && lesson.pitfalls.every((p) => p.length >= 20), `${key}: missing pitfall`);
    assert(lesson.quiz.length && lesson.quiz.every((q) => q.question.length >= 10 && q.answer.length >= 30), `${key}: incomplete self-check`);
    assert(lesson.sources.length > 0, `${key}: missing source`);
    lesson.sources.forEach((source) => { assert(source.title); url(source.url); });
  }
}
assert.deepEqual([...lessonKeys].sort(), [...chapterKeys].sort(), 'Every chapter must have exactly one lesson');
assert.deepEqual(readdirSync('src/content/lessons').filter((name) => name.endsWith('.json')).sort(), [...stageIds].map((id) => `${id}.json`).sort(), 'Unexpected lesson data files');
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
const practice = JSON.parse(readFileSync('src/content/practice.json', 'utf8'));
assert.deepEqual(practice.map((lab) => lab.stage).sort(), [...stageIds].sort(), 'Every stage needs a practice guide');
for (const lab of practice) {
  for (const field of ['title', 'requires', 'command', 'task', 'expected', 'verify']) assert(lab[field]?.trim(), lab.stage + ': missing practice ' + field);
  for (const file of lab.files) assert(existsSync('examples/' + file), lab.stage + ': missing practice file ' + file);
  assert(!lab.simulator || ['beans','request','transaction','queries','stock'].includes(lab.simulator));
}
console.log(`Content valid: ${stageIds.size} stages, ${lessonKeys.size} complete lessons, ${prose.size} concept sections, ${noteIds.size} notes, ${practice.length} practice guides; prerequisites consistent.`);
