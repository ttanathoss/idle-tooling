import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./index.css";
import forgeAndFortuneImage from "../assets/logos/forgeAndFortune.png";

const variantBasePath = "/v-f";

function getEditorPath(game: string) {
  return `${variantBasePath}/editor?game=${encodeURIComponent(game)}`;
}

type IconName =
  | "arrow"
  | "bolt"
  | "check"
  | "chevron"
  | "download"
  | "file"
  | "gamepad"
  | "search"
  | "shield"
  | "sparkles"
  | "upload"
  | "warning";

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8M8 17h5" />
      </>
    ),
    gamepad: (
      <>
        <path d="M6 9h12a4 4 0 0 1 3.8 5.2l-1.2 3.6a2.4 2.4 0 0 1-4 1l-1.5-1.7H8.9l-1.5 1.7a2.4 2.4 0 0 1-4-1l-1.2-3.6A4 4 0 0 1 6 9Z" />
        <path d="M8 12v4M6 14h4M16 13h.01M18 15h.01" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 4 6v5c0 5 3.4 8.8 8 10 4.6-1.2 8-5 8-10V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3-1.2 3.4L7 8l3.8 1.6L12 13l1.2-3.4L17 8l-3.8-1.6L12 3Z" />
        <path d="m5 14-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8L5 14ZM19 14l-.5 1.5L17 16l1.5.5L19 18l.5-1.5L21 16l-1.5-.5L19 14Z" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 20h14" />
      </>
    ),
    warning: (
      <>
        <path d="M10.3 3.6 2.4 18a2 2 0 0 0 1.8 3h15.6a2 2 0 0 0 1.8-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4M12 17h.01" />
      </>
    ),
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const games = [
  {
    title: "Forge & Fortune",
    genre: "Idle Tycoon",
    saves: "12.8k saves tuned",
    image: forgeAndFortuneImage,
  },
  {
    title: "Clicker Heroes",
    genre: "Idle RPG",
    saves: "28.4k saves tuned",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/363970/header.jpg",
  },
  {
    title: "Realm Grinder",
    genre: "Idle RPG",
    saves: "9.6k saves tuned",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/610080/header.jpg",
  },
  {
    title: "Cookie Clicker",
    genre: "Clicker",
    saves: "18.2k saves tuned",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/145440/header.jpg",
  },
  {
    title: "Melvor Idle",
    genre: "Idle RPG",
    saves: "7.4k saves tuned",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1267910/header.jpg",
  },
  {
    title: "Idle Champions",
    genre: "Idle RPG",
    saves: "6.1k saves tuned",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/627690/header.jpg",
  },
];

type Preset = { id: string; name: string; detail: string; icon: IconName };

const gamePresets: Record<string, Preset[]> = {
  "Forge & Fortune": [
    {
      id: "cash",
      name: "Max Cash",
      detail: "Fill every business account to its safe limit",
      icon: "bolt",
    },
    {
      id: "managers",
      name: "Hire All Managers",
      detail: "Unlock every available business manager",
      icon: "sparkles",
    },
    {
      id: "angels",
      name: "Angel Investor Boost",
      detail: "Add a configurable angel investor balance",
      icon: "arrow",
    },
  ],
  "Clicker Heroes": [
    {
      id: "cookies",
      name: "Max Cookies",
      detail: "Set banked cookies to the maximum safe value",
      icon: "bolt",
    },
    {
      id: "heavenly",
      name: "Heavenly Chips",
      detail: "Add prestige levels and heavenly chips",
      icon: "arrow",
    },
    {
      id: "upgrades",
      name: "Unlock Upgrades",
      detail: "Enable store upgrades and achievements",
      icon: "sparkles",
    },
  ],
  "Realm Grinder": [
    {
      id: "cash",
      name: "Max Mine Cash",
      detail: "Maximize cash across all unlocked continents",
      icon: "bolt",
    },
    {
      id: "super",
      name: "Super Managers",
      detail: "Unlock and level every super manager",
      icon: "sparkles",
    },
    {
      id: "mainland",
      name: "Complete Mainland",
      detail: "Mark all mainland mine levels complete",
      icon: "check",
    },
  ],
  "Cookie Clicker": [
    {
      id: "souls",
      name: "Hero Souls",
      detail: "Add hero souls for your next ascension",
      icon: "bolt",
    },
    {
      id: "heroes",
      name: "Level All Heroes",
      detail: "Raise every recruited hero to level 10,000",
      icon: "arrow",
    },
    {
      id: "ancients",
      name: "Unlock Ancients",
      detail: "Unlock all ancients without rerolling",
      icon: "sparkles",
    },
  ],
  "Melvor Idle": [
    {
      id: "eggs",
      name: "Golden Eggs",
      detail: "Fill your golden egg balance",
      icon: "bolt",
    },
    {
      id: "research",
      name: "Complete Research",
      detail: "Unlock all common and epic research",
      icon: "sparkles",
    },
    {
      id: "hyperloop",
      name: "Hyperloop Station",
      detail: "Unlock the hyperloop transport system",
      icon: "arrow",
    },
  ],
  "Idle Champions": [
    {
      id: "gems",
      name: "Max Gems",
      detail: "Set gems to the maximum stable amount",
      icon: "bolt",
    },
    {
      id: "excavations",
      name: "All Excavations",
      detail: "Complete excavation rewards and lore",
      icon: "sparkles",
    },
    {
      id: "reincarnation",
      name: "Instant Reincarnation",
      detail: "Meet requirements for the next reincarnation",
      icon: "arrow",
    },
  ],
};

