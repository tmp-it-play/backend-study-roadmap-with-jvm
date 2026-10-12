import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { stages } from '@/lib/curriculum';
import { getLessons } from '@/lib/lessons.server';
import LessonDetail from '@/components/LessonDetail';

export const dynamicParams = false;
export function generateStaticParams() {
  return stages.flatMap((stage) => stage.chapters.map((chapter) => ({ slug: stage.id, chapter: chapter.id })));
}
type Props = { params: Promise<{ slug: string; chapter: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, chapter: chapterId } = await params;
  const stage = stages.find((item) => item.id === slug);
  const chapter = stage?.chapters.find((item) => item.id === chapterId);
  return { title: chapter?.title, description: chapter?.topics.join(' · ') };
}
export default async function LessonPage({ params }: Props) {
  const { slug, chapter: chapterId } = await params;
  const stage = stages.find((item) => item.id === slug);
  const chapter = stage?.chapters.find((item) => item.id === chapterId);
  if (!stage || !chapter) notFound();
  const lesson = getLessons(slug).find((item) => item.id === chapterId);
  if (!lesson) notFound();
  return <LessonDetail stage={stage} chapter={chapter} lesson={lesson} />;
}
