import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates — AlgoClash" },
      { name: "description", content: "Your earned certificates." },
    ],
  }),
  component: CertificatesPage,
});

const mockCerts = [
  { id: 1, title: "Weekly Contest #41 Winner", date: "Apr 13, 2026", rank: "#1", type: "Contest" },
  { id: 2, title: "30-Day Streak Achievement", date: "Apr 10, 2026", rank: "—", type: "Achievement" },
  { id: 3, title: "DP Marathon Top 10", date: "Mar 28, 2026", rank: "#7", type: "Contest" },
];

function CertificatesPage() {
  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 pt-24 pb-12">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading text-3xl font-bold"
      >
        🎓 Certificates
      </motion.h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockCerts.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-elevated neon-border group rounded-2xl p-6 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-2xl group-hover:glow-primary transition-all">
              🏆
            </div>
            <h3 className="mt-4 font-heading text-base font-bold">{cert.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{cert.date}</p>
            {cert.rank !== "—" && (
              <p className="mt-1 text-sm font-semibold rank-gold">{cert.rank}</p>
            )}
            <span className="mt-2 inline-block rounded-full bg-surface px-2 py-0.5 text-xs text-muted-foreground">{cert.type}</span>
            <button className="mt-4 block w-full rounded-lg border border-border py-2 text-xs font-medium text-foreground transition-colors hover:bg-surface-elevated">
              Download PDF
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
