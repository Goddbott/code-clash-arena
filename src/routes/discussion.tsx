import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, ListFilter, Users, Calendar, Plus, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { mockDiscussions, allTags } from "../lib/mock-data";
import { StarsBackground } from "../components/StarsBackground";

export const Route = createFileRoute("/discussion")({
  head: () => ({
    meta: [
      { title: "Discussions — AlgoClash" },
      { name: "description", content: "Join the community discussion." },
      { property: "og:title", content: "Discussions — AlgoClash" },
      { property: "og:description", content: "Join the community discussion." },
    ],
  }),
  component: DiscussionPage,
});



function DiscussionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All Tags");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [selectedUser, setSelectedUser] = useState("All Users");
  
  // New Discussion Form State
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");

  const authors = useMemo(() => {
    const uniqueAuthors = Array.from(new Set(mockDiscussions.map(d => d.author)));
    return ["All Users", ...uniqueAuthors];
  }, []);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag("All Tags");
    setSortBy("Most Recent");
    setSelectedUser("All Users");
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) {
      toast.error("Please fill in the title and content.");
      return;
    }

    // Mock submission
    toast.success("Discussion created successfully! (Mock)");
    setIsCreating(false);
    setNewTitle("");
    setNewContent("");
    setNewTags("");
  };

  const filtered = useMemo(() => {
    let result = [...mockDiscussions];

    // Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(d => 
        d.title.toLowerCase().includes(query) || 
        d.preview.toLowerCase().includes(query)
      );
    }

    // Tag Filter
    if (selectedTag !== "All Tags") {
      result = result.filter(d => d.category === selectedTag); // Categories are used as tags here
    }

    // User Filter
    if (selectedUser !== "All Users") {
      result = result.filter(d => d.author === selectedUser);
    }

    // Sorting
    if (sortBy === "Most Recent") {
      // Mock data doesn't have real dates, but we can assume order
      // result.sort((a, b) => ...) 
    } else if (sortBy === "Most Upvoted") {
      result.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortBy === "Most Replies") {
      result.sort((a, b) => b.commentCount - a.commentCount);
    }

    return result;
  }, [searchQuery, selectedTag, selectedUser, sortBy]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white pb-24 pt-24 font-sans">
      <StarsBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col items-start gap-2"
          >
            <div className="brutal-border bg-primary px-4 py-1 text-sm font-black text-black uppercase -rotate-2 brutal-shadow-sm inline-block">
              Forums
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter mt-2">
              <span className="glitch-text text-white" data-text="COMMUNITY">COMMUNITY</span>
              <span className="text-primary block md:inline"> DISCUSSIONS</span>
            </h1>
          </motion.div>

          <button 
            onClick={() => setIsCreating(true)}
            className="brutal-border bg-cyan text-black px-6 py-3 font-black uppercase tracking-wider brutal-shadow-sm hover:translate-y-1 hover:-translate-x-1 hover:bg-white transition-all whitespace-nowrap flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Discussion
          </button>
        </div>

        {/* New Discussion Form Inline */}
        <AnimatePresence>
          {isCreating && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: "auto", opacity: 1, marginBottom: 40 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="w-full brutal-border bg-black p-8 brutal-shadow-primary mb-1">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary brutal-border text-black">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-heading font-black uppercase italic tracking-tight">
                      Create New <span className="text-primary">Discussion</span>
                    </h2>
                  </div>
                  <button 
                    onClick={() => setIsCreating(false)}
                    className="p-2 hover:bg-white/10 transition-colors"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>

                <form onSubmit={handleCreateSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-black uppercase text-muted-foreground tracking-widest pl-1">
                        Discussion Title
                      </label>
                      <input 
                        autoFocus
                        type="text"
                        placeholder="Enter a catchy title..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full brutal-border bg-black/50 p-4 font-mono text-lg uppercase outline-none focus:bg-white focus:text-black transition-all"
                        required
                      />
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-black uppercase text-muted-foreground tracking-widest pl-1">
                        Tags (comma separated)
                      </label>
                      <div className="relative">
                        <ListFilter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input 
                          type="text"
                          placeholder="e.g. Algorithms, DP, Google"
                          value={newTags}
                          onChange={(e) => setNewTags(e.target.value)}
                          className="w-full brutal-border bg-black/50 py-4 pl-12 pr-4 font-mono text-xs uppercase outline-none focus:bg-white focus:text-black transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-black uppercase text-muted-foreground tracking-widest pl-1">
                      Discussion Content
                    </label>
                    <textarea 
                      placeholder="What's on your mind?"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={6}
                      className="w-full brutal-border bg-black/50 p-4 font-mono text-sm uppercase outline-none focus:bg-white focus:text-black transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col md:flex-row gap-4 pt-4 uppercase font-black tracking-widest">
                    <button 
                      type="submit"
                      className="flex-1 brutal-border bg-primary text-black py-4 hover:translate-y-1 hover:-translate-x-1 hover:bg-white transition-all brutal-shadow-sm flex items-center justify-center gap-3"
                    >
                      <Send className="w-5 h-5" />
                      Submit Discussion
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="flex-1 brutal-border bg-red-500 text-black py-4 hover:translate-y-1 hover:-translate-x-1 hover:bg-white transition-all brutal-shadow-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Search */}
          <div className="relative group lg:col-span-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full brutal-border bg-black py-3 pl-12 pr-4 font-mono text-sm uppercase outline-none focus:bg-white focus:text-black transition-all"
            />
          </div>

          {/* Tag Filter */}
          <div className="relative">
            <ListFilter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select 
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full brutal-border bg-black py-3 pl-10 pr-8 font-mono text-xs uppercase outline-none appearance-none cursor-pointer focus:bg-primary focus:text-black transition-all"
            >
              <option>All Tags</option>
              {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full brutal-border bg-black py-3 pl-10 pr-8 font-mono text-xs uppercase outline-none appearance-none cursor-pointer focus:bg-primary focus:text-black transition-all"
            >
              <option>Most Recent</option>
              <option>Most Upvoted</option>
              <option>Most Replies</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* User Filter */}
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select 
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full brutal-border bg-black py-3 pl-10 pr-8 font-mono text-xs uppercase outline-none appearance-none cursor-pointer focus:bg-primary focus:text-black transition-all"
            >
              {authors.map(user => <option key={user} value={user}>{user}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Clear Filters & Current selection info */}
        <div className="flex flex-wrap items-center justify-end gap-4 mb-10">
          {(searchQuery !== "" || selectedTag !== "All Tags" || sortBy !== "Most Recent" || selectedUser !== "All Users") && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={clearFilters}
              className="flex items-center gap-2 bg-red-500 text-black brutal-border px-4 py-2 text-xs font-black uppercase hover:bg-white transition-colors"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </motion.button>
          )}
        </div>

        {/* Discussions List */}
        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="brutal-border bg-black p-8 text-center text-muted-foreground font-mono uppercase text-sm">
              No discussions found in this sector.
            </div>
          ) : (
            filtered.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="brutal-border bg-black brutal-shadow-white p-6 group transition-all hover:-translate-y-1 hover:translate-x-1 cursor-pointer flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
              >
                <div className="flex-1">
                  <h3 className="font-heading text-xl md:text-2xl font-black uppercase group-hover:text-primary transition-colors">{d.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground font-mono line-clamp-2">{d.preview}</p>
                  
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono uppercase text-muted-foreground">
                    <span className="border border-white/20 bg-white/5 px-2 py-1 flex items-center gap-2 text-white">
                      <span className="flex items-center justify-center bg-cyan text-black h-4 w-4 brutal-border font-black">
                        {d.author[0].toUpperCase()}
                      </span>
                      {d.author}
                    </span>
                    <span className="border border-white/20 bg-white/5 px-2 py-1 text-primary shadow-[2px_2px_0px_#fff]">
                      {d.category}
                    </span>
                    <span className="border border-white/20 bg-white/5 px-2 py-1">
                      {d.timeAgo}
                    </span>
                  </div>
                </div>

                <div className="flex md:flex-col items-center justify-center gap-4 md:gap-2 shrink-0 border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-6 w-full md:w-auto h-full">
                  <div className="flex flex-col items-center bg-white/5 border border-white/20 px-4 py-2 min-w-[80px]">
                    <span className="text-primary font-black text-xl">▲ {d.upvotes}</span>
                    <span className="text-[10px] uppercase text-muted-foreground mt-1">Upvotes</span>
                  </div>
                  <div className="flex flex-col items-center bg-white/5 border border-white/20 px-4 py-2 min-w-[80px]">
                    <span className="text-white font-black text-xl">{d.commentCount}</span>
                    <span className="text-[10px] uppercase text-muted-foreground mt-1">Replies</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
