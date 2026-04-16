import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — AlgoClash" }] }),
  component: AdminPage,
});

const sections = ["Users", "Problems", "Contests", "Announcements", "MCQ Bank", "Analytics"];

const mockUsers = [
  { id: 1, username: "tourist", email: "tourist@cf.com", role: "user", rating: 3842, status: "active" },
  { id: 2, username: "clash_master", email: "clash@algo.dev", role: "admin", rating: 2547, status: "active" },
  { id: 3, username: "new_coder", email: "newbie@mail.com", role: "user", rating: 800, status: "banned" },
];

function AdminPage() {
  const [tab, setTab] = useState("Users");

  return (
    <div className="flex min-h-screen pt-16">
      {/* Sidebar */}
      <div className="hidden w-56 border-r border-border bg-surface md:block">
        <div className="p-4">
          <h2 className="font-heading text-sm font-bold text-muted-foreground uppercase tracking-wider">Admin Panel</h2>
        </div>
        <nav className="space-y-1 px-2">
          {sections.map(s => (
            <button
              key={s}
              onClick={() => setTab(s)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                tab === s ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-surface-elevated hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <motion.h1
          key={tab}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-heading text-2xl font-bold"
        >
          {tab}
        </motion.h1>

        {tab === "Users" && (
          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Username</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Rating</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(u => (
                  <tr key={u.id} className="border-b border-border/50 hover:bg-surface-elevated transition-colors">
                    <td className="px-4 py-3 font-mono text-muted-foreground">{u.id}</td>
                    <td className="px-4 py-3 font-medium">{u.username}</td>
                    <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        u.role === 'admin' ? 'bg-primary/15 text-primary' : 'bg-surface-elevated text-muted-foreground'
                      }`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-3 font-mono">{u.rating}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        u.status === 'active' ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive'
                      }`}>{u.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-primary hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "Analytics" && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "DAU", value: "5,247", change: "+12%" },
              { label: "MAU", value: "52,847", change: "+8%" },
              { label: "Submissions Today", value: "18,432", change: "+15%" },
              { label: "Active Contests", value: "3", change: "0%" },
            ].map(stat => (
              <div key={stat.label} className="glass rounded-xl p-5">
                <div className="text-xs text-muted-foreground">{stat.label}</div>
                <div className="mt-1 font-heading text-2xl font-bold">{stat.value}</div>
                <div className="mt-1 text-xs text-success">{stat.change}</div>
              </div>
            ))}
          </div>
        )}

        {!["Users", "Analytics"].includes(tab) && (
          <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-12 text-center">
            <span className="text-4xl">🚧</span>
            <p className="mt-3 text-sm text-muted-foreground">
              {tab} management interface — connect backend to enable full CRUD
            </p>
            <button className="mt-4 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
              Add {tab.slice(0, -1) || tab}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
