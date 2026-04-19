// Mock data for AlgoClash

export interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  companies: string[];
  acceptanceRate: number;
  solveCount: number;
  status: 'solved' | 'attempted' | 'unsolved';
}

export interface ContestProblem {
  letter: string;
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  score: number;
}

export interface Contest {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  duration: number;
  registeredCount: number;
  type: 'Rated' | 'Unrated' | 'Special';
  status: 'upcoming' | 'ongoing' | 'ended';
  problems: number;
  description: string;
  contestProblems: ContestProblem[];
}

export interface User {
  username: string;
  email: string;
  avatar: string;
  bio: string;
  college: string;
  batch: string;
  rating: number;
  rank: string;
  coins: number;
  streak: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  badges: string[];
  contestHistory: { date: string; rating: number }[];
  submissionCalendar: Record<string, number>;
  topicStrength: { topic: string; score: number }[];
}

export interface Discussion {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  category: string;
  upvotes: number;
  commentCount: number;
  timeAgo: string;
  preview: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  banner: string;
  category: string;
  pinned: boolean;
  date: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  rating: number;
  solved: number;
  streak: number;
}

export const mockProblems: Problem[] = [
  { id: 1, title: 'Two Sum', slug: 'two-sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'], companies: ['Google', 'Amazon'], acceptanceRate: 49.2, solveCount: 15420, status: 'solved' },
  { id: 2, title: 'Add Two Numbers', slug: 'add-two-numbers', difficulty: 'Medium', tags: ['Linked List', 'Math'], companies: ['Microsoft', 'Amazon'], acceptanceRate: 39.8, solveCount: 8930, status: 'attempted' },
  { id: 3, title: 'Longest Substring Without Repeating', slug: 'longest-substring', difficulty: 'Medium', tags: ['String', 'Sliding Window'], companies: ['Google', 'Meta'], acceptanceRate: 33.5, solveCount: 12100, status: 'unsolved' },
  { id: 4, title: 'Median of Two Sorted Arrays', slug: 'median-sorted-arrays', difficulty: 'Hard', tags: ['Array', 'Binary Search', 'Divide and Conquer'], companies: ['Apple', 'Google'], acceptanceRate: 35.2, solveCount: 4200, status: 'unsolved' },
  { id: 5, title: 'Longest Palindromic Substring', slug: 'longest-palindromic', difficulty: 'Medium', tags: ['String', 'Dynamic Programming'], companies: ['Amazon', 'Meta'], acceptanceRate: 32.1, solveCount: 9800, status: 'solved' },
  { id: 6, title: 'Zigzag Conversion', slug: 'zigzag-conversion', difficulty: 'Medium', tags: ['String'], companies: ['Bloomberg'], acceptanceRate: 44.3, solveCount: 3400, status: 'unsolved' },
  { id: 7, title: 'Reverse Integer', slug: 'reverse-integer', difficulty: 'Medium', tags: ['Math'], companies: ['Apple'], acceptanceRate: 27.4, solveCount: 7600, status: 'unsolved' },
  { id: 8, title: 'String to Integer (atoi)', slug: 'string-to-integer', difficulty: 'Medium', tags: ['String'], companies: ['Microsoft'], acceptanceRate: 16.6, solveCount: 2100, status: 'unsolved' },
  { id: 9, title: 'Palindrome Number', slug: 'palindrome-number', difficulty: 'Easy', tags: ['Math'], companies: ['Google'], acceptanceRate: 53.5, solveCount: 18200, status: 'solved' },
  { id: 10, title: 'Regular Expression Matching', slug: 'regex-matching', difficulty: 'Hard', tags: ['String', 'Dynamic Programming', 'Recursion'], companies: ['Google', 'Meta', 'Amazon'], acceptanceRate: 28.3, solveCount: 3100, status: 'unsolved' },
  { id: 11, title: 'Container With Most Water', slug: 'container-most-water', difficulty: 'Medium', tags: ['Array', 'Two Pointers'], companies: ['Amazon', 'Goldman Sachs'], acceptanceRate: 54.3, solveCount: 11200, status: 'solved' },
  { id: 12, title: 'Integer to Roman', slug: 'integer-to-roman', difficulty: 'Medium', tags: ['Math', 'String'], companies: ['Microsoft'], acceptanceRate: 61.2, solveCount: 5600, status: 'unsolved' },
  { id: 13, title: 'Roman to Integer', slug: 'roman-to-integer', difficulty: 'Easy', tags: ['Math', 'String'], companies: ['Amazon'], acceptanceRate: 58.7, solveCount: 14300, status: 'solved' },
  { id: 14, title: '3Sum', slug: 'three-sum', difficulty: 'Medium', tags: ['Array', 'Two Pointers', 'Sorting'], companies: ['Meta', 'Amazon', 'Google'], acceptanceRate: 32.5, solveCount: 9700, status: 'attempted' },
  { id: 15, title: 'Merge k Sorted Lists', slug: 'merge-k-sorted-lists', difficulty: 'Hard', tags: ['Linked List', 'Heap', 'Divide and Conquer'], companies: ['Amazon', 'Meta', 'Google'], acceptanceRate: 48.5, solveCount: 6800, status: 'unsolved' },
  { id: 16, title: 'Valid Parentheses', slug: 'valid-parentheses', difficulty: 'Easy', tags: ['Stack', 'String'], companies: ['Google', 'Meta'], acceptanceRate: 40.6, solveCount: 20100, status: 'solved' },
  { id: 17, title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists', difficulty: 'Easy', tags: ['Linked List', 'Recursion'], companies: ['Amazon', 'Microsoft'], acceptanceRate: 62.3, solveCount: 16500, status: 'solved' },
  { id: 18, title: 'Generate Parentheses', slug: 'generate-parentheses', difficulty: 'Medium', tags: ['String', 'Backtracking'], companies: ['Google'], acceptanceRate: 72.3, solveCount: 8400, status: 'unsolved' },
  { id: 19, title: 'Trapping Rain Water', slug: 'trapping-rain-water', difficulty: 'Hard', tags: ['Array', 'Two Pointers', 'Stack'], companies: ['Amazon', 'Google', 'Goldman Sachs'], acceptanceRate: 58.7, solveCount: 7200, status: 'attempted' },
  { id: 20, title: 'Climbing Stairs', slug: 'climbing-stairs', difficulty: 'Easy', tags: ['Dynamic Programming', 'Math'], companies: ['Apple', 'Amazon'], acceptanceRate: 51.8, solveCount: 19400, status: 'solved' },
];

