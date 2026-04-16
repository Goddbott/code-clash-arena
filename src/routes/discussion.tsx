import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { mockDiscussions } from "../lib/mock-data";

export const Route = createFileRoute("/discussion")({
  head: () => ({
    meta: [
      { title: "Discussions — AlgoClash" },
      { name: "description", content: "Join the community discussion." },
      { property: "og:title", content: "Discussions — AlgoClash" },
      { property: "og:description", content: "Join the community discussion." },
    ],
  }),
  component: DiscussionPage,
});

const categories = ["All", "General", "Algorithms", "Data Structures", "System Design", "Interview Prep"];

function DiscussionPage() {
  const [category, setCategory] = useState("All");

  const filtered = category === "All"
    ? mockDiscussions
    : mockDiscussions.filter(d => d.category === category);

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 pt-24 pb-12">
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl font-bold"
        >
          Discussions
        </motion.h1>
        <button className="glow-primary rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110">
          New Discussion
        </button>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              category === c ? 'bg-primary text-primary-foreground' : 'bg-surface-elevated text-muted-foreground hover:text-foreground'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass neon-border hover-lift cursor-pointer rounded-xl p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-heading text-base font-semibold hover:text-primary transition-colors">{d.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{d.preview}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="h-5 w-5 rounded-full bg-primary/30 flex items-center justify-center text-[10px]">
                      {d.author[0].toUpperCase()}
                    </span>
                    {d.author}
                  </span>
                  <span className="rounded bg-surface-elevated px-1.5 py-0.5">{d.category}</span>
                  <span>{d.timeAgo}</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 text-xs">
                <span className="text-primary font-semibold">▲ {d.upvotes}</span>
                <span className="text-muted-foreground">{d.commentCount} replies</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
