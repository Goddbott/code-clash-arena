import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { mockLeaderboard } from "../lib/mock-data";
import { StarsBackground } from "../components/StarsBackground";

export const Route = createFileRoute("/galaxy")({
  head: () => ({
    meta: [
      { title: "Galaxy Leaderboard — AlgoClash" },
      { name: "description", content: "Global competitive coding leaderboard." },
      { property: "og:title", content: "Galaxy Leaderboard — AlgoClash" },
      { property: "og:description", content: "Global competitive coding leaderboard." },
    ],
  }),
  component: GalaxyPage,
});

const rankClasses = ['rank-gold', 'rank-silver', 'rank-bronze'];
const crownIcons = ['👑', '🥈', '🥉'];

function getRankStyle(rating: number) {
  if (rating >= 2500) return 'rank-diamond';
  if (rating >= 2000) return 'rank-platinum';
  if (rating >= 1500) return 'rank-gold';
  if (rating >= 1000) return 'rank-silver';
  return 'rank-bronze';
}

function GalaxyPage() {
  const [period, setPeriod] = useState<'all' | 'monthly' | 'weekly'>('all');

  return (
    <div className="relative min-h-screen">
      <StarsBackground />
      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-24 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center font-heading text-4xl font-bold"
        >
          🌌 <span className="text-gradient-primary">Galaxy</span> Leaderboard
        </motion.h1>

        <div className="mt-6 flex justify-center gap-2">
          {(['all', 'monthly', 'weekly'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
                period === p ? 'bg-primary text-primary-foreground' : 'bg-surface-elevated text-muted-foreground hover:text-foreground'
              }`}
            >
              {p === 'all' ? 'All Time' : p}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        <div className="mt-10 flex items-end justify-center gap-4">
          {[1, 0, 2].map(idx => {
            const entry = mockLeaderboard[idx];
            const isFirst = idx === 0;
            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-elevated flex flex-col items-center rounded-2xl p-5 ${
                  isFirst ? 'scale-110 glow-primary' : ''
                }`}
                style={{ order: idx === 0 ? 1 : idx === 1 ? 0 : 2 }}
              >
                <span className="text-2xl">{crownIcons[idx]}</span>
                <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 font-heading text-lg font-bold text-primary">
                  {entry.username[0].toUpperCase()}
                </div>
                <span className="mt-2 font-heading text-sm font-bold">{entry.username}</span>
                <span className={`text-lg font-bold ${rankClasses[idx] || 'text-foreground'}`}>{entry.rating}</span>
                <span className="text-xs text-muted-foreground">{entry.solved} solved</span>
              </motion.div>
            );
          })}
        </div>

        {/* Full table */}
        <div className="mt-10 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Rank</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Solved</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Streak</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.map((entry, i) => (
                <motion.tr
                  key={entry.rank}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`border-b border-border/50 transition-colors hover:bg-surface-elevated ${
                    entry.username === 'clash_master' ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-mono font-bold text-muted-foreground">#{entry.rank}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                        {entry.username[0].toUpperCase()}
                      </div>
                      <span className="font-medium">{entry.username}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-3 font-bold ${getRankStyle(entry.rating)}`}>{entry.rating}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{entry.solved}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">🔥 {entry.streak}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