export const mockContests: Contest[] = [
  { 
    id: 1, 
    name: 'AlgoClash Weekly #42', 
    startTime: '2026-04-20T14:00:00Z', 
    endTime: '2026-04-20T16:00:00Z', 
    duration: 120, 
    registeredCount: 1243, 
    type: 'Rated', 
    status: 'upcoming', 
    problems: 4,
    description: "Our signature weekly challenge. Solve 4 algorithmic problems in 2 hours to improve your rating.",
    contestProblems: [
      { letter: 'A', slug: 'running-sum', title: 'Running Sum of 1d Array', difficulty: 'Easy', score: 50 },
      { letter: 'B', slug: 'shuffle-array', title: 'Shuffle the Array', difficulty: 'Easy', score: 100 },
      { letter: 'C', slug: 'capacity-ship', title: 'Capacity To Ship Packages', difficulty: 'Medium', score: 200 },
      { letter: 'D', slug: 'two-sum', title: 'Two Sum', difficulty: 'Hard', score: 500 },
    ]
  },
  { 
    id: 2, 
    name: 'Biweekly Challenge #18', 
    startTime: '2026-04-18T10:00:00Z', 
    endTime: '2026-04-18T12:30:00Z', 
    duration: 150, 
    registeredCount: 876, 
    type: 'Rated', 
    status: 'upcoming', 
    problems: 5,
    description: "A mid-week brain teaser. 5 problems of increasing difficulty to keep your skills sharp.",
    contestProblems: [
      { letter: 'A', slug: 'fizz-buzz', title: 'Fizz Buzz', difficulty: 'Easy', score: 50 },
      { letter: 'B', slug: 'group-anagrams', title: 'Group Anagrams', difficulty: 'Medium', score: 150 },
      { letter: 'C', slug: 'word-break', title: 'Word Break', difficulty: 'Medium', score: 200 },
      { letter: 'D', slug: 'spiral-matrix', title: 'Spiral Matrix', difficulty: 'Medium', score: 250 },
      { letter: 'E', slug: 'n-queens', title: 'N-Queens', difficulty: 'Hard', score: 500 },
    ]
  },
  { 
    id: 3, 
    name: 'Spring Special: DP Marathon', 
    startTime: '2026-04-15T08:00:00Z', 
    endTime: '2026-04-15T14:00:00Z', 
    duration: 360, 
    registeredCount: 2100, 
    type: 'Special', 
    status: 'ongoing', 
    problems: 8,
    description: "6 hours of pure Dynamic Programming. Can you master the state transitions?",
    contestProblems: [
      { letter: 'A', slug: 'climbing-stairs', title: 'Climbing Stairs', difficulty: 'Easy', score: 50 },
      { letter: 'B', slug: 'house-robber', title: 'House Robber', difficulty: 'Medium', score: 100 },
      { letter: 'C', slug: 'longest-palindromic', title: 'Longest Palindromic Substring', difficulty: 'Medium', score: 150 },
      { letter: 'D', slug: 'edit-distance', title: 'Edit Distance', difficulty: 'Medium', score: 200 },
      { letter: 'E', slug: 'lcs', title: 'Longest Common Subsequence', difficulty: 'Medium', score: 250 },
      { letter: 'F', slug: 'unique-paths-ii', title: 'Unique Paths II', difficulty: 'Medium', score: 300 },
      { letter: 'G', slug: 'maximal-square', title: 'Maximal Square', difficulty: 'Hard', score: 400 },
      { letter: 'H', slug: 'burst-balloons', title: 'Burst Balloons', difficulty: 'Hard', score: 600 },
    ]
  },
  { 
    id: 4, 
    name: 'AlgoClash Weekly #41', 
    startTime: '2026-04-13T14:00:00Z', 
    endTime: '2026-04-13T16:00:00Z', 
    duration: 120, 
    registeredCount: 1567, 
    type: 'Rated', 
    status: 'ended', 
    problems: 4,
    description: "Weekly contest from last week. Review the problems and see how you would have performed.",
    contestProblems: [
      { letter: 'A', slug: 'two-sum', title: 'Two Sum', difficulty: 'Easy', score: 50 },
      { letter: 'B', slug: 'container-most-water', title: 'Contain With Most Water', difficulty: 'Medium', score: 150 },
      { letter: 'C', slug: 'three-sum', title: '3Sum', difficulty: 'Medium', score: 200 },
      { letter: 'D', slug: 'trapping-rain-water', title: 'Trapping Rain Water', difficulty: 'Hard', score: 500 },
    ]
  },
  { 
    id: 5, 
    name: 'Practice Round: Graphs', 
    startTime: '2026-04-10T10:00:00Z', 
    endTime: '2026-04-10T12:00:00Z', 
    duration: 120, 
    registeredCount: 450, 
    type: 'Unrated', 
    status: 'ended', 
    problems: 3,
    description: "Focus on Graph theory. BFS, DFS, and Dijkstra's algorithm challenges.",
    contestProblems: [
      { letter: 'A', title: 'Number of Islands', difficulty: 'Medium', score: 100 },
      { letter: 'B', title: 'Course Schedule', difficulty: 'Medium', score: 200 },
      { letter: 'C', title: 'Word Ladder', difficulty: 'Hard', score: 400 },
    ]
  },
  { 
    id: 6, 
    name: 'AlgoClash Weekly #40', 
    startTime: '2026-04-06T14:00:00Z', 
    endTime: '2026-04-06T16:00:00Z', 
    duration: 120, 
    registeredCount: 1890, 
    type: 'Rated', 
    status: 'ended', 
    problems: 4,
    description: "Historical weekly contest. Great for practice and interview preparation.",
    contestProblems: [
      { letter: 'A', title: 'Valid Parentheses', difficulty: 'Easy', score: 50 },
      { letter: 'B', title: 'Merge k Sorted Lists', difficulty: 'Hard', score: 400 },
      { letter: 'C', title: 'Reverse Nodes in k-Group', difficulty: 'Hard', score: 500 },
      { letter: 'D', title: 'Longest Valid Parentheses', difficulty: 'Hard', score: 600 },
    ]
  },
];

