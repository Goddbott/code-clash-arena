import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { mockAnnouncements } from "../lib/mock-data";

export const Route = createFileRoute("/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements — AlgoClash" },
      { name: "description", content: "Latest platform announcements and news." },
    ],
  }),
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 pt-24 pb-12">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading text-3xl font-bold"
      >
        Announcements
      </motion.h1>

      <div className="mt-8 space-y-4">
        {mockAnnouncements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass neon-border hover-lift cursor-pointer rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              {a.pinned && <span className="text-lg">📌</span>}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{a.category}</span>
                  <span className="text-xs text-muted-foreground">{a.date}</span>
                </div>
                <h3 className="mt-2 font-heading text-lg font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
