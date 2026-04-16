import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/redeem")({
  head: () => ({
    meta: [
      { title: "Redeem — AlgoClash" },
      { name: "description", content: "Spend your coins on rewards." },
    ],
  }),
  component: RedeemPage,
});

const items = [
  { id: 1, name: "Gold Avatar Frame", cost: 500, icon: "🖼️", desc: "Shine bright with a golden frame" },
  { id: 2, name: "Dark Hacker Theme", cost: 300, icon: "🎨", desc: "Matrix-inspired code editor theme" },
  { id: 3, name: "Contest VIP Pass", cost: 1000, icon: "🎟️", desc: "Free entry to next Special contest" },
  { id: 4, name: "AlgoClash Stickers", cost: 2000, icon: "📦", desc: "Physical sticker pack shipped to you" },
  { id: 5, name: "Custom Badge", cost: 800, icon: "🏅", desc: "Create your own profile badge" },
  { id: 6, name: "Exclusive Emoji Pack", cost: 200, icon: "😎", desc: "Use premium emojis in chat" },
];

function RedeemPage() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 pt-24 pb-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold">Redeem Store</h1>
        <div className="mt-2 flex items-center gap-2 text-lg">
          <span>💰</span>
          <span className="font-heading font-bold text-gradient-primary">3,420 coins</span>
        </div>
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass neon-border hover-lift rounded-xl p-6"
          >
            <div className="text-4xl">{item.icon}</div>
            <h3 className="mt-3 font-heading text-base font-semibold">{item.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-heading text-sm font-bold text-warning">💰 {item.cost}</span>
              <button className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
                item.cost <= 3420
                  ? 'bg-primary text-primary-foreground hover:brightness-110'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}>
                Redeem
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
