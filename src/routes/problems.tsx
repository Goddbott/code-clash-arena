import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { mockProblems, allTags } from "../lib/mock-data";
import { DifficultyBadge } from "../components/DifficultyBadge";

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
    <div className="mx-auto min-h-screen max-w-6xl px-4 pt-24 pb-12">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading text-3xl font-bold"
      >
        Problems
      </motion.h1>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary"
        />
        {["All", "Easy", "Medium", "Hard"].map(d => (
          <button
            key={d}
            onClick={() => setDiffFilter(d)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              diffFilter === d ? "bg-primary text-primary-foreground" : "bg-surface-elevated text-muted-foreground hover:text-foreground"
            }`}
          >
            {d}
          </button>
        ))}
        <span className="text-muted-foreground">|</span>
        {["All", "Solved", "Attempted", "Unsolved"].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              statusFilter === s ? "bg-primary text-primary-foreground" : "bg-surface-elevated text-muted-foreground hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {allTags.slice(0, 10).map(tag => (
          <span key={tag} className="rounded-md bg-surface-elevated px-2 py-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            {tag}
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-left text-muted-foreground">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Difficulty</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Tags</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Acceptance</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Solved</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02 }}
                className={`group border-b border-border/50 transition-colors hover:bg-surface-elevated ${
                  p.status === 'solved' ? 'bg-success/5' : p.status === 'attempted' ? 'bg-warning/5' : ''
                }`}
              >
                <td className="px-4 py-3 text-muted-foreground">{p.id}</td>
                <td className="px-4 py-3">
                  <Link
                    to="/problems/$slug"
                    params={{ slug: p.slug }}
                    className="font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {p.title}
                  </Link>
                </td>
                <td className="px-4 py-3"><DifficultyBadge difficulty={p.difficulty} /></td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {p.tags.slice(0, 2).map(t => (
                      <span key={t} className="rounded bg-surface-elevated px-1.5 py-0.5 text-xs text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{p.acceptanceRate}%</td>
                <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{p.solveCount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  {p.status === 'solved' && <span className="text-success">✓</span>}
                  {p.status === 'attempted' && <span className="text-warning">◐</span>}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
