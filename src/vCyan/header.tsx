import { useState } from "react";
import { Link } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigationItems = [
    {
      label: "Catalog",
      href: "/v-cyan#catalog",
    },
    {
      label: "Submit Game",
      href: "/v-cyan#submit-tool",
    },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/95 text-zinc-50 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/90">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          className="inline-flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          to="/"
          aria-label="Idle Forge home"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/25 to-zinc-900 text-cyan-300 shadow-[0_0_20px_rgba(14,165,233,0.18)]">
            <svg
              aria-hidden="true"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M13.5 2.3c.4 2.7-.5 4.1-2.1 5.6C9.8 9.4 8 11.1 8 14a4 4 0 0 0 8 0c0-1.5-.6-2.8-1.6-4.1-.1 1.5-.7 2.4-1.5 3.1.1-3.8-1.1-7.3-4.4-10.2.1 2.3-.7 3.5-2 4.8C4.8 9.3 4 11.5 4 14a8 8 0 1 0 16 0c0-4.8-2.4-8.8-6.5-11.7Z"
              />
              <path
                fill="#09090B"
                d="M12 13.1c-1 .9-1.4 1.8-1.4 2.7a1.4 1.4 0 1 0 2.8 0c0-.9-.5-1.9-1.4-2.7Z"
              />
            </svg>
          </span>
          <span className="truncate text-sm font-extrabold text-white">
            IDLE FORGE
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navigationItems.map((item) => (
            <a
              className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-400 transition hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
          <a
            className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-400 transition hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
            href="https://discord.com/"
            rel="noreferrer"
            target="_blank"
          >
            Community
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden min-[375px]:inline-flex rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-[10px] font-extrabold text-amber-200">
            v2.0
          </span>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            className="grid size-10 place-items-center rounded-xl border border-zinc-800 text-zinc-300 transition hover:border-cyan-500 hover:bg-zinc-900 focus-visible:outline-2 focus-visible:outline-cyan-400 md:hidden"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        aria-label="Mobile navigation"
        className={`${isMenuOpen ? "block" : "hidden"} border-t border-zinc-800 bg-zinc-950 px-4 py-3 md:hidden`}
        id="mobile-navigation"
      >
        {[
          ...navigationItems,
          { label: "Community", href: "https://discord.com/" },
        ].map((item) => (
          <a
            className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
            href={item.href}
            key={item.label}
            rel={item.label === "Community" ? "noreferrer" : undefined}
            target={item.label === "Community" ? "_blank" : undefined}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
