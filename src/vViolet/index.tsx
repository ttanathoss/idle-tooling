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

const VViolet = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    Category | typeof allCategory
  >(allCategory);
  const [sortMode, setSortMode] = useState<SortMode>("featured");
  const sortedGames = getVisibleGames(searchQuery, activeCategory, sortMode);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0B0E17] text-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-5 sm:px-6 sm:pt-8 lg:px-8">
          <aside
            id="disclaimer"
            className="flex gap-3 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3.5 text-sm leading-6 text-amber-200 sm:items-center sm:px-5"
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
              <strong className="font-semibold text-amber-100">
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
              <p className="m-0 text-xs font-bold text-violet-300">
                {catalogCopy.heroEyebrow}
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <h1
                  id="page-title"
                  className="max-w-4xl text-4xl font-extrabold leading-tight text-[#F8FAFC] sm:text-5xl"
                >
                  {catalogCopy.heroTitle}
                  <br />
                  <span className="text-violet-400">
                    {catalogCopy.heroSubtitle}
                  </span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                  {catalogCopy.heroDescription}
                </p>
              </div>
            </div>
          </section>

          <section
            aria-label="Search and filter games"
            className="rounded-2xl border border-[#2A2E3D] bg-[#131722] p-4 sm:p-5"
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <label className="relative block w-full xl:max-w-xs">
                <span className="sr-only">{catalogCopy.searchLabel}</span>
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="m16.5 16.5 4 4" />
                </svg>
                <input
                  className="h-11 w-full rounded-xl border border-[#2A2E3D] bg-[#0B0E17] pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.currentTarget.value)
                  }
                  placeholder={catalogCopy.searchPlaceholder}
                />
                {searchQuery && (
                  <button
                    className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
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
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
                    activeCategory === allCategory
                      ? "border-violet-400/40 bg-violet-500/20 text-violet-200"
                      : "border-[#2A2E3D] bg-[#0B0E17] text-slate-400 hover:border-violet-500/50 hover:text-slate-100"
                  }`}
                  type="button"
                  onClick={() => setActiveCategory(allCategory)}
                >
                  {catalogCopy.allCategories}
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    aria-pressed={activeCategory === category}
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
                      activeCategory === category
                        ? "border-violet-400/40 bg-violet-500/20 text-violet-200"
                        : "border-[#2A2E3D] bg-[#0B0E17] text-slate-400 hover:border-violet-500/50 hover:text-slate-100"
                    }`}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <label className="relative block w-full shrink-0 xl:w-48">
                <span className="sr-only">{catalogCopy.sortLabel}</span>
                <select
                  aria-label={catalogCopy.sortLabel}
                  className="h-11 w-full appearance-none rounded-xl border border-[#2A2E3D] bg-[#0B0E17] px-3 pr-9 text-sm font-medium text-slate-200 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
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
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
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
                <p className="mb-1 text-[10px] font-bold text-violet-300">
                  {catalogCopy.gamesEyebrow}
                </p>
                <h2
                  id="games-heading"
                  className="text-2xl font-extrabold text-white sm:text-3xl"
                >
                  {catalogCopy.gamesTitle}
                </h2>
              </div>
              <p
                aria-live="polite"
                className="m-0 text-sm font-semibold text-slate-500"
              >
                {`${sortedGames.length} ${sortedGames.length === 1 ? "game" : "games"}`}
              </p>
            </div>

            {sortedGames.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {sortedGames.map((game) => (
                  <article
                    className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#2A2E3D] bg-[#131722] transition duration-200 hover:-translate-y-1 hover:border-violet-500 hover:shadow-[0_12px_40px_-20px_rgba(124,58,237,0.65)]"
                    key={game.title}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-10 top-0 z-10 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-0 shadow-[0_0_16px_2px_rgba(124,58,237,0.65)] transition group-hover:opacity-100"
                    />
                    <div
                      className={`relative h-44 overflow-hidden bg-gradient-to-br ${game.coverViolet}`}
                    >
                      {game.image && (
                        <img
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 size-full object-cover opacity-60 transition duration-500 group-hover:scale-105"
                          src={game.image}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E17]/75 via-[#0B0E17]/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#131722] via-transparent to-transparent" />
                      <span
                        className={`absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-extrabold ${
                          game.featured
                            ? "border-violet-300/30 bg-violet-500/25 text-violet-100"
                            : game.popular
                              ? "border-amber-300/30 bg-amber-500/20 text-amber-200"
                              : "border-slate-400/20 bg-slate-900/70 text-slate-300"
                        }`}
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
                        <p className="m-0 text-[10px] font-bold text-violet-200/90">
                          {game.genre.toUpperCase()}
                        </p>
                        <p className="mt-1 max-w-[75%] text-xl font-extrabold leading-tight text-white">
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
                          <p className="mt-1 truncate text-sm text-slate-400">
                            {game.developer}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold text-violet-200">
                          {game.genre}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {game.categories.map((category) => (
                          <span
                            className="rounded-full border border-[#2A2E3D] bg-[#0B0E17] px-2.5 py-1 text-xs font-medium text-slate-400"
                            key={category}
                          >
                            {category}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#2A2E3D] pt-4">
                        <span
                          className={`text-[10px] font-extrabold ${
                            game.editorUrl
                              ? "text-emerald-300"
                              : "text-slate-500"
                          }`}
                        >
                          {game.featureSummary}
                        </span>
                        {game.editorUrl ? (
                          <Link
                            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-bold text-white transition hover:bg-purple-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
                            to={game.editorUrl}
                          >
                            {catalogCopy.openEditor}{" "}
                            <span aria-hidden="true">→</span>
                          </Link>
                        ) : (
                          <button
                            className="inline-flex min-h-10 shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-[#2A2E3D] bg-[#0B0E17] px-4 text-sm font-bold text-slate-500"
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
              <div className="rounded-2xl border border-dashed border-[#2A2E3D] bg-[#131722] px-6 py-14 text-center">
                <p className="text-base font-bold text-slate-200">
                  {catalogCopy.noGamesTitle}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {catalogCopy.noGamesDescription}
                </p>
                <button
                  className="mt-5 rounded-xl border border-[#2A2E3D] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-violet-500 hover:bg-[#0B0E17] focus-visible:outline-2 focus-visible:outline-violet-400"
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
            className="mt-16 flex flex-col gap-6 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-500/15 via-[#131722] to-[#131722] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div>
              <p className="mb-2 text-[10px] font-extrabold text-violet-300">
                {catalogCopy.submitEyebrow}
              </p>
              <h2 className="text-xl font-extrabold text-white">
                {catalogCopy.submitTitle}
              </h2>
              <p className="mb-0 mt-2 text-sm leading-6 text-slate-400">
                {catalogCopy.submitDescription}
              </p>
            </div>
            <a
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-violet-300/25 bg-violet-500/10 px-4 text-sm font-bold text-violet-200 transition hover:border-violet-300/50 hover:bg-violet-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
              href="https://discord.com/"
              rel="noreferrer"
              target="_blank"
            >
              {catalogCopy.community} <span aria-hidden="true">↗</span>
            </a>
          </section>

          <footer
            id="about"
            className="mt-10 flex flex-col gap-4 border-t border-[#2A2E3D] pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="m-0">
              © {currentYear} Idle Forge. {catalogCopy.footerNote}
            </p>
            <a className="transition hover:text-slate-200" href="#disclaimer">
              {catalogCopy.footerLink}
            </a>
          </footer>
        </div>
      </main>
    </>
  );
};

export default VViolet;
