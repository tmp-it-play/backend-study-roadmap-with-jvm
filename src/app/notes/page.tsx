import type { Metadata } from 'next';
import NotesDirectory from '@/components/NotesDirectory';
export const metadata: Metadata = { title: '보충 지식', description: 'Groovy DSL과 Kotlin DSL부터 언어와 Spring의 차이까지, 짧게 연결하는 32개의 보충 설명.' };
export default function NotesPage() { return <NotesDirectory />; }
