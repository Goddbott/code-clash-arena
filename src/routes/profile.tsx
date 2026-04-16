import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { mockUser } from "../lib/mock-data";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — AlgoClash" },
      { name: "description", content: "User profile and statistics." },
    ],
  }),
  component: ProfilePage,
});

const radarData = mockUser.topicStrength.map(t => ({ subject: t.topic, A: t.score }));
const pieData = [
  { name: 'Easy', value: mockUser.easySolved, color: '#00e676' },
  { name: 'Medium', value: mockUser.mediumSolved, color: '#ffaa00' },
  { name: 'Hard', value: mockUser.hardSolved, color: '#ff4444' },
];
const ratingData = mockUser.contestHistory.map(h => ({ date: h.date, rating: h.rating }));

function SubmissionCalendar() {
  const weeks: string[][] = [];
  let currentWeek: string[] = [];
  const entries = Object.entries(mockUser.submissionCalendar).sort().slice(-364);

  entries.forEach((entry, i) => {
    currentWeek.push(entry[0]);
    if (currentWeek.length === 7 || i === entries.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const getColor = (date: string) => {
    const count = mockUser.submissionCalendar[date] || 0;
    if (count === 0) return 'bg-surface-elevated';
    if (count <= 2) return 'bg-success/20';
    if (count <= 4) return 'bg-success/40';
    if (count <= 6) return 'bg-success/60';
    return 'bg-success/80';
  };

  return (
    <div className="flex gap-[3px] overflow-x-auto py-2">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map(day => (
            <div
              key={day}
              className={`h-3 w-3 rounded-sm ${getColor(day)}`}
              title={`${day}: ${mockUser.submissionCalendar[day] || 0} submissions`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function ProfilePage() {
  const u = mockUser;

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 pt-24 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 font-heading text-3xl font-bold text-primary">
            {u.username[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="font-heading text-2xl font-bold">{u.username}</h1>
            <p className="text-sm text-muted-foreground">{u.bio}</p>
            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
              <span>🎓 {u.college}</span>
              <span>📅 Batch {u.batch}</span>
            </div>
          </div>
          <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-elevated">
            Edit Profile
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {[
            { label: 'Solved', value: u.totalSolved },
            { label: 'Rating', value: u.rating },
            { label: 'Rank', value: `👑 ${u.rank}` },
            { label: 'Streak', value: `🔥 ${u.streak}` },
            { label: 'Coins', value: `💰 ${u.coins}` },
            { label: 'Badges', value: u.badges.length },
          ].map(s => (
            <div key={s.label} className="rounded-lg bg-surface-elevated p-3 text-center">
              <div className="font-heading text-lg font-bold text-gradient-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Submission Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass mt-6 rounded-2xl p-6"
      >
        <h2 className="font-heading text-lg font-semibold">Submission Activity</h2>
        <SubmissionCalendar />
      </motion.div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Radar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="font-heading text-lg font-semibold">Topic Strength</h2>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(108,99,255,0.15)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#8888aa', fontSize: 11 }} />
              <Radar dataKey="A" stroke="#6c63ff" fill="#6c63ff" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Rating graph */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="font-heading text-lg font-semibold">Contest Rating</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ratingData}>
              <XAxis dataKey="date" tick={{ fill: '#8888aa', fontSize: 11 }} />
              <YAxis tick={{ fill: '#8888aa', fontSize: 11 }} domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip contentStyle={{ background: '#1a1a24', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 8, color: '#f0f0ff' }} />
              <Line type="monotone" dataKey="rating" stroke="#6c63ff" strokeWidth={2} dot={{ fill: '#6c63ff' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="font-heading text-lg font-semibold">Solved Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" stroke="none">
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a1a24', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 8, color: '#f0f0ff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 text-xs">
            {pieData.map(p => (
              <span key={p.name} className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                {p.name}: {p.value}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass mt-6 rounded-2xl p-6"
      >
        <h2 className="font-heading text-lg font-semibold">Badges</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {u.badges.map(badge => (
            <div key={badge} className="neon-border rounded-lg bg-surface-elevated px-4 py-2 text-sm font-medium">
              🏅 {badge}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
