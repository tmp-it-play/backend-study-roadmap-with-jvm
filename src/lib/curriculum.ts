import data from '@/content/curriculum.json';
import noteData from '@/content/notes.json';

export interface Chapter { id: string; title: string; topics: string[] }
export interface Stage {
  id: string; title: string; area: string; level: string; summary: string; goal: string;
  prerequisites: string[]; anyPrerequisites?: string[]; chapters: Chapter[];
  lab: string; checks: string[]; sources: { title: string; url: string }[]; optional: boolean;
}
export interface Note {
  id: string; title: string; stages: string[]; body: string; pitfall: string; source: string;
  code?: Record<string, string>;
}
export const curriculum: { title: string; reviewedAt: string; stages: Stage[] } = data;
export const stages = curriculum.stages;
export const notes = noteData as Note[];
export const chapterKey = (stage: Stage, chapter: Chapter) => `${stage.id}/${chapter.id}`;
export const coreStages = stages.filter((s) => !s.optional);
export const coreKeys = coreStages.flatMap((s) => s.chapters.map((c) => chapterKey(s, c)));
export const allKeys = new Set(stages.flatMap((s) => s.chapters.map((c) => chapterKey(s, c))));
export const totalChapters = allKeys.size;
export const stageHref = (s: Stage, c?: Chapter) => `/stages/${s.id}${c ? `#${c.id}` : ''}`;
export const numberOf = (s: Stage) => String(stages.findIndex((item) => item.id === s.id) + 1).padStart(2, '0');
export const relatedNotes = (s: Stage) => notes.filter((n) => n.stages.includes(s.id));
export const stageText = (s: Stage) => [s.title, s.area, s.summary, ...s.chapters.flatMap((c) => [c.title, ...c.topics])].join(' ').toLocaleLowerCase();
