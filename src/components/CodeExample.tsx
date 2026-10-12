'use client';

import { useState } from 'react';

export default function CodeExample({ examples }: { examples: { label: string; code: string }[] }) {
  const [selected, setSelected] = useState(0);
  return <div className="code-compare lesson-code">
    <div className="code-tabs" role="group" aria-label="예제 언어 선택">
      {examples.map((example, index) => <button key={example.label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{example.label}</button>)}
    </div>
    {examples.map((example, index) => <pre key={example.label} hidden={selected !== index} aria-label={`${example.label} 예제`} tabIndex={0}><code>{example.code}</code></pre>)}
  </div>;
}
