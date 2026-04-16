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

const crownIcons = ['👑', '🥈', '🥉'];

function getRankStyle(rating: number) {
  if (rating >= 2500) return 'text-primary';
  if (rating >= 2000) return 'text-cyan';
  if (rating >= 1500) return 'text-warning';
  if (rating >= 1000) return 'text-white';
  return 'text-white/50';
}

function GalaxyPage() {
  const [period, setPeriod] = useState<'all' | 'monthly' | 'weekly'>('all');

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white pb-24 pt-24 font-sans">
      <StarsBackground />
      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-12">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col items-center gap-4"
          >
            <div className="brutal-border bg-cyan px-4 py-1 text-sm font-black text-black uppercase rotate-2 brutal-shadow-sm inline-block">
              Global Rankings
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter mt-2 text-center flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
              <span className="text-white">GALAXY</span>
              <span className="glitch-text text-primary" data-text="LEADERBOARD">LEADERBOARD</span>
            </h1>
          </motion.div>

          {/* Timeframe Selector */}
          <div className="mt-12 flex gap-4">
            {(['all', 'monthly', 'weekly'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`brutal-border px-6 py-2 text-xs font-mono font-black uppercase tracking-wider transition-colors ${
                  period === p 
                    ? 'bg-primary text-black brutal-shadow-sm' 
                    : 'bg-black text-white hover:bg-white hover:text-black border-dashed'
                }`}
              >
                {p === 'all' ? 'All Time' : p}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mt-20 flex items-end justify-center gap-2 md:gap-8 px-2 relative z-20">
          {[1, 0, 2].map(idx => {
            const entry = mockLeaderboard[idx];
            const isFirst = idx === 0;
            const containerHeight = idx === 0 ? 'h-64' : idx === 1 ? 'h-48' : 'h-40';
            const shadowColor = idx === 0 ? 'brutal-shadow-primary' : idx === 1 ? 'brutal-shadow-cyan' : 'brutal-shadow-white';
            
            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, type: 'spring', stiffness: 200 }}
                className={`flex flex-col items-center w-28 md:w-44`}
                style={{ order: idx === 0 ? 1 : idx === 1 ? 0 : 2 }}
              >
                <div className="flex flex-col items-center mb-6 relative z-30">
                   <div className="text-4xl md:text-5xl absolute -top-12 md:-top-16 drop-shadow-2xl">{crownIcons[idx]}</div>
                   <div className={`flex h-14 w-14 md:h-20 md:w-20 items-center justify-center bg-black brutal-border font-heading text-2xl md:text-4xl font-black uppercase text-white ${shadowColor.replace('brutal-', 'brutal-')} shadow-[4px_4px_0px_#fff]`}>
                     {entry.username[0]}
                   </div>
                   <span className="mt-5 font-heading text-sm md:text-lg font-black uppercase tracking-wider truncate w-full text-center tracking-widest">{entry.username}</span>
                   <span className={`text-xl md:text-2xl font-black font-mono mt-1 ${getRankStyle(entry.rating)}`}>{entry.rating}</span>
                </div>
                
                {/* Podium Pillars */}
                <div className={`w-full bg-black brutal-border ${containerHeight} ${shadowColor} flex items-end justify-center pb-6 uppercase font-mono text-[10px] md:text-base font-bold text-white/50 border-b-0`}>
                   #{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Decorative Baseline */}
        <div className="h-[4px] w-full bg-white mb-20 relative z-10 flex border-t border-b border-black">
           {[...Array(20)].map((_, i) => <div key={i} className="flex-1 border-r border-black h-full opacity-50"></div>)}
        </div>

        {/* Full Brutalist Table Grid */}
        <div className="mt-12 bg-black brutal-border brutal-shadow-white overflow-hidden relative">
          <table className="w-full text-sm font-mono border-collapse">
            <thead>
              <tr className="bg-white text-black border-b-[4px] border-black">
                <th className="px-6 py-4 font-black uppercase tracking-widest text-left">RNK</th>
                <th className="px-6 py-4 font-black uppercase tracking-widest text-left">Challenger</th>
                <th className="px-6 py-4 font-black uppercase tracking-widest text-left">ELO Rating</th>
                <th className="px-6 py-4 font-black uppercase tracking-widest text-right hidden sm:table-cell">Cases Solved</th>
                <th className="px-6 py-4 font-black uppercase tracking-widest text-right hidden sm:table-cell">Streak</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.map((entry, i) => {
                const isCurrentUser = entry.username === 'clash_master'; // Simulating active user
                return (
                  <motion.tr
                    key={entry.rank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`border-b border-white/20 transition-all hover:bg-white hover:text-black group ${
                      isCurrentUser ? 'bg-primary/20 hover:bg-primary border-primary' : 'bg-transparent'
                    }`}
                  >
                    <td className={`px-6 py-5 font-black text-lg ${isCurrentUser ? 'text-primary group-hover:text-black' : 'text-white/50 group-hover:text-black'}`}>
                      {String(entry.rank).padStart(3, '0')}
                    </td>
                    <td className="px-6 py-5 relative">
                      {isCurrentUser && <span className="absolute left-0 top-0 bottom-0 w-2 bg-primary group-hover:bg-black"></span>}
                      <div className="flex items-center gap-4">
                        <div className={`flex h-8 w-8 items-center justify-center brutal-border text-xs font-black uppercase ${isCurrentUser ? 'bg-primary text-black' : 'bg-black text-white group-hover:bg-white group-hover:text-black group-hover:border-black'}`}>
                          {entry.username[0]}
                        </div>
                        <span className={`font-black uppercase tracking-widest ${isCurrentUser ? 'text-primary group-hover:text-black' : 'text-white group-hover:text-black'}`}>{entry.username}</span>
                      </div>
                    </td>
                    <td className={`px-6 py-5 font-black text-lg ${isCurrentUser ? 'group-hover:text-black text-white' : getRankStyle(entry.rating)}`}>
                      {entry.rating}
                    </td>
                    <td className="px-6 py-5 hidden sm:table-cell text-right uppercase tracking-wider font-bold">
                      {entry.solved} <span className="text-white/30 text-[10px] group-hover:text-black/40">CASES</span>
                    </td>
                    <td className="px-6 py-5 hidden sm:table-cell text-right font-black uppercase text-warning group-hover:text-black">
                      {entry.streak} FIRE
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
          
          {/* Data Footer */}
          <div className="bg-black border-t-2 border-white p-3 flex justify-between font-mono text-[10px] uppercase text-muted-foreground font-bold tracking-widest">
             <span>Data Sync: SECURE</span>
             <span className="items-center flex gap-2"><span className="h-2 w-2 rounded-full bg-success inline-block animate-pulse"></span> TERMINAL ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
