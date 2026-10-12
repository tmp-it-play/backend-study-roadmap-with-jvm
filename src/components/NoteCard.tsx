'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Note } from '@/lib/curriculum';
import { stages, stageHref } from '@/lib/curriculum';

export default function NoteCard({ note, expanded = false, anchorId = note.id }: { note: Note; expanded?: boolean; anchorId?: string }) {
  const labels = Object.keys(note.code ?? {});
  const [selected, setSelected] = useState(labels[0]);
  return <details className="note-card" id={anchorId} open={expanded || undefined}>
    <summary><span className="note-icon" aria-hidden="true">i</span><span>{note.title}</span><span className="expand-icon" aria-hidden="true">+</span></summary>
    <div className="note-body">
      <p>{note.body}</p>
      {note.code && <div className="code-compare"><div className="code-tabs" role="group" aria-label={`${note.title} 코드 언어`}>
        {labels.map((label) => <button key={label} aria-pressed={label === selected} onClick={() => setSelected(label)}>{label}</button>)}
      </div><pre aria-label={`${selected} 예제`}><code>{note.code[selected]}</code></pre></div>}
      <p className="note-caution"><strong>기억할 점</strong> {note.pitfall}</p>
      <div className="note-links"><a href={note.source} target="_blank" rel="noreferrer">공식 문서 ↗</a>
        {note.stages.map((id) => { const s = stages.find((s) => s.id === id)!; return <Link key={id} href={stageHref(s)}>{s.title}</Link>; })}
      </div>
    </div>
  </details>;
}
