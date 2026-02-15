import ValidatePage from './routes/ValidatePage';

export default function App() {
  return (
    <main style={{ maxWidth: '1080px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>ESQLGuru</h1>
      <p>Run deterministic checks for IBM ACE ESQL snippets.</p>
      <ValidatePage />
    </main>
  );
}
