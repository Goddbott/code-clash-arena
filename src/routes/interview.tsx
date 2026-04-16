import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title: "AI Interview — AlgoClash" },
      { name: "description", content: "Practice mock interviews with AI." },
    ],
  }),
  component: InterviewPage,
});

const roles = [
  { label: "Software Engineer", icon: "💻" },
  { label: "Frontend Dev", icon: "🎨" },
  { label: "Backend Dev", icon: "⚙️" },
  { label: "DS / ML Engineer", icon: "🧠" },
];

function InterviewPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string>("Medium");
  const [started, setStarted] = useState(false);

  if (started) {
    return (
      <div className="mx-auto min-h-screen max-w-3xl px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-2xl animate-glow-pulse">
              🤖
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold">AI Interviewer</h2>
              <p className="text-xs text-muted-foreground">{selected} • {difficulty}</p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="rounded-lg bg-surface p-4">
              <p className="text-sm text-muted-foreground">Question 1 of 5</p>
              <p className="mt-2 text-sm text-foreground">
                Tell me about a time you had to optimize a system for performance.
                What was the bottleneck, how did you identify it, and what was your approach?
              </p>
            </div>

            <textarea
              placeholder="Type your answer here..."
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary"
              rows={6}
            />

            <div className="flex gap-3">
              <button className="glow-primary rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
                Submit Answer
              </button>
              <button className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-surface-elevated">
                Skip
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 pt-16">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-center font-heading text-3xl font-bold">
          AI <span className="text-gradient-primary">Interview</span> Prep
        </h1>
        <p className="mt-2 text-center text-muted-foreground">Practice with an AI interviewer and get real-time feedback</p>
      </motion.div>

      <div className="mt-10 w-full max-w-md space-y-6">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Select Role</label>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {roles.map(role => (
              <button
                key={role.label}
                onClick={() => setSelected(role.label)}
                className={`neon-border rounded-xl p-4 text-left transition-all ${
                  selected === role.label ? 'border-primary bg-primary/10 glow-primary' : 'bg-surface hover:bg-surface-elevated'
                }`}
              >
                <span className="text-2xl">{role.icon}</span>
                <div className="mt-2 text-sm font-medium">{role.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Difficulty</label>
          <div className="mt-3 flex gap-2">
            {["Easy", "Medium", "Hard"].map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                  difficulty === d ? 'bg-primary text-primary-foreground' : 'bg-surface-elevated text-muted-foreground hover:text-foreground'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setStarted(true)}
          disabled={!selected}
          className="glow-primary w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}
