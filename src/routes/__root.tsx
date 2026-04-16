import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Navbar } from "../components/Navbar";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AlgoClash — Clash. Code. Conquer." },
      { name: "description", content: "The ultimate competitive coding platform. Solve problems, compete in contests, battle in 1v1 duels, and climb the leaderboard." },
      { property: "og:title", content: "AlgoClash — Clash. Code. Conquer." },
      { property: "og:description", content: "The ultimate competitive coding platform." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-primary font-heading text-7xl font-bold">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">Page not found</p>
        <a href="/" className="mt-6 inline-block rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">Go Home</a>
      </div>
    </div>
  );
}

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground scrollbar-thin antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 w-full overflow-hidden p-6 md:p-10 transition-all duration-300">
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--color-background)',
              border: '1px solid rgba(255,255,255,0.4)',
              color: 'var(--color-foreground)',
              boxShadow: '6px 6px 14px 0 rgba(0,0,0,0.06), -6px -6px 14px 0 rgba(255,255,255,0.7)',
            },
          }}
        />
        <Outlet />
      </main>
    </div>
  );
}