function Header({
  onNavigate,
  editorGame,
}: {
  onNavigate: (url: string) => void;
  editorGame?: string;
}) {
  const editorPath = getEditorPath(editorGame ?? games[0].title);

  return (
    <header className="border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href={variantBasePath}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(variantBasePath);
          }}
          className="flex items-center gap-3"
          aria-label="Idle Tune home"
        >
          <span className="grid size-9 place-items-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.16)]">
            <Icon name="gamepad" className="size-5" />
          </span>
          <span className="text-base font-bold tracking-tight">
            IDLE<span className="text-cyan-300">TUNE</span>
          </span>
        </a>
        <nav
          className="hidden items-center gap-8 text-sm font-medium text-zinc-400 sm:flex"
          aria-label="Primary navigation"
        >
          <a
            href={`${variantBasePath}/#games`}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(`${variantBasePath}/#games`);
            }}
            className="transition-colors hover:text-cyan-300"
          >
            Games
          </a>
          <a
            href={editorPath}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(event.currentTarget.getAttribute("href") ?? "/");
            }}
            className="transition-colors hover:text-cyan-300"
          >
            Save editor
          </a>
          <a
            href={`${variantBasePath}/#safety`}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(`${variantBasePath}/#safety`);
            }}
            className="transition-colors hover:text-cyan-300"
          >
            Safety
          </a>
        </nav>
        <a
          href={editorPath}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(event.currentTarget.getAttribute("href") ?? "/");
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold transition hover:border-cyan-400/50 hover:text-cyan-300"
        >
          Open editor <Icon name="arrow" className="size-4" />
        </a>
      </div>
    </header>
  );
}

function WarningBanner() {
  return (
    <div className="border-b border-amber-300/20 bg-amber-400/10 text-amber-100">
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-5 py-3.5 text-sm sm:items-center sm:px-8">
        <Icon
          name="warning"
          className="mt-0.5 size-4 shrink-0 text-amber-300 sm:mt-0"
        />
        <p>
          <strong className="font-semibold text-amber-300">Warning:</strong>{" "}
          Using save editors may reduce the fun of game progression. Use at your
          own risk.
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 font-semibold text-zinc-400">
          <Icon name="gamepad" className="size-4 text-cyan-300" /> IDLETUNE
        </div>
        <p>
          Back up your original save before making changes. Not affiliated with
          listed games.
        </p>
        <p>Local-first by design.</p>
      </div>
    </footer>
  );
}

