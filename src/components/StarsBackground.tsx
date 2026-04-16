export function StarsBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center bg-background">
      <div 
        className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px] opacity-20"
      ></div>
      {/* Subtle fade at the bottom/top if desired */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
    </div>
  );
}
