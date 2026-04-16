import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { mockContests } from "../lib/mock-data";
import { StarsBackground } from "../components/StarsBackground";

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

const typeColors: Record<string, string> = { Rated: 'text-primary border-primary', Unrated: 'text-cyan border-cyan', Special: 'text-warning border-warning' };
const statusLabels: Record<string, string> = { upcoming: 'Register', ongoing: 'Enter Contest', ended: 'View Results' };

function ContestPage() {
  const sections = [
    { title: '🔴 Ongoing', contests: mockContests.filter(c => c.status === 'ongoing') },
    { title: '🟡 Upcoming', contests: mockContests.filter(c => c.status === 'upcoming') },
    { title: '⚪ Past Events', contests: mockContests.filter(c => c.status === 'ended') },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white pb-24 pt-24 font-sans">
      <StarsBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-12">
        {/* Header */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex flex-col items-start gap-2 mb-16"
        >
          <div className="brutal-border bg-cyan px-4 py-1 text-sm font-black text-black uppercase -rotate-1 brutal-shadow-sm inline-block">
            Arena Events
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter">
            <span className="glitch-text text-white" data-text="CODING">CODING</span>
            <span className="text-primary block md:inline"> CONTESTS</span>
          </h1>
        </motion.div>

        {sections.map(section => {
          if (section.contests.length === 0) return null;

          return (
            <div key={section.title} className="mb-16">
              <h2 className="font-heading text-2xl font-black uppercase tracking-wider mb-8 border-b-4 border-white/20 pb-2 inline-block pr-8">
                {section.title}
              </h2>
              
              <div className="space-y-6">
                {section.contests.map((c, i) => {
                  const shadowColor = c.status === 'ongoing' ? 'brutal-shadow-cyan' : c.status === 'upcoming' ? 'brutal-shadow-primary' : '';
                  const isOngoing = c.status === 'ongoing';

                  return (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`brutal-border bg-black p-6 md:p-8 flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-6 group transition-all ${c.status !== 'ended' ? `hover:-translate-y-1 hover:translate-x-1 ${shadowColor}` : 'opacity-70 grayscale hover:grayscale-0'}`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                           <h3 className="font-heading text-xl md:text-2xl font-black uppercase truncate max-w-xs md:max-w-md transition-colors group-hover:text-white">{c.name}</h3>
                           {isOngoing && (
                             <span className="flex h-3 w-3 items-center justify-center border border-black rounded-full bg-cyan animate-pulse"></span>
                           )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-4 font-mono text-xs uppercase text-muted-foreground">
                          <span className="border border-white/20 bg-white/5 px-2 py-1 flex items-center gap-2 text-white">
                            <span className={c.status === 'ongoing' ? 'text-cyan' : 'text-primary'}>▸</span> {new Date(c.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="border border-white/20 bg-white/5 px-2 py-1">
                             {c.duration} MIN
                          </span>
                          <span className="border border-white/20 bg-white/5 px-2 py-1">
                             {c.problems} PROBS
                          </span>
                          <span className="border border-white/20 bg-white/5 px-2 py-1 text-white">
                             {c.registeredCount.toLocaleString()} REG
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:items-end gap-4 w-full md:w-auto shrink-0 mt-2 md:mt-0">
                        {/* Tags */}
                        <div className={`border ${typeColors[c.type]} px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest bg-white/5`}>
                          {c.type}
                        </div>
                        
                        {/* Action Buttons */}
                        {isOngoing ? (
                           <button className="brutal-border bg-cyan text-black px-6 py-3 font-black uppercase text-sm hover:bg-white transition-colors brutal-shadow-sm w-full md:w-auto text-center">
                             {statusLabels[c.status]}
                           </button>
                        ) : c.status === 'upcoming' ? (
                           <button className="brutal-border bg-white text-black px-6 py-3 font-black uppercase text-sm hover:bg-primary transition-colors brutal-shadow-sm w-full md:w-auto text-center">
                             {statusLabels[c.status]}
                           </button>
                        ) : (
                           <button className="brutal-border bg-black text-white/50 px-6 py-3 font-black uppercase text-sm hover:bg-white/10 hover:text-white transition-colors w-full md:w-auto text-center border-dashed">
                             {statusLabels[c.status]}
                           </button>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
