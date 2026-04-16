import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/rapidfire")({
  head: () => ({
    meta: [
      { title: "Rapid Fire — AlgoClash" },
      { name: "description", content: "Fast-paced MCQ coding battles." },
    ],
  }),
  component: RapidFirePage,
});

const mockQuestion = {
  question: "What is the time complexity of binary search?",
  options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
  correct: 1,
};

function RapidFirePage() {
  const [state, setState] = useState<'menu' | 'searching' | 'playing'>('menu');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score] = useState({ me: 3, opponent: 2 });
  const [questionNum] = useState(4);

  if (state === 'searching') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 pt-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent"
        />
        <p className="font-heading text-lg font-semibold">Finding opponent...</p>
        <button onClick={() => setState('playing')} className="rounded-lg border border-border px-5 py-2 text-sm text-muted-foreground hover:text-foreground">
          (Skip to game)
        </button>
      </div>
    );
  }

  if (state === 'playing') {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 pt-16">
        <div className="w-full">
          <div className="flex items-center justify-between text-sm">
            <span className="font-heading font-bold text-primary">You: {score.me}</span>
            <span className="text-muted-foreground">Q{questionNum}/10</span>
            <span className="font-heading font-bold text-destructive">Opponent: {score.opponent}</span>
          </div>

          {/* Timer bar */}
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 10, ease: "linear" }}
              className="h-full bg-gradient-to-r from-primary to-cyan rounded-full"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass mt-6 rounded-2xl p-8"
          >
            <h2 className="font-heading text-xl font-bold">{mockQuestion.question}</h2>
            <div className="mt-6 space-y-3">
              {mockQuestion.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedOption(i)}
                  className={`neon-border w-full rounded-xl p-4 text-left text-sm font-medium transition-all ${
                    selectedOption === i
                      ? i === mockQuestion.correct
                        ? 'border-success bg-success/10 text-success'
                        : 'border-destructive bg-destructive/10 text-destructive'
                      : 'bg-surface hover:bg-surface-elevated'
                  }`}
                >
                  <span className="mr-3 font-mono text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-16">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="font-heading text-4xl font-bold">
          🎯 <span className="text-gradient-primary">Rapid Fire</span>
        </h1>
        <p className="mt-2 text-muted-foreground">10 questions • 10 seconds each • Head-to-head</p>
        <button
          onClick={() => setState('searching')}
          className="glow-primary mt-8 rounded-xl bg-primary px-10 py-4 font-heading text-lg font-bold text-primary-foreground transition-all hover:brightness-110"
        >
          Find Match
        </button>
        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          183 players online
        </p>
      </motion.div>
    </div>
  );
}