export const mockUser: User = {
  username: 'clash_master',
  email: 'clash@algoclash.dev',
  avatar: '',
  bio: 'Competitive programmer | Diamond rank | Love algorithms',
  college: 'MIT',
  batch: '2024',
  rating: 2547,
  rank: 'Diamond',
  coins: 3420,
  streak: 42,
  totalSolved: 347,
  easySolved: 120,
  mediumSolved: 165,
  hardSolved: 62,
  badges: ['First Blood', 'Century', 'Contest King', 'Speed Demon', 'On Fire', 'Polyglot'],
  contestHistory: [
    { date: '2026-01', rating: 1800 }, { date: '2026-02', rating: 2100 },
    { date: '2026-03', rating: 2350 }, { date: '2026-04', rating: 2547 },
  ],
  submissionCalendar: (() => {
    const cal: Record<string, number> = {};
    for (let i = 0; i < 365; i++) {
      const d = new Date(2025, 3, 15);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      cal[key] = Math.random() > 0.3 ? Math.floor(Math.random() * 8) + 1 : 0;
    }
    return cal;
  })(),
  topicStrength: [
    { topic: 'Arrays', score: 92 }, { topic: 'DP', score: 78 },
    { topic: 'Graphs', score: 85 }, { topic: 'Trees', score: 88 },
    { topic: 'Math', score: 70 }, { topic: 'Strings', score: 95 },
  ],
};

