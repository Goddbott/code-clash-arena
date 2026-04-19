import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Calendar, Users, Trophy, BookOpen, Layers, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { mockContests } from "../lib/mock-data";
import { StarsBackground } from "../components/StarsBackground";

export const Route = createFileRoute("/contest/$id")({
  component: ContestDetailPage,
});

const TABS = ["Problems", "Rankings", "Editorial"];

function ContestDetailPage() {
  const { id } = Route.useParams();
  const [activeTab, setActiveTab] = useState("Problems");
  
  const contest = mockContests.find(c => c.id === parseInt(id));

  if (!contest) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans">
        <h1 className="text-4xl font-black uppercase mb-4">Contest Not Found</h1>
        <Link to="/contest" className="text-primary hover:underline">Back to Arena</Link>
      </div>
    );
  }

  const stats = [
    { label: "Time Remaining", value: contest.status === 'ended' ? "Contest Ended" : "Live Now", icon: Clock, color: "text-red-500" },
    { label: "Duration", value: `${contest.duration}h 0m`, icon: Calendar, color: "text-cyan" },
    { label: "Participants", value: contest.registeredCount.toLocaleString(), icon: Users, color: "text-primary" },
    { label: "Problems", value: contest.problems.toString(), icon: Trophy, color: "text-yellow-400" },
    { label: "Status", value: contest.status.toUpperCase(), icon: Layers, color: "text-white" },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white pb-24 pt-24 font-sans overflow-x-hidden">
      <StarsBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-12">
        {/* Back Link */}
        <Link 
          to="/contest" 
          className="group flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 font-mono text-sm uppercase font-black"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Contests
        </Link>

        {/* Header Section */}
        <div className="mb-12">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col gap-4"
          >
            <div className={`brutal-border px-4 py-1 text-xs font-black uppercase inline-block self-start ${contest.status === 'ended' ? 'bg-white text-black' : 'bg-cyan text-black'}`}>
              {contest.status === 'ended' ? 'Archive' : 'In Progress'}
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              {contest.name}
            </h1>
            <p className="max-w-2xl text-muted-foreground font-mono text-sm md:text-base leading-relaxed">
              {contest.description}
            </p>
          </motion.div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="brutal-border bg-black/40 p-4 flex flex-col items-center justify-center text-center gap-2 group hover:bg-white/5 transition-colors"
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">{stat.label}</span>
                <span className="text-sm font-mono font-black uppercase mt-1 whitespace-nowrap">{stat.value}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Tabs */}
        <div className="flex border-b-4 border-white/10 gap-8 mb-10 overflow-x-auto no-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-lg md:text-xl font-heading font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-[-4px] left-0 right-0 h-1 bg-primary" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "Problems" ? (
              <motion.div
                key="problems"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {contest.contestProblems?.map((prob, i) => (
                  <div 
                    key={prob.letter}
                    className="brutal-border bg-black brutal-shadow-white p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group hover:-translate-y-1 hover:translate-x-1 transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className="h-14 w-14 shrink-0 brutal-border bg-primary flex items-center justify-center font-heading text-3xl font-black text-black -rotate-3">
                        {prob.letter}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-black uppercase group-hover:text-primary transition-colors">{prob.title}</h3>
                        <div className="flex items-center gap-3 mt-1 font-mono text-xs uppercase font-black">
                          <span className={`${
                            prob.difficulty === 'Easy' ? 'text-green-400' : 
                            prob.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-500'
                          }`}>
                            {prob.difficulty}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-cyan">Score: {prob.score} Points</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      to="/problems/$slug"
                      params={{ slug: prob.slug }}
                      className="w-full md:w-auto brutal-border bg-white text-black px-8 py-3 font-black uppercase text-sm hover:bg-primary transition-all text-center flex items-center justify-center gap-2 group/btn"
                    >
                      Solve Problem
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="other"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="brutal-border bg-black/40 p-20 flex flex-col items-center justify-center text-center gap-4 italic font-mono text-muted-foreground uppercase tracking-widest border-dashed"
              >
                <div className="p-4 bg-muted/10 rounded-full">
                  <Layers className="w-12 h-12" />
                </div>
                The {activeTab} section is currently restricted in this sector.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
