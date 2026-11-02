import forgeAndFortuneImage from "./assets/logos/forgeAndFortune.png";

export const categories = ["Clicker", "RPG", "Automation", "Tycoon"] as const;
export const allCategory = "All" as const;
export type Category = (typeof categories)[number];
export type SortMode = "featured" | "alphabetical" | "available";

export type Game = {
  title: string;
  developer: string;
  genre: string;
  categories: Category[];
  coverViolet: string;
  coverCyan: string;
  mark: string;
  image?: string;
  editorUrl?: string;
  featured?: boolean;
  popular?: boolean;
  badge: string;
  featureSummary: string;
};

export const games: Game[] = [
  {
    title: "Forge & Fortune",
    developer: "The Space Men",
    genre: "Idle Tycoon",
    categories: ["Automation", "Tycoon"],
    coverViolet: "from-amber-500/35 via-[#34251c] to-[#131722]",
    coverCyan: "from-amber-400/40 via-amber-950/60 to-zinc-900",
    mark: "F&F",
    image: forgeAndFortuneImage,
    editorUrl: "/forgeandfortune",
    featured: true,
    badge: "FEATURED",
    featureSummary: "2 MOD TOOLS READY",
  },
  {
    title: "Clicker Heroes",
    developer: "Playsaurus",
    genre: "Idle RPG",
    categories: ["Clicker", "RPG"],
    coverViolet: "from-sky-500/45 via-[#172b45] to-[#131722]",
    coverCyan: "from-sky-400/40 via-blue-950/50 to-zinc-900",
    mark: "CH",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/363970/header.jpg",
    popular: true,
    badge: "POPULAR",
    featureSummary: "8 PRESETS PLANNED",
  },
  {
    title: "Realm Grinder",
    developer: "Divine Games",
    genre: "Idle RPG",
    categories: ["RPG", "Automation", "Tycoon"],
    coverViolet: "from-violet-500/45 via-[#302047] to-[#131722]",
    coverCyan: "from-violet-400/35 via-indigo-950/50 to-zinc-900",
    mark: "RG",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/610080/header.jpg",
    popular: true,
    badge: "POPULAR",
    featureSummary: "10 PRESETS PLANNED",
  },
  {
    title: "Cookie Clicker",
    developer: "Orteil",
    genre: "Clicker",
    categories: ["Clicker"],
    coverViolet: "from-orange-500/45 via-[#432a20] to-[#131722]",
    coverCyan: "from-amber-400/40 via-orange-950/50 to-zinc-900",
    mark: "CC",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/145440/header.jpg",
    editorUrl: "/v-cyan/cookie-clicker",
    popular: true,
    badge: "POPULAR",
    featureSummary: "12 PRESETS AVAILABLE",
  },
  {
    title: "Melvor Idle",
    developer: "Games by Malcs",
    genre: "Idle RPG",
    categories: ["RPG", "Automation"],
    coverViolet: "from-cyan-500/40 via-[#183741] to-[#131722]",
    coverCyan: "from-cyan-400/40 via-teal-950/50 to-zinc-900",
    mark: "MI",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1267910/header.jpg",
    popular: true,
    badge: "POPULAR",
    featureSummary: "15 PRESETS PLANNED",
  },
  {
    title: "Idle Champions",
    developer: "Codename Entertainment",
    genre: "Idle RPG",
    categories: ["RPG"],
    coverViolet: "from-rose-500/40 via-[#422534] to-[#131722]",
    coverCyan: "from-rose-400/40 via-rose-950/50 to-zinc-900",
    mark: "IC",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/627690/header.jpg",
    badge: "IDLE FAVORITE",
    featureSummary: "TUNER IN DEVELOPMENT",
  },
];

export const liveToolCount = games.filter((game) => game.editorUrl).length;

export const catalogCopy = {
  fairPlayTitle: "Fair Play Notice:",
  fairPlayMessage:
    "Modding save files is intended for fun and experimentation. Always back up your original save before editing.",
  heroEyebrow: "YOUR IDLE GAME LOADOUT",
  heroTitle: "Tune & Accelerate",
  heroSubtitle: "Your Idle Games",
  heroDescription:
    "Bypass tedious grinding, unlock achievements, and custom-craft your save files in seconds.",
  gamesEyebrow: "FEATURED & ALL GAMES",
  gamesTitle: "Supported Games",
  searchLabel: "Search games or developers",
  searchPlaceholder: "Search games or developers",
  categoryFilterLabel: "Filter games by category",
  allCategories: "All Categories",
  sortLabel: "Sort games",
  sortFeatured: "Featured",
  sortAvailable: "Editor available",
  sortAlphabetical: "Name A-Z",
  noGamesTitle: "No games found",
  noGamesDescription: "Try another search or category.",
  resetFilters: "Reset filters",
  submitEyebrow: "BUILD THE LIBRARY",
  submitTitle: "Have a game or tool to suggest?",
  submitDescription:
    "Share your idea with the community and help shape the catalog.",
  community: "Community",
  openEditor: "Open Editor",
  comingSoon: "Coming Soon",
  comingSoonDescription: "This editor is coming soon.",
  footerNote: "Play your way, back up your saves.",
  footerLink: "Fair Play Notice",
} as const;

export const getVisibleGames = (
  search: string,
  category: Category | "All",
  sortMode: SortMode,
) => {
  const normalizedSearch = search.trim().toLowerCase();
  const filteredGames = games.filter((game) => {
    const matchesCategory =
      category === "All" || game.categories.includes(category);
    const searchable = `${game.title} ${game.developer} ${game.genre} ${game.categories.join(" ")}`;

    return (
      matchesCategory && searchable.toLowerCase().includes(normalizedSearch)
    );
  });

  return filteredGames.sort((first, second) => {
    if (sortMode === "alphabetical") {
      return first.title.localeCompare(second.title);
    }

    if (sortMode === "available") {
      return (
        Number(Boolean(second.editorUrl)) - Number(Boolean(first.editorUrl)) ||
        first.title.localeCompare(second.title)
      );
    }

    return (
      Number(Boolean(second.featured)) - Number(Boolean(first.featured)) ||
      Number(Boolean(second.popular)) - Number(Boolean(first.popular)) ||
      first.title.localeCompare(second.title)
    );
  });
};
