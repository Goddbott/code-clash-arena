import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { DifficultyBadge } from "../components/DifficultyBadge";
import { Loader2 } from "lucide-react";

type DuelSearch = {
  type?: string;
};

export const Route = createFileRoute("/duel")({
  validateSearch: (search: Record<string, unknown>): DuelSearch => {
    return {
      type: (search.type as string) || "random",
    };
  },
  head: () => ({
    meta: [
      { title: "1v1 Duel — AlgoClash" },
      { name: "description", content: "Compete head-to-head in a real-time coding duel." },
    ],
  }),
  component: DuelPage,
});

const languages = ["C++", "Python", "Java", "JavaScript", "Go", "Rust"];

const codeTemplates: Record<string, string> = {
  "C++": `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        \n    }\n};`,
  Python: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Write your solution here\n        pass`,
  Java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        \n    }\n}`,
  JavaScript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Write your solution here\n    \n};`,
  Go: `func twoSum(nums []int, target int) []int {\n    // Write your solution here\n    \n}`,
  Rust: `impl Solution {\n    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        // Write your solution here\n        \n    }\n}`,
};

function DuelPage() {
  const { type } = Route.useSearch();
  const [lang, setLang] = useState("C++");
  const [code, setCode] = useState(codeTemplates["C++"] || "");
  const [running, setRunning] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [opponentProgress, setOpponentProgress] = useState(0);
  
  // New match status state for demonstrating the Waiting Room
  const [matchStatus, setMatchStatus] = useState<'waiting' | 'playing'>('waiting');

  useEffect(() => {
    // 6-second simulated wait before auto-starting match
    if (matchStatus === 'waiting') {
      const startTimer = setTimeout(() => {
        setMatchStatus('playing');
      }, 6000);
      return () => clearTimeout(startTimer);
    }

    if (matchStatus === 'playing') {
      // Fake opponent progress
      const progressInterval = setInterval(() => {
        setOpponentProgress(p => (p < 5 ? p + 1 : p));
      }, 15000); // Opponent solves a test case every 15 seconds
      return () => clearInterval(progressInterval);
    }
  }, [matchStatus]);

  const handleLangChange = (l: string) => {
    setLang(l);
    setCode(codeTemplates[l] || "// Start coding...");
  };

  const handleRun = () => {
    setRunning(true);
    setConsoleOpen(true);
    setTimeout(() => setRunning(false), 1500);
  };

  return (
    <div className="flex h-screen max-h-screen flex-col bg-black text-white font-sans pt-16 overflow-hidden">
      {/* Minimal Top Banner */}
      <div className="border-b border-white/20 bg-background px-4 py-2 flex items-center justify-between shrink-0">
        <div className="text-sm font-mono text-muted-foreground">
          {matchStatus === 'waiting' ? (
            <span>Players: <span className="text-white">1/2</span></span>
          ) : (
            <span>Time: <span className="text-white">14:59</span></span>
          )}
        </div>
        
        <div className="font-heading text-lg font-bold tracking-widest text-white/80 uppercase">
          {matchStatus === 'waiting' ? (type === 'room' ? 'Room: 3E54AAD6' : 'Random Match') : '1v1 Duel'}
        </div>
        
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          {matchStatus === 'playing' ? (
            <>
              <span className="h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
              REC
            </>
          ) : (
            <>
              {type === 'room' && <span>Code: <span className="text-white font-bold select-all">3E54AAD6</span></span>}
            </>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden relative">
        {/* Left Pane Options */}
        {matchStatus === 'waiting' ? (
          // WAITING LOBBY LEFT PANE
          <div className="flex-1 overflow-y-auto border-r border-white/20 p-8 flex flex-col bg-black items-center justify-center relative">
            <h2 className="font-heading text-3xl font-black uppercase text-white mb-2">
              {type === 'room' ? 'Room Match' : 'Random Match'}
            </h2>
            <div className="flex items-center gap-3 mb-8">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
              <p className="text-muted-foreground font-mono uppercase text-sm m-0">Waiting for players</p>
            </div>

            <div className="flex flex-col items-center gap-2 mb-12">
              <div className="text-lg font-bold uppercase tracking-widest text-white/80">Players: 1/2</div>
              <div className="font-mono text-4xl text-primary font-black mt-2">0:00</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Time Limit: 45 minutes</div>
              <button 
                 className="mt-6 border border-destructive text-destructive hover:bg-destructive hover:text-black font-black uppercase px-6 py-2 transition-colors text-sm font-mono tracking-wider disabled:opacity-50"
              >
                Leave Game
              </button>
            </div>

            <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Player 1 Details */}
              <div className="border border-white/20 bg-white/5 p-6 flex flex-col items-center text-center">
                <div className="font-bold text-white mb-1 uppercase tracking-wide">adityaajay538 (You)</div>
                <div className="text-xs text-muted-foreground mb-6 font-mono">Rating: 1200</div>
                <div className="text-2xl font-black text-primary">0/0</div>
                <div className="text-[10px] uppercase text-muted-foreground font-mono mt-1">Tests passed</div>
              </div>

              {/* Player 2 Details */}
              <div className="border border-white/20 p-6 border-dashed flex flex-col items-center text-center justify-center relative overflow-hidden min-h-[160px]">
                <div className="absolute inset-0 bg-white/5 animate-pulse opacity-50"></div>
                
                {/* Circular Spinner Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                   <Loader2 className="w-24 h-24 animate-spin text-white opacity-40" />
                </div>

                <div className="font-bold text-white/50 mb-1 z-10 uppercase tracking-wide">Waiting for opponent...</div>
                <div className="text-xs text-muted-foreground mb-4 font-mono z-10">Rating: N/A</div>
                <div className="text-2xl font-black text-white/20 z-10 mt-auto">0/0</div>
                <div className="text-[10px] uppercase text-muted-foreground font-mono mt-1 z-10">Tests passed</div>
              </div>
            </div>

            <div className="mt-12 text-center max-w-sm">
              <div className="font-bold animate-pulse text-white mb-3 uppercase tracking-wider text-sm border-b border-white/20 pb-2 inline-block">Waiting for Opponent</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                 The problem will be revealed once both players join to ensure fair competition.
              </p>
            </div>
          </div>
        ) : (
          // PLAYING ACTIVE MATCH LEFT PANE (Original implementation)
          <div className="flex-1 overflow-y-auto border-r border-white/20 p-6 flex flex-col gap-6 bg-black">
            {/* Opponent Status - Minimal */}
            <div className="border border-white/20 p-4 relative">
               <div className="flex justify-between items-center text-xs font-mono uppercase mb-3">
                 <span className="text-muted-foreground">Opponent (ProCoder)</span>
                 <span className="text-white/60">{opponentProgress}/5 Cases</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 flex gap-1">
                 {[1, 2, 3, 4, 5].map(test => (
                   <div key={test} className={`flex-1 ${test <= opponentProgress ? 'bg-primary' : 'bg-transparent'}`}></div>
                 ))}
               </div>
               <div className="text-[10px] text-muted-foreground mt-2 font-mono">Status: Coding...</div>
            </div>

            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3">
                 <h2 className="font-heading text-xl font-semibold text-white uppercase">Trapping Rain Water</h2>
                 <DifficultyBadge difficulty="Hard" />
               </div>

               <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                 <p>Given <code className="bg-white/10 px-1.5 py-0.5 font-mono text-xs text-white">n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.</p>

                 <div className="border border-white/10 p-3">
                   <div className="text-xs uppercase text-white/70 mb-1 font-mono">Example 1:</div>
                   <pre className="text-xs text-white/50 whitespace-pre-wrap font-mono">
                     Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]{'\n'}
                     Output: 6{'\n'}
                   </pre>
                 </div>
                 
                 <div className="border border-white/10 p-3">
                   <div className="text-xs uppercase text-white/70 mb-1 font-mono">Constraints:</div>
                   <ul className="list-inside list-disc text-xs text-white/50 space-y-1 font-mono">
                     <li><code className="text-white/80">n == height.length</code></li>
                     <li><code className="text-white/80">1 &lt;= n &lt;= 2 * 10^4</code></li>
                   </ul>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* Right: Code editor */}
        <div className={`flex flex-1 flex-col h-full overflow-hidden transition-opacity duration-1000 ${matchStatus === 'waiting' ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          {matchStatus === 'waiting' && <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40"><div className="brutal-border bg-black text-white px-6 py-3 font-heading uppercase text-xl font-black brutal-shadow-sm rotate-3 opacity-80 select-none tracking-widest text-center">Editor Locked<br/><span className="text-[10px] text-muted-foreground font-mono font-normal tracking-normal -rotate-3 block mt-2">Waiting for match block</span></div></div>}
          
          {/* Editor toolbar */}
          <div className="flex items-center justify-between border-b border-white/20 px-4 py-2 shrink-0 bg-white/5 relative z-10">
            <select
              value={lang}
              onChange={e => handleLangChange(e.target.value)}
              className="bg-transparent text-xs font-mono uppercase text-white outline-none cursor-pointer hover:text-primary transition-colors"
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleRun}
                disabled={running}
                className="border border-white/20 px-4 py-1 text-xs font-mono uppercase text-white transition-colors hover:bg-white/10 disabled:opacity-50"
              >
                {running ? "Compiling..." : "Run"}
              </button>
              <button className="bg-primary text-black px-4 py-1 text-xs font-mono uppercase font-bold transition-colors hover:bg-primary/80">
                Submit
              </button>
            </div>
          </div>

          {/* Code area */}
          <div className="flex-1 overflow-hidden relative">
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
              className="h-full w-full resize-none bg-transparent p-4 font-mono text-[14px] leading-relaxed text-white/90 outline-none relative z-10"
              style={{ tabSize: 4 }}
            />
          </div>

          {/* Console */}
          <div className="border-t border-white/20 transition-all flex flex-col relative z-20" style={{ flex: consoleOpen ? '0 0 200px' : '0 0 36px' }}>
            <button
              onClick={() => setConsoleOpen(!consoleOpen)}
              className="flex w-full items-center justify-between px-4 py-2 text-xs font-mono uppercase text-white hover:bg-white/5 transition-colors border-none bg-white/5"
            >
              <span className="text-white/80">Terminal</span>
              <span className="text-white/50">{consoleOpen ? '▼' : '▲'}</span>
            </button>
            {consoleOpen && (
              <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-white/70 bg-black">
                {running ? (
                  <div className="flex flex-col gap-1">
                     <span className="text-warning/80">Compiling...</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {matchStatus === 'waiting' ? (
                      <div className="text-muted-foreground/50 italic text-center mt-6">Match has not started.</div>
                    ) : (
                      <>
                        <div className="text-success/80">✓ Test 1 Passed</div>
                        <div className="text-success/80">✓ Test 2 Passed</div>
                        <div className="text-success/80">✓ Test 3 Passed</div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
