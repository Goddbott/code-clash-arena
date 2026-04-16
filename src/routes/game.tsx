import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StarsBackground } from "../components/StarsBackground";

export const Route = createFileRoute("/game")({ 
  head: () => ({
    meta: [
      { title: "Game Modes — AlgoClash" },
      { name: "description", content: "Choose your battle mode." },
      { property: "og:title", content: "Game Modes — AlgoClash" },
      { property: "og:description", content: "Choose your battle mode." },
    ],
  }),
  component: GamePage,
});

type GameMode = {
  icon: string;
  title: string;
  subtitle?: string;
  desc: string;
  players: number;
  color: string;
  link: string;
  stats?: { label: string; value: string }[];
  features?: string[];
};

const modes: GameMode[] = [
  {
    icon: "⚔️",
    title: "1v1 Duel",
    subtitle: "Coding Battle",
    desc: "Classic algorithmic problem solving",
    stats: [
      { label: "Duration", value: "30-60 min" },
      { label: "Players", value: "1v1" },
      { label: "Focus", value: "Coding" },
      { label: "Rating", value: "ELO Based" }
    ],
    features: [
      "Full code editor with syntax highlighting",
      "Multiple programming languages (C++, Java, Python)",
      "Real-time test case validation",
      "ELO rating system",
      "30-60 minute battles",
      "Dynamic difficulty matching"
    ],
    players: 247,
    color: "primary",
    link: "/game/duel",
  },
  {
    icon: "🎯",
    title: "Rapid Fire",
    desc: "Answer MCQ questions faster than your opponent. 10 questions, 10 seconds each.",
    players: 183,
    color: "cyan",
    link: "/rapidfire",
  },
  {
    icon: "🏆",
    title: "Tournament",
    desc: "Bracket-based coding tournament. Compete through rounds to become the champion.",
    players: 64,
    color: "warning",
    link: "/tournament",
  },
];

function GamePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white pb-12 pt-24 font-sans">
      <StarsBackground />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center px-4 pt-16">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex flex-col items-center gap-2 mb-12"
        >
          <div className="brutal-border bg-primary px-4 py-1 text-sm font-black text-black uppercase -rotate-1 brutal-shadow-sm">
            Mode Select
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter text-center">
            <span className="glitch-text text-white" data-text="CHOOSE YOUR">CHOOSE YOUR</span>
            <span className="text-cyan block md:inline"> BATTLE</span>
          </h1>
        </motion.div>

        <div className="mt-8 grid w-full gap-8 sm:grid-cols-3">
          {modes.map((mode, i) => {
            const shadowClass = 
              mode.color === 'primary' ? 'brutal-shadow-primary' : 
              mode.color === 'cyan' ? 'brutal-shadow-cyan' : 
              'brutal-shadow-magenta';
            const hoverTextClass = 
              mode.color === 'primary' ? 'group-hover:text-primary' : 
              mode.color === 'cyan' ? 'group-hover:text-cyan' : 
              'group-hover:text-warning';

            // Workaround to safely inject color specific tailwind class
            const textClassMap: Record<string, string> = {
              "primary": "text-primary",
              "cyan": "text-cyan",
              "warning": "text-warning"
            };
            const bulletColor = textClassMap[mode.color] || "text-white";

            return (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={mode.link as any}
                  className={`brutal-border bg-black group relative flex flex-col p-8 text-left transition-all ${shadowClass} hover:-translate-y-2 hover:translate-x-2 block h-full`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-5xl">{mode.icon}</div>
                    {mode.subtitle && <div className="text-[10px] font-mono font-black uppercase text-white/50 border border-white/20 px-2 py-1">{mode.subtitle}</div>}
                  </div>
                  
                  <h3 className={`mt-4 font-heading text-2xl font-black uppercase transition-colors ${hoverTextClass}`}>
                    {mode.title}
                  </h3>
                  <p className="mt-2 text-sm font-mono text-muted-foreground">
                    {mode.desc}
                  </p>

                  {mode.stats && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {mode.stats.map(s => (
                        <div key={s.label} className="border border-white/10 p-2 bg-white/5">
                          <div className="text-white font-bold text-sm tracking-tight">{s.value}</div>
                          <div className="text-[10px] uppercase text-muted-foreground mt-0.5">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {mode.features && (
                    <div className="mt-4 flex-grow">
                      <div className="text-[10px] font-black uppercase text-white/70 mb-2 border-b border-white/20 pb-1">Features</div>
                      <ul className="text-xs text-muted-foreground font-mono space-y-1.5 mt-2">
                        {mode.features.map(f => (
                          <li key={f} className="flex gap-2 items-start leading-tight">
                             <span className={`${bulletColor} mt-0.5`}>▸</span>
                             <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!mode.features && <div className="flex-grow"></div>}

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t-[3px] border-white/20 pt-4 shrink-0">
                    <div className="flex items-center gap-2 text-xs font-black uppercase text-muted-foreground">
                      <span className="flex h-3 w-3 items-center justify-center bg-success brutal-border"></span>
                      {mode.players} Online
                    </div>
                    <span className="brutal-border bg-white text-black px-3 py-1 text-xs font-black uppercase group-hover:bg-primary group-hover:text-black transition-colors">
                      Enter
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
