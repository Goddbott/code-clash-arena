import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StarsBackground } from "../components/StarsBackground";

export const Route = createFileRoute("/game_/rapidfire")({
  head: () => ({
    meta: [
      { title: "Matchmaking — Rapid Fire MCQ" },
      { name: "description", content: "Find a random opponent or create a room for a Rapid Fire MCQ duel." },
    ],
  }),
  component: RapidFireLobbyPage,
});

function RapidFireLobbyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white pb-24 pt-24 font-sans">
      <StarsBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12">
        {/* Header */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex flex-col items-start gap-2 mb-12"
        >
          <div className="brutal-border bg-cyan px-4 py-1 text-sm font-black text-black uppercase -rotate-1 brutal-shadow-sm inline-block">
            Matchmaking
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter">
            <span className="glitch-text text-white" data-text="RAPID FIRE">RAPID FIRE</span>
            <span className="text-cyan"> MCQ</span>
          </h1>
        </motion.div>

        {/* Lobbies Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Random Match Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="brutal-border brutal-shadow-cyan bg-black p-8 flex flex-col justify-between h-full group transition-all"
          >
            <div>
              <div className="flex items-center gap-4 mb-2">
                 <div className="text-4xl">🎲</div>
                 <h2 className="font-heading text-3xl font-black uppercase text-cyan">Random Match</h2>
              </div>
              <p className="text-sm font-mono text-muted-foreground mb-6">
                Get matched with another player instantly
              </p>

              <div className="border border-white/20 bg-white/5 p-4 mb-8">
                <div className="text-xs font-black uppercase text-white mb-3 tracking-wider">How it works:</div>
                <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-cyan mt-0.5">▸</span> 10 MCQ questions in 60 seconds</li>
                  <li className="flex items-start gap-2"><span className="text-cyan mt-0.5">▸</span> DSA, System Design, AI/ML & Aptitude</li>
                  <li className="flex items-start gap-2"><span className="text-cyan mt-0.5">▸</span> Real-time +1/-0.5 scoring system</li>
                  <li className="flex items-start gap-2"><span className="text-cyan mt-0.5">▸</span> ELO-based rating matches</li>
                </ul>
              </div>
            </div>

            <Link
              to="/rapidfire"
              search={{ type: 'random' }}
              className="brutal-border bg-white text-black font-black uppercase text-xl py-4 flex items-center justify-center gap-2 hover:bg-cyan transition-colors brutal-shadow-sm select-none"
            >
              Find Match <span className="text-xl">➔</span>
            </Link>
          </motion.div>

          {/* Room Match Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="brutal-border brutal-shadow-primary bg-black p-8 flex flex-col justify-between h-full group transition-all"
          >
            <div>
              <div className="flex items-center gap-4 mb-2">
                 <div className="text-4xl">🤝</div>
                 <h2 className="font-heading text-3xl font-black uppercase text-primary">Room Match</h2>
              </div>
              <p className="text-sm font-mono text-muted-foreground mb-6">
                Create or join a room to play with friends
              </p>

              <div className="mb-8 flex flex-col gap-4">
                 <div className="border border-white/20 bg-white/5 p-4">
                   <div className="text-xs font-black uppercase text-white mb-2 tracking-wider">Difficulty Focus</div>
                   <select className="w-full brutal-border bg-black text-white px-4 py-3 font-mono uppercase text-sm outline-none cursor-pointer">
                     <option>Standard Match (60s)</option>
                     <option>Hardcore Mode (45s)</option>
                     <option>Easy Mode (90s)</option>
                   </select>
                   <Link
                      to="/rapidfire"
                      search={{ type: 'room' }}
                      className="brutal-border bg-primary text-black font-black uppercase w-full py-3 mt-4 flex items-center justify-center hover:bg-white transition-colors brutal-shadow-sm"
                    >
                      Create Room
                   </Link>
                 </div>

                 <div className="flex items-center gap-4 py-2">
                   <div className="h-px bg-white/20 flex-1"></div>
                   <div className="font-mono text-xs uppercase text-muted-foreground font-black">OR</div>
                   <div className="h-px bg-white/20 flex-1"></div>
                 </div>

                 <div className="border border-white/20 bg-white/5 p-4 flex flex-col gap-4">
                   <input 
                     type="text" 
                     placeholder="Enter room code" 
                     className="w-full brutal-border bg-black text-white px-4 py-3 font-mono text-sm outline-none uppercase placeholder:text-muted-foreground"
                   />
                   <Link
                      to="/rapidfire"
                      search={{ type: 'room' }}
                      className="brutal-border bg-white text-black font-black uppercase w-full py-3 flex items-center justify-center hover:bg-primary transition-colors"
                    >
                      Join Room
                   </Link>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Rules Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="brutal-border brutal-shadow-white bg-black p-8 mt-12 relative"
        >
           <h2 className="font-heading text-3xl font-black uppercase text-white mb-8 border-b-[3px] border-white/20 pb-4 inline-block pr-8">
             Game Rules & Guidelines
           </h2>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 font-mono">
             
             {/* Box 1 */}
             <div className="flex flex-col gap-3">
               <h3 className="text-lg font-black uppercase tracking-wider text-cyan flex items-center gap-2"><span className="text-white text-xl">🏆</span> Winning Conditions</h3>
               <ul className="space-y-3 text-sm text-muted-foreground">
                 <li className="flex items-start gap-2 text-white font-bold leading-tight"><span className="text-cyan mt-0.5">▶</span> Highest total score wins the match</li>
                 <li className="flex items-start gap-2 leading-tight"><span className="text-cyan mt-0.5">▶</span> +1 point for every correct answer</li>
                 <li className="flex items-start gap-2 leading-tight text-white font-bold"><span className="text-destructive mt-0.5">▶</span> -0.5 points penalty for wrong answers!</li>
                 <li className="flex items-start gap-2 leading-tight"><span className="text-cyan mt-0.5">▶</span> Equal points: draw (no penalty for skipping)</li>
                 <li className="flex items-start gap-2 leading-tight"><span className="text-cyan mt-0.5">▶</span> If a player leaves: opponent wins by default</li>
               </ul>
             </div>

             {/* Box 2 */}
             <div className="flex flex-col gap-3">
               <h3 className="text-lg font-black uppercase tracking-wider text-primary flex items-center gap-2"><span className="text-white text-xl">📈</span> ELO Rating System</h3>
               <ul className="space-y-3 text-sm text-muted-foreground">
                 <li className="flex items-start gap-2 leading-tight"><span className="text-primary mt-0.5">▶</span> Chess-style ELO calculation</li>
                 <li className="flex items-start gap-2 leading-tight"><span className="text-primary mt-0.5">▶</span> K-factor: 32 for dynamic changes</li>
                 <li className="flex items-start gap-2 leading-tight"><span className="text-primary mt-0.5">▶</span> Rating changes based on opponent skill</li>
                 <li className="flex items-start gap-2 text-white font-bold leading-tight"><span className="text-primary mt-0.5">▶</span> Starting rating: 1200</li>
               </ul>
             </div>

             {/* Box 3 */}
             <div className="flex flex-col gap-3">
               <h3 className="text-lg font-black uppercase tracking-wider text-warning flex items-center gap-2"><span className="text-white text-xl">⏱️</span> Time Limits</h3>
               <ul className="space-y-3 text-sm text-muted-foreground">
                 <li className="flex items-start gap-2 leading-tight"><span className="text-warning mt-0.5">▶</span> Universal 60-second combat limit</li>
                 <li className="flex items-start gap-2 leading-tight"><span className="text-warning mt-0.5">▶</span> Max 10 questions per match</li>
                 <li className="flex items-start gap-2 leading-tight"><span className="text-warning mt-0.5">▶</span> Questions un-answered at 0:00 skipped</li>
                 <li className="flex items-start gap-2 text-white font-bold leading-tight mt-2"><span className="text-warning animate-pulse mt-0.5">▶</span> Timer starts when both players enter</li>
               </ul>
             </div>

             {/* Box 4 */}
             <div className="flex flex-col gap-3">
               <h3 className="text-lg font-black uppercase tracking-wider text-success flex items-center gap-2"><span className="text-white text-xl">⚖️</span> Fair Play</h3>
               <ul className="space-y-3 text-sm text-muted-foreground">
                 <li className="flex items-start gap-2 leading-tight"><span className="text-success mt-0.5">▶</span> Real-time score syncing</li>
                 <li className="flex items-start gap-2 leading-tight"><span className="text-success mt-0.5">▶</span> Randomized MCQ question banks</li>
                 <li className="flex items-start gap-2 leading-tight"><span className="text-success mt-0.5">▶</span> Anti-cheat window focusing active</li>
                 <li className="flex items-start gap-2 text-white font-bold leading-tight"><span className="text-success mt-0.5">▶</span> Immediate disqualification on tab-switch</li>
               </ul>
             </div>

           </div>
        </motion.div>
      </div>
    </div>
  );
}
