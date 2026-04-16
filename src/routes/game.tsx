import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/game")({
  head: () => ({
    meta: [
      { title: "Game Modes — AlgoClash" },
      { name: "description", content: "Choose your battle mode." },
      { property: "og:title", content: "Game Modes — AlgoClash" },
      { property: "og:description", content: "Choose your battle mode." },
    ],
  }),
  component: GamePage,
});

const modes = [
  {
    icon: "⚔️",
    title: "1v1 Duel",
    desc: "Challenge a friend or random opponent to solve the same problem. First to solve wins!",
    players: 247,
    color: "primary",
  },
  {
    icon: "🎯",
    title: "Rapid Fire",
    desc: "Answer MCQ questions faster than your opponent. 10 questions, 10 seconds each.",
    players: 183,
    color: "cyan",
  },
  {
    icon: "🏆",
    title: "Tournament",
    desc: "Bracket-based coding tournament. Compete through rounds to become the champion.",
    players: 64,
    color: "warning",
  },
];

function GamePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 pt-16">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading text-4xl font-bold"
      >
        Choose Your <span className="text-gradient-primary">Battle</span>
      </motion.h1>
      <p className="mt-2 text-muted-foreground">Select a game mode to start competing</p>

      <div className="mt-12 grid w-full gap-6 sm:grid-cols-3">
        {modes.map((mode, i) => (
          <motion.button
            key={mode.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className={`glass neon-border group relative overflow-hidden rounded-2xl p-8 text-left transition-all ${
              mode.color === 'primary' ? 'hover:glow-primary' : mode.color === 'cyan' ? 'hover:glow-cyan' : 'hover:glow-success'
            }`}
          >
            <div className="text-5xl">{mode.icon}</div>
            <h3 className="mt-4 font-heading text-xl font-bold">{mode.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{mode.desc}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              {mode.players} playing now
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
