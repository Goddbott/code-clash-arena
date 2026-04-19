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
    <div className="flex h-screen max-h-screen pt-16 bg-black text-white font-sans overflow-hidden">
      
      {/* Rooms Sidebar */}
      <div className="hidden w-72 md:w-80 flex-shrink-0 border-r border-white/20 bg-black md:flex flex-col relative z-10">
        <div className="flex items-center justify-between border-b-[3px] border-white/20 p-5 bg-white/5 shrink-0">
          <h2 className="font-heading text-2xl font-black uppercase tracking-wider">CHANNELS</h2>
          <button className="brutal-border bg-cyan text-black px-3 py-1 font-black uppercase text-xs hover:bg-white transition-colors brutal-shadow-sm">
            + NEW
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto w-full">
          {rooms.map(room => {
            const isSelected = selected === room.id;
            return (
              <button
                key={room.id}
                onClick={() => setSelected(room.id)}
                className={`flex w-full items-stretch text-left transition-colors border-b border-white/10 group ${
                  isSelected ? 'bg-primary/20 hover:bg-primary/30' : 'hover:bg-white/5'
                }`}
              >
                {/* Active Indicator Strip */}
                <div className={`w-2 shrink-0 transition-colors ${isSelected ? 'bg-primary' : 'bg-transparent group-hover:bg-white/30'}`}></div>

                <div className="p-4 flex-1 overflow-hidden flex gap-3 items-center">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center brutal-border text-lg font-black ${
                    isSelected ? 'bg-primary text-black' : 'bg-black text-white border-white/30'
                  }`}>
                    #
                  </div>
                  <div className="flex-1 overflow-hidden flex flex-col gap-1 justify-center">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-black uppercase tracking-wider truncate mr-2 ${isSelected ? 'text-primary' : 'text-white'}`}>{room.name}</span>
                      <span className="text-[10px] font-mono text-muted-foreground shrink-0">{room.time}</span>
                    </div>
                    <p className="truncate text-xs font-mono text-white/50">{room.lastMsg}</p>
                  </div>
                  {room.unread > 0 && (
                    <span className="shrink-0 flex h-6 min-w-6 items-center justify-center brutal-border bg-cyan text-xs font-black text-black">
                      {room.unread}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Chat Area Terminal */}
      <div className="flex flex-1 flex-col bg-black relative min-w-0">
        {/* Chat Area Header */}
        <div className="flex items-center gap-4 border-b-[3px] border-white/20 bg-white/5 px-6 py-4 shrink-0 shadow-sm z-10 w-full justify-between">
          <div className="flex items-center gap-4 min-w-0">
             <span className="font-heading text-xl md:text-2xl font-black uppercase text-primary tracking-widest truncate">
               {rooms.find(r => r.id === selected)?.name}
             </span>
          </div>

          <div className="flex items-center gap-2 border border-white/20 bg-black px-3 py-1 shrink-0">
             <span className="h-2 w-2 rounded-full bg-success animate-pulse shrink-0" />
             <span className="font-mono text-xs uppercase text-success font-bold tracking-widest whitespace-nowrap hidden sm:inline">
                {rooms.find(r => r.id === selected)?.online} Active
             </span>
             <span className="font-mono text-xs uppercase text-success font-bold tracking-widest whitespace-nowrap sm:hidden">
                {rooms.find(r => r.id === selected)?.online}
             </span>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-black relative w-full scroll-smooth">
          {/* Faded Background Pattern (Terminal Grid Vibe) */}
          <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>

          {mockMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex w-full relative z-10 ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] md:max-w-[70%] group flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                {/* Author Badge */}
                {!msg.isMe && (
                  <div className="mb-1 text-[10px] font-black uppercase text-cyan font-mono tracking-widest bg-cyan/10 px-2 py-0.5 border border-cyan/20 inline-block">
                     {msg.user}
                  </div>
                )}
                {msg.isMe && (
                  <div className="mb-1 text-[10px] font-black uppercase text-primary font-mono tracking-widest bg-primary/10 px-2 py-0.5 border border-primary/20 inline-block">
                     YOU
                  </div>
                )}

                {/* Message Terminal Container */}
                <div className={`px-4 md:px-5 py-3 ${
                  msg.isMe 
                    ? 'brutal-border bg-primary text-black brutal-shadow-sm' 
                    : 'brutal-border bg-black text-white hover:bg-white/5 transition-colors border-white/40'
                }`}>
                  <p className="text-sm font-mono whitespace-pre-wrap leading-relaxed">
                     {msg.content}
                  </p>
                </div>
                
                {/* Timestamp */}
                <div className={`mt-1 font-mono text-[10px] uppercase ${msg.isMe ? 'text-white/40' : 'text-white/30'}`}>
                  {msg.time}
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="h-4 w-full"></div>
        </div>

        {/* Input Block */}
        <div className="border-t-[3px] border-white/20 bg-white/5 p-4 md:p-6 shrink-0 relative z-20 w-full">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-full">
            <div className="flex-1 relative flex text-sm min-w-0">
               {/* Terminal Prompt Prefix */}
               <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center px-4 font-mono font-black text-primary pointer-events-none select-none z-10">
                 {'>_'}
               </div>
               <input
                 type="text"
                 value={message}
                 onChange={e => setMessage(e.target.value)}
                 placeholder="Type your message..."
                 className="w-full brutal-border bg-black text-white px-4 py-3 md:py-4 pl-12 font-mono text-sm placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors focus:brutal-shadow-sm"
               />
            </div>
            <button className="brutal-border bg-white text-black px-8 py-3 md:py-4 font-black uppercase tracking-widest hover:bg-primary transition-colors brutal-shadow-sm shrink-0 w-full sm:w-auto h-[46px] md:h-[56px] flex items-center justify-center">
              Send <span className="ml-2 hidden md:inline">▲</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
