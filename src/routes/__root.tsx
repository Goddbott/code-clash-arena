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
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="scrollbar-thin">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Navbar />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'oklch(0.17 0.025 270)',
            border: '1px solid oklch(0.55 0.22 280 / 20%)',
            color: 'oklch(0.95 0.01 280)',
          },
        }}
      />
      <Outlet />
    </>
  );
}
