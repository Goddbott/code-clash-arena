import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { mockProblems, allTags } from "../lib/mock-data";
import { DifficultyBadge } from "../components/DifficultyBadge";
import { StarsBackground } from "../components/StarsBackground";

export const Route = createFileRoute("/problems")({
  head: () => ({
    meta: [
      { title: "Problems — AlgoClash" },
      { name: "description", content: "Browse and solve algorithmic coding problems." },
      { property: "og:title", content: "Problems — AlgoClash" },
      { property: "og:description", content: "Browse and solve algorithmic coding problems." },
    ],
  }),
  component: ProblemsPage,
});

function ProblemsPage() {
  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filtered = mockProblems.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (diffFilter !== "All" && p.difficulty !== diffFilter) return false;
    if (statusFilter !== "All" && p.status !== statusFilter.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-black pb-12 pt-24 font-sans text-white">
      <StarsBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col items-start gap-2"
        >
          <div className="brutal-border bg-primary px-4 py-1 text-sm font-black text-black uppercase brutal-shadow-sm">
            Arena Database
          </div>
          <h1 className="font-heading text-5xl font-black uppercase tracking-tighter md:text-7xl">
            <span className="glitch-text text-white" data-text="PROBLEM">PROBLEM</span>
            <span className="text-cyan"> ARCHIVE</span>
          </h1>
        </motion.div>

        {/* Controls Layout */}
        <div className="brutal-border brutal-shadow-cyan bg-black p-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8 relative z-10 max-w-full">
          
          <div className="flex-1 w-full relative">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
             <input
               type="text"
               placeholder="Search protocol..."
               value={search}
               onChange={e => setSearch(e.target.value)}
               className="brutal-border w-full bg-white px-12 py-3 text-sm font-bold uppercase text-black placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all font-mono"
             />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-mono text-xs font-bold text-muted-foreground uppercase">Level:</span>
              {["All", "Easy", "Medium", "Hard"].map(d => (
                <button
                  key={d}
                  onClick={() => setDiffFilter(d)}
                  className={`brutal-border px-4 py-2 text-xs font-black uppercase transition-colors ${
                    diffFilter === d 
                      ? "bg-primary text-black" 
                      : "bg-black text-white hover:bg-white hover:text-black"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="hidden h-8 w-1 bg-white/20 md:block"></div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-mono text-xs font-bold text-muted-foreground uppercase">Status:</span>
              {["All", "Solved", "Attempted", "Unsolved"].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`brutal-border px-4 py-2 text-xs font-black uppercase transition-colors ${
                    statusFilter === s 
                      ? "bg-cyan text-black" 
                      : "bg-black text-white hover:bg-white hover:text-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2 relative z-10">
          {allTags.slice(0, 15).map(tag => (
            <span 
              key={tag} 
              className="brutal-border border-2 border-white/20 bg-black/50 backdrop-blur-md px-3 py-1 font-mono text-xs font-bold uppercase text-muted-foreground transition-all hover:border-primary hover:text-primary cursor-pointer hover:-translate-y-1"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Table */}
        <div className="brutal-border brutal-shadow-primary relative z-10 overflow-x-auto bg-black">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b-[4px] border-white bg-white text-black font-black uppercase">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Target Title</th>
                <th className="px-6 py-4">Threat Level</th>
                <th className="px-6 py-4 hidden sm:table-cell">Modules</th>
                <th className="px-6 py-4 hidden md:table-cell">Clear Rate</th>
                <th className="px-6 py-4 hidden md:table-cell">Victors</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`group border-b border-white/20 transition-colors hover:bg-white/10 ${
                    p.status === 'solved' ? 'bg-success/5' : p.status === 'attempted' ? 'bg-warning/5' : ''
                  }`}
                >
                  <td className="px-6 py-4 font-mono text-muted-foreground">{p.id}</td>
                  <td className="px-6 py-4">
                    <Link
                      to="/problems/$slug"
                      params={{ slug: p.slug }}
                      className="font-bold text-white transition-colors group-hover:text-primary text-lg"
                    >
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4"><DifficultyBadge difficulty={p.difficulty} /></td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.slice(0, 2).map(t => (
                        <span key={t} className="brutal-border border-2 border-white/30 bg-transparent px-2 py-1 font-mono text-[10px] font-bold uppercase text-muted-foreground group-hover:border-primary/50 group-hover:text-white transition-colors">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell font-mono text-cyan font-bold">{p.acceptanceRate}%</td>
                  <td className="px-6 py-4 hidden md:table-cell font-mono text-white">{p.solveCount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {p.status === 'solved' && <span className="flex h-8 w-8 items-center justify-center brutal-border bg-success font-black text-black">✓</span>}
                    {p.status === 'attempted' && <span className="flex h-8 w-8 items-center justify-center brutal-border bg-warning font-black text-black">!</span>}
                    {p.status === 'unsolved' && <span className="flex h-8 w-8 items-center justify-center brutal-border bg-surface font-black text-muted-foreground">-</span>}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
