import { useState } from "react";
import { Link } from "react-router";
import Header from "./header.tsx";
import {
  catalogCopy,
  categories,
  getVisibleGames,
  type Category,
  type SortMode,
  allCategory,
} from "../catalogData.ts";

const currentYear = new Date().getFullYear();

const VCyan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    Category | typeof allCategory
  >(allCategory);
  const [sortMode, setSortMode] = useState<SortMode>("featured");
  const sortedGames = getVisibleGames(searchQuery, activeCategory, sortMode);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-950 text-zinc-50 bg-[radial-gradient(ellipse_at_70%_0%,rgba(14,165,233,0.12),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8">
          <aside
            id="disclaimer"
            className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-amber-300 sm:items-center sm:px-5"
            role="note"
          >
            <svg
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-amber-300 sm:mt-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0 3h.008v.008H12v-.008ZM10.29 3.86 1.82 18.5A1.7 1.7 0 0 0 3.29 21h17.42a1.7 1.7 0 0 0 1.47-2.5L13.71 3.86a1.98 1.98 0 0 0-3.42 0Z"
              />
            </svg>
            <p className="m-0">
              <strong className="font-semibold text-amber-200">
                🎮 {catalogCopy.fairPlayTitle}
              </strong>{" "}
              {catalogCopy.fairPlayMessage}
            </p>
          </aside>

          <section
            className="pb-10 pt-14 sm:pb-14 sm:pt-20"
            aria-labelledby="page-title"
            id="catalog"
          >
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <p className="m-0 text-xs font-bold text-cyan-300">
                {catalogCopy.heroEyebrow}
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <h1
                  id="page-title"
                  className="max-w-4xl text-4xl font-extrabold leading-tight text-zinc-50 sm:text-5xl"
                >
                  {catalogCopy.heroTitle}
                  <br />
                  <span className="text-cyan-400">
                    {catalogCopy.heroSubtitle}
                  </span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                  {catalogCopy.heroDescription}
                </p>
              </div>
            </div>
          </section>

          <section
            aria-label="Search and filter games"
            className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-2xl shadow-black/20 sm:p-5"
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <label className="relative block w-full xl:max-w-xs">
                <span className="sr-only">{catalogCopy.searchLabel}</span>
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="m16.5 16.5 4 4" />
                </svg>
                <input
                  className="h-11 w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.currentTarget.value)
                  }
                  placeholder={catalogCopy.searchPlaceholder}
                />
                {searchQuery && (
                  <button
                    className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearchQuery("")}
                  >
                    <span aria-hidden="true" className="text-lg leading-none">
                      ×
                    </span>
                  </button>
                )}
              </label>

              <div
                aria-label={catalogCopy.categoryFilterLabel}
                className="flex flex-wrap gap-2"
                role="group"
              >
                <button
                  aria-pressed={activeCategory === allCategory}
                  className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${activeCategory === allCategory ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-200" : "border-zinc-700 bg-zinc-950 text-zinc-400 hover:border-cyan-500/50 hover:text-zinc-100"}`}
                  type="button"
                  onClick={() => setActiveCategory(allCategory)}
                >
                  {catalogCopy.allCategories}
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    aria-pressed={activeCategory === category}
                    className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${activeCategory === category ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-200" : "border-zinc-700 bg-zinc-950 text-zinc-400 hover:border-cyan-500/50 hover:text-zinc-100"}`}
                    onClick={() => setActiveCategory(category)}
                    type="button"
                  >
                    {category}
                  </button>
                ))}
              </div>

              <label className="relative block w-full shrink-0 xl:w-52">
                <span className="sr-only">{catalogCopy.sortLabel}</span>
                <select
                  aria-label={catalogCopy.sortLabel}
                  className="h-11 w-full appearance-none rounded-xl border border-zinc-700 bg-zinc-950 px-3 pr-9 text-sm font-medium text-zinc-200 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  value={sortMode}
                  onChange={(event) =>
                    setSortMode(event.currentTarget.value as SortMode)
                  }
                >
                  <option value="featured">{catalogCopy.sortFeatured}</option>
                  <option value="available">{catalogCopy.sortAvailable}</option>
                  <option value="alphabetical">
                    {catalogCopy.sortAlphabetical}
                  </option>
                </select>
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m7 10 5 5 5-5"
                  />
                </svg>
              </label>
            </div>
          </section>

          <section
            id="games"
            aria-labelledby="games-heading"
            className="mt-10 scroll-mt-24"
          >
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="mb-1 text-[10px] font-bold text-cyan-300">
                  {catalogCopy.gamesEyebrow}
                </p>
                <h2
                  id="games-heading"
                  className="text-2xl font-extrabold text-zinc-50 sm:text-3xl"
                >
                  {catalogCopy.gamesTitle}
                </h2>
              </div>
              <p
                aria-live="polite"
                className="m-0 text-sm font-semibold text-zinc-500"
              >
                {`${sortedGames.length} ${sortedGames.length === 1 ? "game" : "games"}`}
              </p>
            </div>

            {sortedGames.length ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {sortedGames.map((game) => (
                  <article
                    className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-200 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_14px_38px_-20px_rgba(14,165,233,0.55)]"
                    key={game.title}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-10 top-0 z-10 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0 shadow-[0_0_14px_2px_rgba(14,165,233,0.65)] transition group-hover:opacity-100"
                    />
                    <div
                      className={`relative h-44 overflow-hidden bg-gradient-to-br ${game.coverCyan}`}
                    >
                      {game.image && (
                        <img
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 size-full object-cover opacity-65 transition duration-500 group-hover:scale-105"
                          src={game.image}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/75 via-zinc-950/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                      <span
                        className={`absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-extrabold ${game.popular ? "border-amber-300/30 bg-amber-400/15 text-amber-200" : "border-cyan-300/25 bg-cyan-400/10 text-cyan-200"}`}
                      >
                        {game.badge}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute right-5 top-7 text-5xl font-black text-white/20"
                      >
                        {game.mark}
                      </span>
                      <div className="absolute inset-x-5 bottom-4">
                        <p className="m-0 text-[10px] font-bold text-cyan-200">
                          {game.genre.toUpperCase()}
                        </p>
                        <p className="mt-1 max-w-[80%] text-xl font-extrabold leading-tight text-white">
                          {game.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-lg font-bold text-white">
                            {game.title}
                          </h3>
                          <p className="mt-1 truncate text-sm text-zinc-400">
                            {game.developer}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold text-cyan-200">
                          {game.genre}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {game.categories.map((category) => (
                          <span
                            className="rounded-full border border-zinc-700 bg-zinc-950 px-2.5 py-1 text-xs font-medium text-zinc-400"
                            key={category}
                          >
                            {category}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-zinc-800 pt-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${game.editorUrl ? "bg-amber-400/10 text-amber-300" : "bg-zinc-800 text-zinc-400"}`}
                        >
                          {game.featureSummary}
                        </span>
                        {game.editorUrl ? (
                          <Link
                            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-bold text-white transition hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                            to={game.editorUrl}
                          >
                            {catalogCopy.openEditor}{" "}
                            <span aria-hidden="true">→</span>
                          </Link>
                        ) : (
                          <button
                            className="inline-flex min-h-10 shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-sm font-bold text-zinc-500"
                            disabled
                            title={catalogCopy.comingSoonDescription}
                            type="button"
                          >
                            {catalogCopy.comingSoon}{" "}
                            <span aria-hidden="true">→</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900 px-6 py-14 text-center">
                <p className="text-base font-bold text-zinc-200">
                  {catalogCopy.noGamesTitle}
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  {catalogCopy.noGamesDescription}
                </p>
                <button
                  className="mt-5 rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-cyan-500/50 hover:bg-zinc-950 focus-visible:outline-2 focus-visible:outline-cyan-400"
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory(allCategory);
                  }}
                >
                  {catalogCopy.resetFilters}
                </button>
              </div>
            )}
          </section>

          <section
            id="submit-game"
            className="mt-16 flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-cyan-950/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div>
              <p className="mb-2 text-[10px] font-extrabold text-amber-300">
                {catalogCopy.submitEyebrow}
              </p>
              <h2 className="text-xl font-extrabold text-white">
                {catalogCopy.submitTitle}
              </h2>
              <p className="mb-0 mt-2 text-sm leading-6 text-zinc-400">
                {catalogCopy.submitDescription}
              </p>
            </div>
            <a
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-cyan-400/25 bg-cyan-400/10 px-4 text-sm font-bold text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-400/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              href="https://discord.com/"
              rel="noreferrer"
              target="_blank"
            >
              {catalogCopy.community} <span aria-hidden="true">↗</span>
            </a>
          </section>

          <footer
            id="about"
            className="mt-10 flex flex-col gap-4 border-t border-zinc-800 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="m-0">
              © {currentYear} Idle Forge. {catalogCopy.footerNote}
            </p>
            <a className="transition hover:text-amber-300" href="#disclaimer">
              {catalogCopy.footerLink}
            </a>
          </footer>
        </div>
      </main>
    </>
  );
};

export default VCyan;
