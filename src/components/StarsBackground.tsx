import { motion } from "framer-motion";

export function StarsBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6], x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] h-[700px] w-[700px] rounded-full bg-blue-300/30 blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5], x: [0, -80, 0], y: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] -right-[15%] h-[800px] w-[800px] rounded-full bg-purple-300/30 blur-[140px]"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6], y: [0, -100, 0], x: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[20%] h-[600px] w-[600px] rounded-full bg-teal-300/30 blur-[120px]"
      />
    </div>
  );
}
