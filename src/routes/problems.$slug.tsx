import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { mockProblems } from "../lib/mock-data";
import { DifficultyBadge } from "../components/DifficultyBadge";

export const Route = createFileRoute("/problems/$slug")({
  head: () => ({
    meta: [
      { title: "Problem — AlgoClash" },
      { name: "description", content: "Solve this coding problem on AlgoClash." },
    ],
  }),
  component: ProblemDetailPage,
});

const languages = ["C++", "Python", "Java", "JavaScript", "Go", "Rust"];

const codeTemplates: Record<string, string> = {
  "C++": `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`,
  Python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your solution here
        pass`,
  Java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
  JavaScript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
    
};`,
  Go: `func twoSum(nums []int, target int) []int {
    // Write your solution here
    
}`,
  Rust: `impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // Write your solution here
        
    }
}`,
};

const mockSubmissions = [
  { id: 1, verdict: 'Accepted', time: '4ms', memory: '42.1 MB', language: 'C++', date: '2 hours ago' },
  { id: 2, verdict: 'Wrong Answer', time: '—', memory: '—', language: 'Python', date: '3 hours ago' },
  { id: 3, verdict: 'Time Limit Exceeded', time: '—', memory: '—', language: 'Java', date: '1 day ago' },
];

function ProblemDetailPage() {
  const { slug } = Route.useParams();
  const problem = mockProblems.find(p => p.slug === slug) || mockProblems[0];
  const [lang, setLang] = useState("C++");
  const [code, setCode] = useState(codeTemplates["C++"] || "");
  const [tab, setTab] = useState<'description' | 'submissions' | 'hints'>('description');
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [running, setRunning] = useState(false);

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
    <div className="flex min-h-screen flex-col pt-16 lg:flex-row">
      {/* Left: Problem description */}
      <div className="flex-1 overflow-y-auto border-r border-border p-6 lg:max-h-screen lg:pt-20">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold">{problem.id}. {problem.title}</h1>
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {problem.tags.map(t => (
              <span key={t} className="rounded-md bg-surface-elevated px-2 py-1 text-xs text-muted-foreground">{t}</span>
            ))}
            {problem.companies.map(c => (
              <span key={c} className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">{c}</span>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-4 border-b border-border">
            {(['description', 'submissions', 'hints'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-2 text-sm font-medium capitalize transition-colors ${
                  tab === t ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'description' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-4 text-sm leading-relaxed text-secondary-foreground">
              <p>Given an array of integers <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-xs text-cyan">nums</code> and an integer <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-xs text-cyan">target</code>, return indices of the two numbers such that they add up to <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-xs text-cyan">target</code>.</p>
              <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>

              <div className="rounded-lg bg-surface p-4">
                <div className="text-xs font-semibold text-muted-foreground">Example 1:</div>
                <pre className="mt-2 font-mono text-xs text-foreground">
{`Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] == 9`}
                </pre>
              </div>
              <div className="rounded-lg bg-surface p-4">
                <div className="text-xs font-semibold text-muted-foreground">Example 2:</div>
                <pre className="mt-2 font-mono text-xs text-foreground">
{`Input: nums = [3,2,4], target = 6
Output: [1,2]`}
                </pre>
              </div>

              <div className="rounded-lg bg-surface p-4">
                <div className="text-xs font-semibold text-muted-foreground">Constraints:</div>
                <ul className="mt-2 list-inside list-disc text-xs text-muted-foreground">
                  <li>2 ≤ nums.length ≤ 10⁴</li>
                  <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                  <li>-10⁹ ≤ target ≤ 10⁹</li>
                  <li>Only one valid answer exists.</li>
                </ul>
              </div>
            </motion.div>
          )}

          {tab === 'submissions' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              <div className="space-y-2">
                {mockSubmissions.map(s => (
                  <div key={s.id} className="flex items-center justify-between rounded-lg bg-surface p-3 text-sm">
                    <span className={`font-semibold ${
                      s.verdict === 'Accepted' ? 'text-success' : s.verdict === 'Wrong Answer' ? 'text-destructive' : 'text-warning'
                    }`}>
                      {s.verdict}
                    </span>
                    <span className="text-muted-foreground">{s.language}</span>
                    <span className="text-muted-foreground">{s.time}</span>
                    <span className="text-muted-foreground text-xs">{s.date}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === 'hints' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-3">
              {['Think about using a hash map to store values you\'ve seen.', 'For each element, check if target - element exists in your map.', 'This gives you O(n) time complexity.'].map((hint, i) => (
                <div key={i} className="group rounded-lg bg-surface p-3">
                  <div className="text-xs font-semibold text-muted-foreground">Hint {i + 1}</div>
                  <p className="mt-1 text-sm text-foreground blur-sm transition-all group-hover:blur-0">{hint}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Right: Code editor */}
      <div className="flex flex-1 flex-col lg:max-h-screen lg:pt-16">
        {/* Editor toolbar */}
        <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2">
          <select
            value={lang}
            onChange={e => handleLangChange(e.target.value)}
            className="rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-xs text-foreground"
          >
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleRun}
              disabled={running}
              className="rounded-md border border-border bg-surface-elevated px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              {running ? "Running..." : "▶ Run"}
            </button>
            <button className="glow-primary rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:brightness-110">
              Submit
            </button>
          </div>
        </div>

        {/* Code area */}
        <div className="flex-1 overflow-hidden">
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            className="h-full w-full resize-none bg-background p-4 font-mono text-sm text-foreground outline-none"
            style={{ tabSize: 4 }}
          />
        </div>

        {/* Console */}
        <div className="border-t border-border">
          <button
            onClick={() => setConsoleOpen(!consoleOpen)}
            className="flex w-full items-center justify-between bg-surface px-4 py-2 text-xs font-medium text-muted-foreground"
          >
            <span>Console</span>
            <span>{consoleOpen ? '▼' : '▲'}</span>
          </button>
          {consoleOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 150 }}
              className="overflow-y-auto bg-background p-4 font-mono text-xs"
            >
              {running ? (
                <span className="text-muted-foreground">Running test cases...</span>
              ) : (
                <div className="space-y-1">
                  <div className="text-success">✓ Test case 1: Passed (nums=[2,7,11,15], target=9)</div>
                  <div className="text-success">✓ Test case 2: Passed (nums=[3,2,4], target=6)</div>
                  <div className="text-muted-foreground">2/2 test cases passed</div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
