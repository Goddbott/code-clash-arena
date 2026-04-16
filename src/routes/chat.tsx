import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat — AlgoClash" },
      { name: "description", content: "Real-time chat rooms." },
    ],
  }),
  component: ChatPage,
});

const rooms = [
  { id: 1, name: "General", lastMsg: "Anyone up for a 1v1?", time: "2m", unread: 3, online: 42 },
  { id: 2, name: "Algorithms", lastMsg: "BFS vs DFS for this problem?", time: "15m", unread: 0, online: 18 },
  { id: 3, name: "Contest #41", lastMsg: "Problem C was tricky!", time: "1h", unread: 12, online: 8 },
  { id: 4, name: "Interview Prep", lastMsg: "Mock interview tips?", time: "3h", unread: 0, online: 5 },
];

const mockMessages = [
  { id: 1, user: "algo_guru", content: "Has anyone solved the POTD yet?", time: "2:30 PM", isMe: false },
  { id: 2, user: "clash_master", content: "Yeah, used a two-pointer approach. Runs in O(n)", time: "2:31 PM", isMe: true },
  { id: 3, user: "code_ninja", content: "I tried DP but got TLE. What was the trick?", time: "2:33 PM", isMe: false },
  { id: 4, user: "clash_master", content: "The key insight is that you don't need to track all states. Just maintain left and right maxes.", time: "2:34 PM", isMe: true },
  { id: 5, user: "algo_guru", content: "Makes sense! Let me try that approach 🔥", time: "2:35 PM", isMe: false },
];

function ChatPage() {
  const [selected, setSelected] = useState(1);
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-screen pt-16">
      {/* Rooms sidebar */}
      <div className="hidden w-72 flex-shrink-0 border-r border-border bg-surface md:block">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-heading text-lg font-bold">Chat</h2>
          <button className="rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20">
            + Room
          </button>
        </div>
        <div className="space-y-1 p-2">
          {rooms.map(room => (
            <button
              key={room.id}
              onClick={() => setSelected(room.id)}
              className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                selected === room.id ? 'bg-primary/10 text-foreground' : 'text-muted-foreground hover:bg-surface-elevated'
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                #
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{room.name}</span>
                  <span className="text-xs text-muted-foreground">{room.time}</span>
                </div>
                <p className="truncate text-xs text-muted-foreground">{room.lastMsg}</p>
              </div>
              {room.unread > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                  {room.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
          <span className="font-heading text-base font-semibold">
            # {rooms.find(r => r.id === selected)?.name}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-success" />
            {rooms.find(r => r.id === selected)?.online} online
          </span>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {mockMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] rounded-xl px-4 py-2.5 ${
                msg.isMe ? 'bg-primary text-primary-foreground' : 'bg-surface-elevated text-foreground'
              }`}>
                {!msg.isMe && (
                  <div className="mb-1 text-xs font-semibold text-cyan">{msg.user}</div>
                )}
                <p className="text-sm">{msg.content}</p>
                <div className={`mt-1 text-right text-[10px] ${msg.isMe ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                  {msg.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-border bg-surface p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary"
            />
            <button className="glow-primary rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
