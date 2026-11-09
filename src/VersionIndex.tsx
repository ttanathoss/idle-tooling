import { Link } from "react-router";

const versions = [
  {
    number: "01",
    name: "V-Violet",
    subtitle: "Violet gaming hub",
    description:
      "The original Idle Forge catalog: featured games, popular mods, and a bold violet arcade feel.",
    href: "/v-violet",
    preview: "from-violet-500/25 via-[#161322] to-[#0B0E17]",
    accent: "bg-violet-400",
    badge: "VIOLET / MIDNIGHT",
  },
  {
    number: "02",
    name: "V-Cyan",
    subtitle: "Cyan & amber loadout",
    description:
      "A charcoal catalog with cyan controls, warm amber highlights, and a dedicated Cookie Clicker tuner.",
    href: "/v-cyan",
    preview: "from-cyan-500/25 via-[#11191C] to-[#09090B]",
    accent: "bg-cyan-400",
    badge: "ZINC / CYAN / AMBER",
  },
  {
    number: "03",
    name: "V-F",
    subtitle: "Idle Tune save studio",
    description:
      "A dark, cyan-lit game library with save tuning presets and a dedicated editor.",
    href: "/v-f",
    preview: "from-cyan-400/25 via-[#10171A] to-[#09090B]",
    accent: "bg-amber-300",
    badge: "FIGMA",
  },
  {
    number: "043",
    name: "V-F",
    subtitle: "9 color variants by figma",
    description: "Play-around with figma make - one design, 9 color variants.",
    href: "/v-f2",
    preview: "from-fuchsia-400/25 via-[#10171A] to-lime-400/25",
    accent: "bg-lime-300",
    badge: "FIGMA 2",
  },
];

const VersionIndex = () => (
  <main className="min-h-screen bg-zinc-950 text-zinc-50">
    <header className="border-b border-zinc-800 bg-zinc-950/90">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          aria-label="Idle Forge design versions"
          className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          to="/"
        >
          <span className="grid size-9 place-items-center rounded-xl border border-cyan-400/20 bg-zinc-900 text-cyan-300">
            <svg
              aria-hidden="true"
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2.5c.3 2.2-.5 3.6-1.8 4.9C8.6 9 7 10.5 7 13.2a5 5 0 0 0 10 0c0-1.3-.5-2.5-1.4-3.7-.1 1.4-.7 2.2-1.5 2.9.1-3.6-1.1-6.7-4.1-9.2Z"
                fill="currentColor"
              />
              <path
                d="m18.7 3.2.6 1.2 1.3.2-.9.9.2 1.3-1.2-.6-1.1.6.2-1.3-.9-.9 1.3-.2.5-1.2Z"
                fill="#F59E0B"
              />
            </svg>
          </span>
          <span className="text-sm font-extrabold tracking-wide text-white">
            IDLE FORGE
          </span>
        </Link>
        <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[10px] font-bold text-zinc-400">
          DESIGN SELECTOR
        </span>
      </div>
    </header>

    <div className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.08),transparent_38%)]">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
        <section aria-labelledby="versions-title" className="max-w-3xl">
          <p className="mb-3 text-xs font-extrabold text-cyan-300">
            IDLE FORGE / DESIGN VERSIONS
          </p>
          <h1
            className="text-4xl font-extrabold leading-tight text-white sm:text-5xl"
            id="versions-title"
          >
            Pick your game hub.
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">
            Choose a visual version of Idle Forge to browse the game catalog and
            save tools.
          </p>
        </section>

        <section
          aria-label="Available design versions"
          className="mt-10 grid gap-5 lg:grid-cols-2"
        >
          {versions.map((version) => (
            <Link
              className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-200 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_16px_44px_-24px_rgba(14,165,233,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              key={version.href}
              to={version.href}
            >
              <div
                aria-hidden="true"
                className={`relative isolate aspect-[16/7] overflow-hidden bg-gradient-to-br ${version.preview}`}
              >
                <div className="absolute inset-x-0 top-0 h-9 border-b border-white/10 bg-black/20" />
                <div className="absolute left-4 top-3 flex items-center gap-2 sm:left-6">
                  <span className={`size-2 rounded-full ${version.accent}`} />
                  <span className="text-[9px] font-extrabold tracking-wider text-white/75">
                    IDLE FORGE
                  </span>
                </div>
                <div className="absolute right-4 top-3 rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[8px] font-bold text-white/55 sm:right-6">
                  {version.badge}
                </div>
                <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 sm:inset-x-6 sm:bottom-6 sm:gap-3">
                  {[0, 1, 2].map((previewCard) => (
                    <div
                      className="overflow-hidden rounded-lg border border-white/10 bg-black/25 p-2 backdrop-blur-sm sm:rounded-xl sm:p-3"
                      key={previewCard}
                    >
                      <div className="mb-2 h-1.5 w-1/2 rounded-full bg-white/60" />
                      <div
                        className={`h-8 rounded-md bg-gradient-to-br ${version.preview} sm:h-12`}
                      />
                      <div className="mt-2 h-1 w-2/3 rounded-full bg-white/25" />
                    </div>
                  ))}
                </div>
                <span className="absolute bottom-5 right-5 text-5xl font-black text-white/10 sm:bottom-7 sm:right-7 sm:text-7xl">
                  {version.number}
                </span>
              </div>

              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
                <div>
                  <p className="mb-2 text-[10px] font-extrabold text-zinc-500">
                    VERSION {version.number}
                  </p>
                  <h2 className="text-2xl font-extrabold text-white">
                    {version.name}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-cyan-300">
                    {version.subtitle}
                  </p>
                  <p className="mb-0 mt-3 max-w-lg text-sm leading-6 text-zinc-400">
                    {version.description}
                  </p>
                </div>
                <span className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-bold text-white transition group-hover:bg-cyan-500">
                  Open version <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </section>

        <footer className="mt-12 border-t border-zinc-800 pt-5 text-xs text-zinc-500">
          Select a version to enter its catalog. Your saved game data is not
          changed by browsing.
        </footer>
      </div>
    </div>
  </main>
);

export default VersionIndex;
