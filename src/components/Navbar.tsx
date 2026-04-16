import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Overview', icon: '🏠' },
  { to: '/problems', label: 'Problems', icon: '🧩' },
  { to: '/contest', label: 'Contests', icon: '⚔️' },
  { to: '/game', label: 'Game', icon: '🎮' },
  { to: '/discussion', label: 'Discuss', icon: '💬' },
  { to: '/galaxy', label: 'Leaderboard', icon: '🏆' },
] as const;

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex w-64 flex-col bg-background p-6 h-screen sticky top-0 neumorphic m-4 rounded-[30px]">
        <Link to="/" className="flex items-center gap-3 mb-10 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl pastel-mint neumorphic text-2xl">
            🌱
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            AlgoDash
          </span>
        </Link>

        <nav className="flex-1 flex flex-col gap-3">
          {navLinks.map(link => {
            const active = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 rounded-[20px] px-5 py-3 text-sm font-semibold transition-all ${
                  active 
                    ? 'neumorphic-inset text-primary' 
                    : 'text-muted-foreground hover:neumorphic neumorphic-hover'
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <Link
            to="/login"
            className="neumorphic-hover rounded-[20px] px-5 py-3 text-center text-sm font-semibold text-foreground transition-all"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="neumorphic rounded-[20px] pastel-blue neumorphic-hover px-5 py-3 text-center text-sm font-bold text-foreground transition-all neumorphic-active"
          >
            Sign Up Free
          </Link>
        </div>
      </aside>

      {/* Mobile Navbar Alternative */}
      <div className="md:hidden fixed top-0 w-full z-50 p-4">
        <div className="neumorphic rounded-[25px] p-4 flex justify-between items-center bg-background">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl pastel-mint neumorphic">
               🌱
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="neumorphic p-2 rounded-xl text-foreground neumorphic-active"
          >
            🍔
          </button>
        </div>
        {mobileOpen && (
          <div className="absolute top-20 left-4 right-4 neumorphic rounded-[25px] p-4 flex flex-col gap-2 bg-background">
             {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground neumorphic-active"
                >
                  {link.label}
                </Link>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
