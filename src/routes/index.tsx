import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const stats = [
  { label: "Problems Solved", value: "34", color: "pastel-mint" },
  { label: "Current Streak", value: "5 Days", color: "pastel-yellow" },
  { label: "Global Rank", value: "4,201", color: "pastel-lavender" },
  { label: "Rating", value: "1250", color: "pastel-blue" },
];

const upcomingContests = [
  { title: "Weekly Arena #42", time: "in 2 days", participants: "1.2k" },
  { title: "Rapid Fire Duel", time: "Tonight, 8PM", participants: "850" },
];

function HomePage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto pb-20">
      
      {/* Top Header / Greeting */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neumorphic p-8 rounded-[35px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold text-foreground">Good morning, <span className="text-primary">Coder!</span> ☀️</h1>
          <p className="text-muted-foreground mt-2 font-medium text-lg">You're 3 problems away from your next milestone.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/problems" className="neumorphic pastel-blue neumorphic-hover px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
            <span>🚀</span> Resume Solving
          </Link>
          <button className="neumorphic p-4 rounded-2xl neumorphic-active text-xl">
            🔔
          </button>
        </div>
      </motion.header>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left/Center Column - Main Content */}
        <div className="xl:col-span-2 flex flex-col gap-8">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`neumorphic rounded-[30px] p-6 flex flex-col items-center justify-center text-center neumorphic-hover ${stat.color}`}
              >
                <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Problem of the Day */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="neumorphic rounded-[35px] overflow-hidden"
          >
            <div className="p-8 pastel-peach border-b border-white/20">
              <div className="inline-flex items-center gap-2 neumorphic px-4 py-2 rounded-xl text-sm font-bold bg-white/50">
                <span>🔥</span> Daily Challenge
              </div>
              <h2 className="text-3xl font-bold mt-6 text-foreground">Trapping Rain Water</h2>
            </div>
            <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <p className="text-muted-foreground text-lg max-w-xl">
                 Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
               </p>
               <Link to="/problems" className="shrink-0 neumorphic pastel-mint neumorphic-hover px-8 py-4 rounded-2xl font-bold text-lg">
                 Solve Now
               </Link>
            </div>
          </motion.div>

        </div>

        {/* Right Sidebar Column - Secondary Info */}
        <div className="flex flex-col gap-8">
          
          {/* Upcoming Contests */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="neumorphic rounded-[35px] p-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span>📅</span> Upcoming Contests
            </h3>
            <div className="flex flex-col gap-4">
              {upcomingContests.map((contest, i) => (
                <div key={i} className="neumorphic-inset rounded-2xl p-5 flex justify-between items-center pastel-peach">
                  <div>
                    <h4 className="font-bold text-foreground">{contest.title}</h4>
                    <p className="text-sm text-primary font-medium mt-1">{contest.time}</p>
                  </div>
                  <div className="neumorphic p-2 rounded-xl text-sm bg-background">
                    {contest.participants}
                  </div>
                </div>
              ))}
            </div>
            <Link to="/contest" className="neumorphic neumorphic-hover mt-6 p-4 rounded-2xl w-full text-center font-bold block bg-background">
              View Schedule
            </Link>
          </motion.div>

          {/* Leaderboard Glimpse */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="neumorphic rounded-[35px] p-8 pastel-lavender"
          >
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <span>🏆</span> Global Top 3
            </h3>
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map(rank => (
                <div key={rank} className="flex items-center gap-4 bg-white/40 neumorphic p-3 rounded-2xl border-white/40">
                  <div className="w-8 h-8 flex items-center justify-center pastel-pink font-bold rounded-xl text-sm border border-white/40 shadow-sm">
                    #{rank}
                  </div>
                  <div className="font-semibold text-foreground flex-1">ProCoder_{rank}</div>
                  <div className="text-sm text-foreground opacity-70 font-mono">3102</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
