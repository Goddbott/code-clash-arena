import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — AlgoClash" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-elevated w-full max-w-md rounded-2xl p-8"
      >
        <h1 className="text-center font-heading text-2xl font-bold">Join <span className="text-gradient-primary">AlgoClash</span></h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Start your competitive coding journey</p>

        <div className="mt-6 space-y-4">
          {[
            { label: 'Username', key: 'username', type: 'text', placeholder: 'clash_master' },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'you@example.com' },
            { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
            { label: 'Confirm Password', key: 'confirm', type: 'password', placeholder: '••••••••' },
          ].map(field => (
            <div key={field.key}>
              <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
              <input
                type={field.type}
                value={form[field.key as keyof typeof form]}
                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <button className="glow-primary w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110">
            Create Account
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account? <a href="/login" className="text-primary hover:underline">Sign in</a>
        </p>
      </motion.div>
    </div>
  );
}
