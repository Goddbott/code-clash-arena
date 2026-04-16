export function DifficultyBadge({ difficulty }: { difficulty: 'Easy' | 'Medium' | 'Hard' }) {
  const styles = {
    Easy: 'bg-success/15 text-success',
    Medium: 'bg-warning/15 text-warning',
    Hard: 'bg-destructive/15 text-destructive',
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
}
