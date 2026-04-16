import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { mockContests } from "../lib/mock-data";

export const Route = createFileRoute("/contest")({
  head: () => ({
    meta: [
      { title: "Contests — AlgoClash" },
      { name: "description", content: "Compete in rated coding contests." },
      { property: "og:title", content: "Contests — AlgoClash" },
      { property: "og:description", content: "Compete in rated coding contests." },
    ],
  }),
  component: ContestPage,
});

const borderColors = { Rated: 'border-l-primary', Unrated: 'border-l-cyan', Special: 'border-l-warning' };
const statusLabels = { upcoming: 'Register', ongoing: 'Enter', ended: 'View Results' };
const statusColors = { upcoming: 'bg-primary', ongoing: 'bg-success', ended: 'bg-muted' };

function ContestPage() {
  const sections = [
    { title: '🔴 Ongoing', contests: mockContests.filter(c => c.status === 'ongoing') },
    { title: '🟡 Upcoming', contests: mockContests.filter(c => c.status === 'upcoming') },
    { title: '⚪ Past', contests: mockContests.filter(c => c.status === 'ended') },
  ];

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 pt-24 pb-12">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading text-3xl font-bold"
      >
        Contests
      </motion.h1>

      {sections.map(section => (
        <div key={section.title} className="mt-8">
          <h2 className="font-heading text-xl font-semibold">{section.title}</h2>
          {section.contests.length === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">No contests in this category.</p>
          )}
          <div className="mt-4 space-y-3">
            {section.contests.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass neon-border hover-lift rounded-xl border-l-4 ${borderColors[c.type]} p-5`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg font-semibold">{c.name}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span>{new Date(c.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      <span>•</span>
                      <span>{c.duration} min</span>
                      <span>•</span>
                      <span>{c.problems} problems</span>
                      <span>•</span>
                      <span>{c.registeredCount.toLocaleString()} registered</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      c.type === 'Rated' ? 'bg-primary/15 text-primary' : c.type === 'Special' ? 'bg-warning/15 text-warning' : 'bg-muted text-muted-foreground'
                    }`}>
                      {c.type}
                    </span>
                    <button className={`rounded-lg px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 ${statusColors[c.status]}`}>
                      {statusLabels[c.status]}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