function LandingPage({ onChoose }: { onChoose: (title: string) => void }) {
  const [query, setQuery] = useState("");
  const filteredGames = useMemo(
    () =>
      games.filter((game) =>
        game.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <>
      <section className="relative border-b border-white/5">
        <div className="hero-grid absolute inset-0 opacity-35" />
        <div className="hero-glow absolute left-1/2 top-0 h-full w-full -translate-x-1/2" />
        <div className="relative mx-auto max-w-7xl px-5 pb-22 pt-20 text-center sm:px-8 sm:pb-28 sm:pt-26">
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-cyan-300">
            <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
            Save engine online
          </div>
          <h1 className="mx-auto max-w-5xl text-balance text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl">
            Idle Game <span className="text-cyan-300">Save Editor</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-7 text-zinc-400 sm:text-lg">
            Fine-tune your favorite idle games with confidence. Fast, private,
            and processed entirely in your browser.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#games"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-6 py-3.5 text-sm font-bold text-zinc-950 transition hover:bg-cyan-200 sm:w-auto"
            >
              Find your game{" "}
              <Icon
                name="arrow"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </a>
            <div
              id="safety"
              className="inline-flex items-center gap-2 px-4 py-3 text-sm text-zinc-400"
            >
              <Icon name="shield" className="size-4 text-emerald-400" /> Your
              save never leaves this device
            </div>
          </div>
        </div>
      </section>

      <section
        id="games"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Game library
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Choose your idle game
            </h2>
            <p className="mt-3 text-zinc-400">
              Each title has its own editor and game-specific presets.
            </p>
          </div>
          <label className="relative block w-full lg:max-w-md">
            <span className="sr-only">Filter games by name</span>
            <Icon
              name="search"
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-500"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-13 w-full rounded-xl border border-zinc-700/80 bg-zinc-900/80 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/5"
              placeholder="Search supported games..."
            />
            <kbd className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-500 sm:block">
              FILTER
            </kbd>
          </label>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game, index) => (
            <article
              key={game.title}
              className="game-card group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.image}
                  alt=""
                  className="h-full w-full object-cover grayscale-[25%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-950/10 to-transparent" />
                <div className="absolute left-4 top-4 rounded-md border border-white/15 bg-zinc-950/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300 backdrop-blur-md">
                  Save profile {String(index + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-cyan-300">
                  {game.genre}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
                  {game.title}
                </h3>
                <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
                  <span className="text-xs text-zinc-500">{game.saves}</span>
                  <button
                    onClick={() => onChoose(game.title)}
                    className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3.5 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-cyan-300 hover:text-zinc-950"
                  >
                    Edit save <Icon name="chevron" className="size-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {filteredGames.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-zinc-700 py-16 text-center text-zinc-500">
            No supported games match “{query}”.
          </div>
        )}
      </section>
    </>
  );
}

function EditorPage({
  selectedGame,
  onBack,
}: {
  selectedGame: string;
  onBack: () => void;
}) {
  const [saveData, setSaveData] = useState("");
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const presets = gamePresets[selectedGame] ?? [];

  function togglePreset(id: string) {
    setSelectedPresets((current) =>
      current.includes(id)
        ? current.filter((preset) => preset !== id)
        : [...current, id],
    );
  }

  function loadFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSaveData(String(reader.result ?? ""));
      setFileName(file.name);
    };
    reader.readAsText(file);
  }

  function createEditedSave() {
    const selectedEnhancements = presets
      .filter((preset) => selectedPresets.includes(preset.id))
      .map((preset) => preset.id);

    try {
      const parsed = JSON.parse(saveData);
      return JSON.stringify(
        {
          ...parsed,
          idleTune: {
            game: selectedGame,
            appliedPresets: selectedEnhancements,
          },
        },
        null,
        2,
      );
    } catch {
      const presetData = JSON.stringify({
        game: selectedGame,
        appliedPresets: selectedEnhancements,
      });
      return `${saveData}\n\n--IDLETUNE-PRESETS--\n${presetData}`;
    }
  }

  function downloadSave() {
    const blob = new Blob([createEditedSave()], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedGame.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-tuned-save.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 2500);
  }

  async function copySave() {
    const editedSave = createEditedSave();
    try {
      await navigator.clipboard.writeText(editedSave);
    } catch {
      const copyField = document.createElement("textarea");
      copyField.value = editedSave;
      copyField.setAttribute("readonly", "");
      copyField.className = "fixed left-0 top-0 opacity-0";
      document.body.appendChild(copyField);
      copyField.select();
      document.execCommand("copy");
      copyField.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section className="min-h-[calc(100vh-11rem)] bg-zinc-900/35 px-5 py-14 sm:px-8 sm:py-18">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-cyan-300"
        >
          <Icon name="arrow" className="size-4 rotate-180" /> Back to game
          library
        </button>
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              Tuning console
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Configure your save
            </h2>
            <p className="mt-3 text-zinc-400">
              Editing profile:{" "}
              <span className="font-semibold text-zinc-200">
                {selectedGame}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-emerald-400/15 bg-emerald-400/5 px-3 py-2 text-xs font-medium text-emerald-300">
            <Icon name="shield" className="size-4" /> Local processing active
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/30">
          <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/60 px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-rose-400/80" />
              <span className="size-2.5 rounded-full bg-amber-300/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
              Session / encrypted locally
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
            <div className="border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white">Save data</h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    Paste the encoded string or load your save file.
                  </p>
                </div>
                <input
                  ref={fileInput}
                  type="file"
                  className="hidden"
                  accept=".txt,.sav,.json"
                  onChange={(event) => loadFile(event.target.files?.[0])}
                />
                <button
                  onClick={() => fileInput.current?.click()}
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:border-cyan-300/50 hover:text-cyan-300"
                >
                  <Icon name="upload" className="size-4" /> Upload
                </button>
              </div>
              {fileName && (
                <div className="mb-3 flex items-center gap-2 rounded-lg bg-cyan-300/5 px-3 py-2 text-xs text-cyan-300">
                  <Icon name="file" className="size-3.5" /> {fileName} loaded
                </div>
              )}
              <textarea
                value={saveData}
                onChange={(event) => setSaveData(event.target.value)}
                spellCheck={false}
                className="min-h-72 w-full resize-y rounded-xl border border-zinc-800 bg-black/30 p-4 font-mono text-xs leading-6 text-cyan-100 outline-none transition placeholder:text-zinc-700 focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/5"
                placeholder="Paste your save data here...&#10;&#10;Example: eyJnYW1lVmVyc2lvbiI6ICIyLjQuMSIsICJwbGF5ZXJEYXRh..."
              />
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                <span>{saveData.length.toLocaleString()} characters</span>
                <span>Accepted: .txt .sav .json</span>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              <h3 className="font-bold text-white">Quick presets</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Choose one or more enhancements.
              </p>
              <div className="mt-6 space-y-3">
                {presets.length > 0 ? (
                  presets.map((preset) => {
                    const active = selectedPresets.includes(preset.id);
                    return (
                      <button
                        key={preset.id}
                        onClick={() => togglePreset(preset.id)}
                        aria-pressed={active}
                        className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                          active
                            ? "border-cyan-300/35 bg-cyan-300/8"
                            : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                        }`}
                      >
                        <span
                          className={`grid size-10 shrink-0 place-items-center rounded-lg ${active ? "bg-cyan-300 text-zinc-950" : "bg-zinc-800 text-zinc-500"}`}
                        >
                          <Icon name={preset.icon} className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-sm font-semibold ${active ? "text-cyan-100" : "text-zinc-300"}`}
                          >
                            {preset.name}
                          </span>
                          <span className="mt-0.5 block text-xs leading-5 text-zinc-600">
                            {preset.detail}
                          </span>
                        </span>
                        <span
                          className={`grid size-5 shrink-0 place-items-center rounded border ${active ? "border-cyan-300 bg-cyan-300 text-zinc-950" : "border-zinc-700"}`}
                        >
                          {active && <Icon name="check" className="size-3.5" />}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-sm text-zinc-500">
                    No quick presets are available for this game.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 bg-zinc-900/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <Icon name="shield" className="size-4 text-emerald-400" />
              <span>
                <strong className="font-medium text-zinc-300">
                  {selectedPresets.length} presets
                </strong>{" "}
                ready to apply
              </span>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                onClick={copySave}
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-cyan-300/30 bg-cyan-300/8 px-7 py-3.5 text-sm font-bold text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-300/15 sm:w-auto"
              >
                <Icon name={copied ? "check" : "file"} className="size-5" />
                {copied ? "Saved & copied" : "Save & Copy"}
              </button>
              <button
                onClick={downloadSave}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-amber-300 px-7 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-400/10 transition hover:bg-amber-200 sm:w-auto"
              >
                <Icon
                  name={downloaded ? "check" : "download"}
                  className="size-5"
                />
                {downloaded ? "Save downloaded" : "Save & Download"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const location = useLocation();
  const routerNavigate = useNavigate();
  const requestedGame = new URLSearchParams(location.search).get("game");
  const selectedGame =
    games.find((game) => game.title === requestedGame)?.title ?? games[0].title;
  const route =
    location.pathname.replace(/\/+$/, "") === `${variantBasePath}/editor`
      ? "editor"
      : "home";

  function navigate(url: string) {
    routerNavigate(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const hash = new URL(url, window.location.origin).hash;
    if (hash)
      window.setTimeout(
        () =>
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }),
        50,
      );
  }

  function chooseGame(title: string) {
    navigate(getEditorPath(title));
  }

  return (
    <main className="vf-app min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <Header onNavigate={navigate} editorGame={selectedGame} />
      <WarningBanner />
      {route === "editor" ? (
        <EditorPage
          key={selectedGame}
          selectedGame={selectedGame}
          onBack={() => navigate(`${variantBasePath}/#games`)}
        />
      ) : (
        <LandingPage onChoose={chooseGame} />
      )}
      <Footer />
    </main>
  );
}
