export function DifficultyBadge({ difficulty }: { difficulty: 'Easy' | 'Medium' | 'Hard' }) {
  const styles = {
    Easy: 'bg-success text-black brutal-border',
    Medium: 'bg-warning text-black brutal-border',
    Hard: 'bg-destructive text-black brutal-border',
  };
  return (
    <span className={`inline-flex px-3 py-1 font-mono text-xs font-black uppercase ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
}
