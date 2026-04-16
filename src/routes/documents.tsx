import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — AlgoClash" },
      { name: "description", content: "Learning resources organized by subject." },
    ],
  }),
  component: DocumentsPage,
});

const subjects = [
  { name: "Data Structures", count: 24, icon: "🏗️" },
  { name: "Algorithms", count: 32, icon: "⚡" },
  { name: "System Design", count: 18, icon: "🏛️" },
  { name: "Database", count: 12, icon: "💾" },
  { name: "Operating Systems", count: 15, icon: "🖥️" },
  { name: "Networking", count: 10, icon: "🌐" },
];

const mockDocs = [
  { id: 1, title: "Introduction to Trees", type: "PDF", author: "algo_guru", subject: "Data Structures" },
  { id: 2, title: "Advanced DP Techniques", type: "Article", author: "dp_master", subject: "Algorithms" },
  { id: 3, title: "Graph Traversal Explained", type: "Video", author: "code_ninja", subject: "Algorithms" },
  { id: 4, title: "Hash Table Deep Dive", type: "PDF", author: "hash_fan", subject: "Data Structures" },
];

const typeBadge: Record<string, string> = {
  PDF: "bg-destructive/15 text-destructive",
  Article: "bg-primary/15 text-primary",
  Video: "bg-success/15 text-success",
};

function DocumentsPage() {
  const [selected, setSelected] = useState("Data Structures");

  return (
    <div className="flex min-h-screen pt-16">
      <div className="hidden w-56 border-r border-border bg-surface md:block pt-8">
        <h2 className="px-4 font-heading text-sm font-bold text-muted-foreground uppercase tracking-wider">Subjects</h2>
        <nav className="mt-4 space-y-1 px-2">
          {subjects.map(s => (
            <button
              key={s.name}
              onClick={() => setSelected(s.name)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                selected === s.name ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-surface-elevated hover:text-foreground'
              }`}
            >
              <span className="flex items-center gap-2">{s.icon} {s.name}</span>
              <span className="text-xs">{s.count}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-6">
        <motion.h1
          key={selected}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-heading text-2xl font-bold"
        >
          {selected}
        </motion.h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {mockDocs.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass neon-border hover-lift cursor-pointer rounded-xl p-5"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-heading text-base font-semibold">{doc.title}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeBadge[doc.type] || ''}`}>
                  {doc.type}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">by {doc.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
