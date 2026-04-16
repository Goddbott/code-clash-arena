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
    <div className="flex h-screen max-h-screen flex-col bg-black text-white font-sans pt-16 overflow-hidden">
      {/* Minimal Top Banner */}
      <div className="border-b border-white/20 bg-background px-4 py-2 flex items-center justify-between shrink-0">
        <div className="text-sm font-mono text-muted-foreground">
          Time: <span className="text-white">14:59</span>
        </div>
        <div className="font-heading text-lg font-bold tracking-widest text-white/80 uppercase">
          1v1 Duel
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
          REC
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Left: Problem description & Opponent Status */}
        <div className="flex-1 overflow-y-auto border-r border-white/20 p-6 flex flex-col gap-6">
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

        {/* Right: Code editor */}
        <div className="flex flex-1 flex-col h-full overflow-hidden">
          {/* Editor toolbar */}
          <div className="flex items-center justify-between border-b border-white/20 px-4 py-2 shrink-0 bg-white/5">
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
              className="h-full w-full resize-none bg-transparent p-4 font-mono text-[14px] leading-relaxed text-white/90 outline-none"
              style={{ tabSize: 4 }}
            />
          </div>

          {/* Console */}
          <div className="border-t border-white/20 transition-all flex flex-col" style={{ flex: consoleOpen ? '0 0 200px' : '0 0 36px' }}>
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
                    <div className="text-success/80">✓ Test 1 Passed</div>
                    <div className="text-success/80">✓ Test 2 Passed</div>
                    <div className="text-success/80">✓ Test 3 Passed</div>
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
