export interface Lesson {
  id: string;
  goal: string;
  intro: string;
  sections: string[];
  examples: { label: string; code: string }[];
  explanation: string;
  exercise: { steps: string[]; expected: string };
  pitfalls: string[];
  quiz: { question: string; answer: string }[];
  sources: { title: string; url: string }[];
}
