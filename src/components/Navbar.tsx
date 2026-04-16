import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Coins } from 'lucide-react';
import { mockUser } from '../lib/mock-data';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/problems', label: 'Problems' },
  { to: '/contest', label: 'Contests' },
  { to: '/game', label: 'Game' },
  { to: '/discussion', label: 'Discuss' },
  { to: '/galaxy', label: 'Leaderboard' },
  { to: '/chat', label: 'Chat' },
] as const;

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-white bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center brutal-border bg-primary font-heading text-sm font-bold text-black">
            A
          </div>
          <span className="font-heading text-lg font-bold text-primary">
            AlgoClash
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => {
            const active = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/20 brutal-border"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-4 border-r border-white/20 pr-4">
            <div className="flex items-center gap-1.5 hover:text-orange-500 transition-colors cursor-help" title="Current Streak">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500/20" />
              <span className="font-mono font-bold text-sm tracking-tighter">{mockUser.streak}</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors cursor-help" title="AlgoCoins">
              <Coins className="w-4 h-4 text-yellow-400 fill-yellow-400/20" />
              <span className="font-mono font-bold text-sm tracking-tighter">{mockUser.coins.toLocaleString()}</span>
            </div>
          </div>
          <Link
            to="/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="brutal-border brutal-shadow-primary brutal-hover bg-primary px-5 py-2 text-sm font-black uppercase text-black"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-6 bg-foreground transition-transform ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-foreground transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-foreground transition-transform ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <div className="flex items-center justify-around brutal-border bg-white/5 py-3 mb-2">
                  <div className="flex flex-col items-center gap-1">
                    <Flame className="w-6 h-6 text-orange-500" />
                    <span className="font-mono font-black text-xs text-orange-500 uppercase">Streak</span>
                    <span className="font-heading font-bold">{mockUser.streak}</span>
                  </div>
                  <div className="h-full w-px bg-white/20"></div>
                  <div className="flex flex-col items-center gap-1">
                    <Coins className="w-6 h-6 text-yellow-400" />
                    <span className="font-mono font-black text-xs text-yellow-400 uppercase">Coins</span>
                    <span className="font-heading font-bold">{mockUser.coins.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to="/login" className="flex-1 brutal-border px-4 py-2 text-center text-sm font-bold uppercase transition-transform active:translate-y-1">Login</Link>
                  <Link to="/register" className="flex-1 brutal-border brutal-shadow-primary bg-primary px-4 py-2 text-center text-sm font-black uppercase text-black brutal-hover">Sign Up</Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
