import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { DifficultyBadge } from "../components/DifficultyBadge";

export const Route = createFileRoute("/duel")({
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
  const [lang, setLang] = useState("Python");
  const [code, setCode] = useState(codeTemplates["Python"] || "");
  const [running, setRunning] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [opponentProgress, setOpponentProgress] = useState(0);

  useEffect(() => {
    // Fake opponent progress
    const interval = setInterval(() => {
      setOpponentProgress(p => (p < 5 ? p + 1 : p));
    }, 15000); // Opponent solves a test case every 15 seconds
    return () => clearInterval(interval);
  }, []);

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
    <div className="flex h-screen max-h-screen flex-col bg-black text-white font-sans pt-16 font-mono overflow-hidden">
      {/* Top Banner */}
      <div className="brutal-border border-l-0 border-r-0 bg-primary px-4 py-3 flex items-center justify-between z-10 relative shrink-0">
        <div className="flex items-center gap-4">
           <span className="font-heading text-xl font-black uppercase text-black">
             Time: <span className="text-white">14:59</span>
           </span>
        </div>
        <h1 className="font-heading text-xl md:text-3xl font-black uppercase tracking-tighter text-center absolute left-1/2 -translate-x-1/2">
           <span className="glitch-text text-white" data-text="1V1 DUEL">1V1 DUEL</span>
        </h1>
        <div className="hidden md:flex items-center gap-4">
           <span className="font-mono text-sm font-black uppercase text-black flex items-center gap-2">
             <span className="w-2 h-2 bg-destructive animate-pulse brutal-border border-2 border-black"></span>
             Recording
           </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Left: Problem description & Opponent Status */}
        <div className="flex-1 overflow-y-auto border-r-[4px] border-white p-6 bg-black flex flex-col gap-6">
          {/* Opponent Status */}
          <div className="brutal-border brutal-shadow-magenta bg-black p-4 flex flex-col gap-2 relative">
             <div className="absolute -top-3 -right-3 brutal-border bg-warning text-black px-2 py-0.5 text-[10px] font-black uppercase">Live</div>
             <div className="flex justify-between items-center text-xs font-black uppercase">
               <span className="text-accent">Opponent (ProCoder_99)</span>
               <span className="text-white">{opponentProgress}/5 Test Cases</span>
             </div>
             <div className="h-4 w-full bg-white/10 brutal-border p-0.5 flex gap-1">
               {[1, 2, 3, 4, 5].map(test => (
                 <div key={test} className={`flex-1 h-full brutal-border border-2 border-black ${test <= opponentProgress ? 'bg-accent' : 'bg-transparent'}`}></div>
               ))}
             </div>
             <div className="text-[10px] text-muted-foreground mt-1 animate-pulse">Compiling new solution...</div>
          </div>

          <div className="brutal-border brutal-shadow-cyan bg-black p-6 flex flex-col gap-4 mt-2">
             <div className="flex items-center gap-3">
               <h2 className="font-heading text-2xl font-black uppercase text-white">Trapping Rain Water</h2>
               <DifficultyBadge difficulty="Hard" />
             </div>

             <div className="space-y-4 text-sm leading-relaxed text-muted-foreground mt-4 file:font-mono">
               <p>Given <code className="bg-white/10 px-1 py-0.5 text-cyan brutal-border border-white/20">n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.</p>

               <div className="brutal-border bg-white/5 p-4">
                 <div className="text-xs font-black uppercase text-primary mb-2">Example 1:</div>
                 <pre className="mt-2 text-xs text-white whitespace-pre-wrap">
                   Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]{'\n'}
                   Output: 6{'\n'}
                   Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
                 </pre>
               </div>
               
               <div className="brutal-border bg-white/5 p-4">
                 <div className="text-xs font-black uppercase text-primary mb-2">Constraints:</div>
                 <ul className="list-inside list-disc text-xs text-white space-y-1">
                   <li><code className="text-cyan">n == height.length</code></li>
                   <li><code className="text-cyan">1 &lt;= n &lt;= 2 * 10^4</code></li>
                   <li><code className="text-cyan">0 &lt;= height[i] &lt;= 10^5</code></li>
                 </ul>
               </div>
             </div>
          </div>
        </div>

        {/* Right: Code editor */}
        <div className="flex flex-1 flex-col h-full overflow-hidden">
          {/* Editor toolbar */}
          <div className="flex items-center justify-between border-b-[4px] border-white bg-black px-4 py-3 shrink-0">
            <select
              value={lang}
              onChange={e => handleLangChange(e.target.value)}
              className="brutal-border bg-black px-3 py-1 text-sm font-bold uppercase text-white outline-none cursor-pointer hover:bg-white hover:text-black transition-colors"
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <div className="flex gap-4">
              <button
                onClick={handleRun}
                disabled={running}
                className="brutal-border bg-white px-6 py-2 text-xs font-black uppercase text-black transition-all hover:bg-cyan hover:text-black hover:translate-x-1 hover:-translate-y-1 brutal-shadow-sm disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:brutal-shadow-none"
              >
                {running ? "Compiling..." : "Run Code"}
              </button>
              <button className="brutal-border bg-primary px-8 py-2 text-xs font-black uppercase text-black transition-all hover:-translate-x-1 hover:-translate-y-1 brutal-shadow-primary hover:bg-white">
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
              className="h-full w-full resize-none bg-[#0a0a0a] p-6 font-mono text-[15px] leading-relaxed text-cyan outline-none"
              style={{ tabSize: 4 }}
            />
          </div>

          {/* Console */}
          <div className="border-t-[4px] border-white bg-black z-10 transition-all flex flex-col" style={{ flex: consoleOpen ? '0 0 250px' : '0 0 45px' }}>
            <button
              onClick={() => setConsoleOpen(!consoleOpen)}
              className="flex w-full items-center justify-between bg-black px-4 py-3 text-xs font-black uppercase text-white hover:bg-white hover:text-black transition-colors border-none"
            >
              <span className="flex items-center gap-2"><span className="text-primary">▶</span> Execution Terminal</span>
              <span>{consoleOpen ? 'SCROLL DOWN ▼' : 'EXPAND ▲'}</span>
            </button>
            {consoleOpen && (
              <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-white bg-[#050505]">
                {running ? (
                  <div className="flex flex-col gap-2">
                     <span className="text-warning animate-pulse">&gt; Compiling binary...</span>
                     <span className="text-warning animate-pulse" style={{animationDelay: "0.2s"}}>&gt; Initializing test sandbox...</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-success font-bold">&gt; TEST 1: PASSED [21ms]</div>
                    <div className="text-success font-bold">&gt; TEST 2: PASSED [18ms]</div>
                    <div className="text-success font-bold">&gt; TEST 3: PASSED [19ms]</div>
                    <div className="brutal-border border-white/20 bg-success/10 p-2 mt-4 text-success border-l-4 border-l-success">
                      Execution completed successfully. Memory: 14.2 MB
                    </div>
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
