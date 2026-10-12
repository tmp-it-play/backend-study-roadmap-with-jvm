import CopyButton from './CopyButton';

export default function CodeBlock({ code, label }: { code: string; label: string }) {
  return <div className="code-compare">
    <div className="code-header"><span className="code-label">{label}</span><CopyButton key={code} text={code} label={label} /></div>
    <pre tabIndex={0} aria-label={label}><code>{code}</code></pre>
  </div>;
}