export const mockDiscussions: Discussion[] = [
  { id: 1, title: 'How to approach DP problems systematically?', author: 'algo_guru', authorAvatar: '', category: 'Algorithms', upvotes: 142, commentCount: 38, timeAgo: '2h ago', preview: 'I have been struggling with DP problems for a while. Here is my approach...' },
  { id: 2, title: 'System Design: Building a Rate Limiter', author: 'sys_designer', authorAvatar: '', category: 'System Design', upvotes: 98, commentCount: 22, timeAgo: '5h ago', preview: 'Let us discuss different approaches to building a rate limiter...' },
  { id: 3, title: 'Google Interview Experience 2026', author: 'lucky_dev', authorAvatar: '', category: 'Interview Prep', upvotes: 256, commentCount: 67, timeAgo: '1d ago', preview: 'Just finished my Google L4 interviews. Here is how it went...' },
  { id: 4, title: 'Best resources for Graph algorithms?', author: 'graph_fan', authorAvatar: '', category: 'Data Structures', upvotes: 67, commentCount: 15, timeAgo: '3d ago', preview: 'Looking for comprehensive resources to master graph algorithms...' },
  { id: 5, title: 'Weekly Contest #41 Discussion', author: 'contest_lover', authorAvatar: '', category: 'General', upvotes: 45, commentCount: 89, timeAgo: '2d ago', preview: 'Let us discuss the problems from this week contest...' },
];

export const mockAnnouncements: Announcement[] = [
  { id: 1, title: 'Spring Special: DP Marathon is Live!', content: 'Join our biggest event of the season...', banner: '', category: 'Events', pinned: true, date: '2026-04-15' },
  { id: 2, title: 'New Feature: AI Interview Mode', content: 'Practice mock interviews with our AI...', banner: '', category: 'Features', pinned: false, date: '2026-04-12' },
  { id: 3, title: 'AlgoClash v2.0 Release Notes', content: 'Major update with new features...', banner: '', category: 'Updates', pinned: false, date: '2026-04-10' },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'tourist', avatar: '', rating: 3842, solved: 1247, streak: 365 },
  { rank: 2, username: 'Petr', avatar: '', rating: 3567, solved: 1189, streak: 180 },
  { rank: 3, username: 'ecnerwala', avatar: '', rating: 3421, solved: 1056, streak: 220 },
  { rank: 4, username: 'Um_nik', avatar: '', rating: 3298, solved: 987, streak: 90 },
  { rank: 5, username: 'Benq', avatar: '', rating: 3187, solved: 945, streak: 150 },
  { rank: 6, username: 'jiangly', avatar: '', rating: 3102, solved: 890, streak: 75 },
  { rank: 7, username: 'ksun48', avatar: '', rating: 3054, solved: 856, streak: 60 },
  { rank: 8, username: 'clash_master', avatar: '', rating: 2547, solved: 347, streak: 42 },
  { rank: 9, username: 'algo_queen', avatar: '', rating: 2501, solved: 412, streak: 88 },
  { rank: 10, username: 'code_ninja', avatar: '', rating: 2456, solved: 389, streak: 33 },
];

export const allTags = ['Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Sorting', 'Greedy', 'Binary Search', 'Tree', 'Graph', 'Stack', 'Queue', 'Heap', 'Linked List', 'Two Pointers', 'Sliding Window', 'Backtracking', 'Recursion', 'Divide and Conquer', 'Bit Manipulation'];
