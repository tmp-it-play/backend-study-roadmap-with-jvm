import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { stages } from '@/lib/curriculum';
import StageDetail from '@/components/StageDetail';

export const dynamicParams = false;
export function generateStaticParams() { return stages.map((s) => ({ slug: s.id })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stage = stages.find((s) => s.id === slug);
  return { title: stage?.title, description: stage?.summary };
}
export default async function StagePage({ params }: Props) {
  const { slug } = await params;
  const stage = stages.find((s) => s.id === slug);
  if (!stage) notFound();
  return <StageDetail stage={stage} />;
}
