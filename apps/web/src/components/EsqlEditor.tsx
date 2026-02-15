type EsqlEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function EsqlEditor({ value, onChange }: EsqlEditorProps) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <span>ESQL input</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={16}
        style={{
          width: '100%',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          fontSize: '0.9rem',
          padding: '0.75rem',
        }}
        placeholder="Paste your ESQL code here"
      />
    </label>
  );
}
