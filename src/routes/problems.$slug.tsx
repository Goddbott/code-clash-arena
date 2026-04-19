import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Play, Send, terminal, Clock, Database, Code2, ChevronRight, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { mockProblems } from "../lib/mock-data";
import { StarsBackground } from "../components/StarsBackground";

export const Route = createFileRoute("/problems/$slug")({
  component: ProblemDetailPage,
});

const languages = ["C++", "Python", "Java", "JavaScript", "Go", "Rust"];

const codeTemplates: Record<string, string> = {
  "C++": `#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> hash;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (hash.find(complement) != hash.end()) {
                return {hash[complement], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};`,
  Python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        hash_map = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in hash_map:
                return [hash_map[complement], i]
            hash_map[num] = i
        return []`,
};

function ProblemDetailPage() {
  const { slug } = Route.useParams();
  const problem = mockProblems.find(p => p.slug === slug) || mockProblems[0];
  const [lang, setLang] = useState("C++");
  const [code, setCode] = useState(codeTemplates[lang] || "// Start coding...");
  const [tab, setTab] = useState<'description' | 'submissions' | 'hints'>('description');
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    if (codeTemplates[lang]) {
      setCode(codeTemplates[lang]);
    }
  }, [lang]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(["SYSTEM: Initializing compiler...", "SYSTEM: Linked object libraries...", "SYSTEM: Running test cases..."]);
    
    setTimeout(() => {
      setOutput(prev => [...prev, "TEST CASE 1: [2,7,11,15], target=9", "RESULT: PASSED (Indices: [0,1])", "TEST CASE 2: [3,2,4], target=6", "RESULT: PASSED (Indices: [1,2])", "--- EXECUTION FINISHED ---"]);
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col pt-16 overflow-hidden font-sans">
      <StarsBackground />

      {/* Top Navigation */}
      <div className="relative z-20 border-b-2 border-white/10 bg-black/80 backdrop-blur-md px-6 py-2 flex items-center justify-between">
        <Link 
          to="/contest" 
          className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors font-mono text-xs uppercase font-black"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Contest
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold text-muted-foreground">
             <Clock className="w-3 h-3 text-primary" />
             01:42:00 Remaining
          </div>
          <div className="h-4 w-[1px] bg-white/20"></div>
          <h2 className="font-heading text-sm font-black uppercase tracking-widest">{problem.title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="brutal-border bg-white/5 p-2 hover:bg-white/10 transition-colors">
            <AlertCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Left Section: Problem */}
        <div className="flex-1 flex flex-col border-r-2 border-white/10 overflow-hidden bg-black/20">
          {/* Tabs */}
          <div className="flex border-b-2 border-white/10 bg-black/40">
            {(['description', 'submissions', 'hints'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-8 py-3 font-mono text-xs font-black uppercase tracking-wider transition-all border-r-2 border-white/10 ${
                  tab === t ? 'bg-primary text-black' : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {tab === 'description' && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="max-w-2xl space-y-6"
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="h-12 w-12 brutal-border bg-black flex items-center justify-center font-heading text-xl font-black text-primary -rotate-2">
                    {problem.id}
                  </span>
                  <h1 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none glitch-text" data-text={problem.title}>
                    {problem.title}
                  </h1>
                </div>

                <div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase font-black">
                  <div className={`brutal-border px-3 py-1 ${problem.difficulty === 'Easy' ? 'bg-green-500' : problem.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'} text-black`}>{problem.difficulty}</div>
                  <div className="brutal-border bg-white/5 px-3 py-1 flex items-center gap-2"><Database className="w-3 h-3 text-cyan" /> {problem.solveCount.toLocaleString()} Solves</div>
                  <div className="brutal-border bg-white/5 px-3 py-1 flex items-center gap-2"><Code2 className="w-3 h-3 text-primary" /> {problem.tags[0]}</div>
                </div>

                <div className="space-y-4 text-sm md:text-base text-muted-foreground font-mono leading-relaxed bg-white/5 p-6 brutal-border border-dashed border-white/20">
                  <p>Given an array of integers <code className="text-cyan font-black">nums</code> and an integer <code className="text-cyan font-black">target</code>, return indices of the two numbers such that they add up to <code className="text-cyan font-black">target</code>.</p>
                  <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
                  <p>You can return the answer in any order.</p>
                </div>

                {/* Example Terminal */}
                <div className="space-y-4">
                  <h3 className="font-heading text-lg font-black uppercase tracking-wide flex items-center gap-2">
                    <ChevronRight className="w-5 h-5 text-primary" />
                    Example 1
                  </h3>
                  <div className="brutal-border bg-black p-6 font-mono text-sm space-y-2 border-l-4 border-l-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                    <div className="flex gap-4">
                      <span className="text-muted-foreground">INPUT:</span>
                      <span className="text-white">nums = [2,7,11,15], target = 9</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-muted-foreground">OUTPUT:</span>
                      <span className="text-primary font-black">[0,1]</span>
                    </div>
                    <div className="pt-2 italic text-xs text-muted-foreground border-t border-white/5">
                      EXPLANATION: Because nums[0] + nums[1] == 9, we return [0, 1].
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-heading text-lg font-black uppercase tracking-wide flex items-center gap-2">
                    <ChevronRight className="w-5 h-5 text-primary" />
                    Constraints
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs uppercase text-muted-foreground border-2 border-white/10 p-6 bg-black/40">
                    <li className="flex items-center gap-2"><span className="text-primary">▸</span> 2 ≤ nums.length ≤ 10⁴</li>
                    <li className="flex items-center gap-2"><span className="text-primary">▸</span> -10⁹ ≤ nums[i] ≤ 10⁹</li>
                    <li className="flex items-center gap-2"><span className="text-primary">▸</span> -10⁹ ≤ target ≤ 10⁹</li>
                    <li className="flex items-center gap-2 border-primary/20 bg-primary/5 px-2 py-1"><span className="text-primary">▸</span> Only one valid answer</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Section: Compiler */}
        <div className="flex-1 flex flex-col overflow-hidden bg-black/40">
          {/* Editor Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b-2 border-white/10 bg-black/60">
            <div className="flex items-center gap-4">
              <select 
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-black brutal-border px-4 py-1.5 font-mono text-xs font-black uppercase text-white focus:outline-none hover:bg-white/5 transition-colors"
              >
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-mono uppercase">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                Auto-save enabled
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleRun}
                disabled={isRunning}
                className="brutal-border bg-white text-black px-6 py-2 font-black uppercase text-xs hover:bg-primary transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Play className="w-3 h-3 fill-current" />
                {isRunning ? 'Running...' : 'Run'}
              </button>
              <button className="brutal-border bg-primary text-black px-8 py-2 font-black uppercase text-xs hover:bg-white transition-all brutal-shadow-sm shadow-primary/40 flex items-center gap-2">
                <Send className="w-3 h-3" />
                Submit
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 relative overflow-hidden bg-black/60">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-8 bg-transparent font-mono text-sm text-foreground outline-none resize-none custom-scrollbar selection:bg-primary selection:text-black"
              spellCheck="false"
              placeholder="// Enter your solution here..."
            />
          </div>

          {/* Console Area */}
          <div className={`border-t-4 border-white/10 bg-black transition-all ${consoleOpen ? 'h-64' : 'h-10'}`}>
            <div 
              className="flex items-center justify-between px-6 py-2 border-b-2 border-white/10 cursor-pointer hover:bg-white/5"
              onClick={() => setConsoleOpen(!consoleOpen)}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`}></div>
                <span className="font-mono text-[10px] uppercase font-black tracking-widest text-muted-foreground">Terminal Output</span>
              </div>
              <ChevronLeft className={`w-4 h-4 transition-transform ${consoleOpen ? '-rotate-90' : 'rotate-90'}`} />
            </div>
            {consoleOpen && (
              <div className="p-6 font-mono text-xs space-y-2 overflow-y-auto h-[calc(100%-40px)] custom-scrollbar">
                {output.length === 0 ? (
                  <div className="text-muted-foreground italic uppercase opacity-40">_No execution logs found. Run your code to start analysis.</div>
                ) : (
                  output.map((line, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex gap-3 ${line.startsWith('RESULT') ? 'text-green-400 font-bold' : line.startsWith('SYSTEM') ? 'text-cyan' : 'text-white'}`}
                    >
                      <span className="text-white/20 select-none">[{i + 1}]</span>
                      <span>{line}</span>
                    </motion.div>
                  ))
                )}
                {isRunning && (
                  <div className="flex items-center gap-2 text-primary animate-pulse">
                    <span className="text-white/20">[{output.length + 1}]</span>
                    <span>PROCESSING DATA...</span>
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
