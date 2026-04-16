import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { mockDiscussions } from "../lib/mock-data";
import { StarsBackground } from "../components/StarsBackground";

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
    <div className="relative min-h-screen overflow-hidden bg-black text-white pb-24 pt-24 font-sans">
      <StarsBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col items-start gap-2"
          >
            <div className="brutal-border bg-primary px-4 py-1 text-sm font-black text-black uppercase -rotate-2 brutal-shadow-sm inline-block">
              Forums
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter mt-2">
              <span className="glitch-text text-white" data-text="COMMUNITY">COMMUNITY</span>
              <span className="text-primary block md:inline"> DISCUSSIONS</span>
            </h1>
          </motion.div>

          <button className="brutal-border bg-cyan text-black px-6 py-3 font-black uppercase tracking-wider brutal-shadow-sm hover:translate-y-1 hover:-translate-x-1 hover:bg-white transition-all whitespace-nowrap">
            New Discussion +
          </button>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`brutal-border px-5 py-2 text-xs font-mono font-black uppercase transition-colors ${
                category === c 
                  ? 'bg-primary text-black' 
                  : 'bg-black text-white hover:bg-white hover:text-black border-dashed'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Discussions List */}
        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="brutal-border bg-black p-8 text-center text-muted-foreground font-mono uppercase text-sm">
              No discussions found in this sector.
            </div>
          ) : (
            filtered.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="brutal-border bg-black brutal-shadow-white p-6 group transition-all hover:-translate-y-1 hover:translate-x-1 cursor-pointer flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
              >
                <div className="flex-1">
                  <h3 className="font-heading text-xl md:text-2xl font-black uppercase group-hover:text-primary transition-colors">{d.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground font-mono line-clamp-2">{d.preview}</p>
                  
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono uppercase text-muted-foreground">
                    <span className="border border-white/20 bg-white/5 px-2 py-1 flex items-center gap-2 text-white">
                      <span className="flex items-center justify-center bg-cyan text-black h-4 w-4 brutal-border font-black">
                        {d.author[0].toUpperCase()}
                      </span>
                      {d.author}
                    </span>
                    <span className="border border-white/20 bg-white/5 px-2 py-1 text-primary shadow-[2px_2px_0px_#fff]">
                      {d.category}
                    </span>
                    <span className="border border-white/20 bg-white/5 px-2 py-1">
                      {d.timeAgo}
                    </span>
                  </div>
                </div>

                <div className="flex md:flex-col items-center justify-center gap-4 md:gap-2 shrink-0 border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-6 w-full md:w-auto h-full">
                  <div className="flex flex-col items-center bg-white/5 border border-white/20 px-4 py-2 min-w-[80px]">
                    <span className="text-primary font-black text-xl">▲ {d.upvotes}</span>
                    <span className="text-[10px] uppercase text-muted-foreground mt-1">Upvotes</span>
                  </div>
                  <div className="flex flex-col items-center bg-white/5 border border-white/20 px-4 py-2 min-w-[80px]">
                    <span className="text-white font-black text-xl">{d.commentCount}</span>
                    <span className="text-[10px] uppercase text-muted-foreground mt-1">Replies</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
