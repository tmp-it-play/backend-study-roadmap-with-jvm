import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { stages } from './curriculum';
import type { Lesson } from './lesson-types';

// Only imported by Server Components; chapter prose stays out of the global client bundle.
export function getLessons(stageId: string): Lesson[] {
  if (!stages.some((stage) => stage.id === stageId)) return [];
  return JSON.parse(readFileSync(join(process.cwd(), 'src/content/lessons', `${stageId}.json`), 'utf8'));
}
