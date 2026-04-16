import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StarsBackground } from "../components/StarsBackground";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const stats = [
  { label: "Active Users", value: "52,847" },
  { label: "Problems Solved Today", value: "18,432" },
  { label: "Active Contests", value: "3" },
  { label: "Live Players", value: "1,247" },
];

const features = [
  { icon: "⚔️", title: "Contests", desc: "Weekly rated contests with ELO rating" },
  { icon: "🎯", title: "Rapid Fire", desc: "Fast-paced MCQ battles" },
  { icon: "🤖", title: "AI Interview", desc: "Mock interviews with AI feedback" },
  { icon: "🎮", title: "1v1 Duels", desc: "Real-time coding battles" },
  { icon: "💬", title: "Discussions", desc: "Community problem solving" },
  { icon: "🏆", title: "Leaderboard", desc: "Climb the galaxy rankings" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarsBackground />

      {/* Hero */}
      <section className="relative flex items-center justify-center px-4 pb-24 pt-32 min-h-[85vh]">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-6xl font-black leading-none tracking-tighter sm:text-8xl flex flex-col gap-2">
              <span className="glitch-text text-primary self-center" data-text="CLASH.">CLASH.</span>
              <span className="text-foreground brutal-border bg-accent inline-block self-center px-6 py-2 -rotate-2">CODE.</span>
              <span className="glitch-text text-cyan self-center" data-text="CONQUER.">CONQUER.</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            The ultimate competitive coding platform. Solve algorithmic challenges,
            compete in real-time contests, battle in 1v1 duels, and climb the global leaderboard.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/problems"
              className="brutal-border brutal-shadow-primary brutal-hover bg-primary px-10 py-4 text-xl font-black uppercase text-black"
            >
              Start Solving
            </Link>
            <Link
              to="/contest"
              className="brutal-border brutal-shadow-white brutal-hover bg-black px-10 py-4 text-xl font-black uppercase text-white hover:bg-white hover:text-black transition-colors"
            >
              Join Contest
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative z-10 mt-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="brutal-border brutal-shadow-magenta mx-auto grid max-w-5xl grid-cols-2 gap-0 bg-black p-0 md:grid-cols-4"
        >
          {stats.map(s => (
            <div key={s.label} className="text-center border-2 border-white p-6 hover:bg-accent hover:text-black transition-colors group">
              <div className="font-heading text-3xl font-black text-primary group-hover:text-black">{s.value}</div>
              <div className="mt-2 text-sm font-bold uppercase text-white group-hover:text-black">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* POTD */}
      <section className="relative z-10 mx-auto mt-20 max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="brutal-border brutal-shadow-cyan bg-black p-8"
        >
          <div className="flex items-center gap-2 text-lg font-black uppercase text-cyan">
            <span>🔥</span>
            <span className="font-semibold">Problem of the Day</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <h3 className="font-heading text-xl font-bold">Trapping Rain Water</h3>
              <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-xs font-semibold text-destructive">Hard</span>
                <span>7,200 solved</span>
              </div>
            </div>
            <Link
              to="/problems"
              className="brutal-border brutal-shadow-white brutal-hover bg-white px-8 py-3 text-sm font-black uppercase text-black"
            >
              Solve Now
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Announcements & Contests Split Section */}
      <section className="relative z-10 mx-auto mt-24 max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Announcements */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="brutal-border brutal-shadow-primary bg-black p-8 flex flex-col gap-4"
          >
             <div className="flex items-center gap-2 text-xl font-black uppercase text-primary">
                <span>📢</span>
                <h2>Announcements</h2>
             </div>
             <div className="space-y-4 mt-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold text-white uppercase text-sm">Season 4 Concluded!</h4>
                  <p className="text-muted-foreground text-sm mt-1">Congrats to ProCoder_1 for securing the top spot. Rewards are rolling out.</p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-bold text-white uppercase text-sm">New Game Mode</h4>
                  <p className="text-muted-foreground text-sm mt-1">Rapid Fire mode is now live! Challenge friends in intense 60s MCQ battles.</p>
                </div>
                <div className="border-l-4 border-cyan pl-4">
                  <h4 className="font-bold text-white uppercase text-sm">Server Maintenance</h4>
                  <p className="text-muted-foreground text-sm mt-1">Scheduled maintenance on Friday at 2AM UTC. Expected downtime: 1 hour.</p>
                </div>
             </div>
          </motion.div>

          {/* Right: Upcoming Contests */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="brutal-border brutal-shadow-cyan bg-black p-8 flex flex-col gap-4"
          >
             <div className="flex items-center gap-2 text-xl font-black uppercase text-cyan">
                <span>⚔️</span>
                <h2>Upcoming Contests</h2>
             </div>
             <div className="space-y-4 mt-4 flex-grow">
                <div className="flex justify-between items-center border border-white/20 p-3 hover:bg-white/5 transition-colors group">
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-cyan transition-colors">Weekly Arena #42</h4>
                    <p className="text-primary text-xs mt-1 font-bold">Starts in 2 Days</p>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground bg-white/10 px-2 py-1 brutal-border border-2 border-white/20">1.2k Reg</div>
                </div>
                <div className="flex justify-between items-center border border-white/20 p-3 hover:bg-white/5 transition-colors group">
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-accent transition-colors">Beginner's Brawl</h4>
                    <p className="text-accent text-xs mt-1 font-bold">Starts Tomorrow, 8PM</p>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground bg-white/10 px-2 py-1 brutal-border border-2 border-white/20">850 Reg</div>
                </div>
                <div className="flex justify-between items-center border border-white/20 p-3 hover:bg-white/5 transition-colors group">
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-primary transition-colors">1v1 Iron Coder</h4>
                    <p className="text-cyan text-xs mt-1 font-bold">Starts Dec 12, 6PM</p>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground bg-white/10 px-2 py-1 brutal-border border-2 border-white/20">300 Reg</div>
                </div>
             </div>
             <Link to="/contest" className="brutal-border brutal-shadow-white bg-white w-full text-center py-2 text-black font-black uppercase text-sm mt-2 brutal-hover hover:bg-black hover:text-white transition-colors">View All Schedule</Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto mt-24 max-w-5xl px-4 pb-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-heading text-3xl font-bold"
        >
          Everything you need to <span className="text-primary">dominate</span>
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map(f => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="brutal-border brutal-shadow-primary brutal-hover bg-black p-8 transition-transform"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 font-heading text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t-[6px] border-white bg-black mt-12">
        <div className="mx-auto max-w-7xl px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center brutal-border bg-primary font-heading text-xl font-black text-black -rotate-6">
              A
            </div>
            <span className="font-heading text-3xl font-black text-primary uppercase mt-1">
              AlgoClash
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-black uppercase text-muted-foreground">
            <Link to="/problems" className="hover:text-primary transition-colors">Rules</Link>
            <Link to="/discussion" className="hover:text-cyan transition-colors">Forum</Link>
            <Link to="/game" className="hover:text-accent transition-colors">Contact</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
             <div className="text-xs text-white font-mono bg-white/10 px-2 py-1 brutal-border border-2 border-white">
               SYS.STATUS: <span className="text-primary font-bold">ONLINE</span>
             </div>
             <div className="text-xs text-muted-foreground font-mono mt-2">
               © 2026 ALGOCLASH. ALL RIGHTS RESERVED.
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
