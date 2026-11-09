import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router";
import "./index.css";

const variantBasePath = "/v-f2";

type IconName =
  | "anvil"
  | "search"
  | "arrow"
  | "warning"
  | "upload"
  | "clipboard"
  | "check"
  | "download"
  | "copy"
  | "chevron"
  | "spark"
  | "coins"
  | "speed"
  | "trophy"
  | "refresh"
  | "palette";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    anvil: (
      <>
        <path d="M5 7h14l-3 4H8L5 7Z" />
        <path d="M10 11v4l-4 2v2h12v-2l-4-2v-4" />
        <path d="M3 5h13l3 2H5L3 5Z" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    warning: (
      <>
        <path d="m12 3 9 17H3L12 3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M4 15v5h16v-5" />
      </>
    ),
    clipboard: (
      <>
        <rect x="6" y="5" width="12" height="16" rx="2" />
        <path d="M9 5V3h6v2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    download: (
      <>
        <path d="M12 4v12" />
        <path d="m7 11 5 5 5-5" />
        <path d="M4 20h16" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="11" height="11" rx="2" />
        <path d="M16 8V5H5v11h3" />
      </>
    ),
    chevron: <path d="m9 6 6 6-6 6" />,
    spark: (
      <>
        <path d="m12 3 1.3 4.7L18 9l-4.7 1.3L12 15l-1.3-4.7L6 9l4.7-1.3L12 3Z" />
        <path d="m18 15 .7 2.3L21 18l-2.3.7L18 21l-.7-2.3L15 18l2.3-.7L18 15Z" />
      </>
    ),
    coins: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
      </>
    ),
    speed: (
      <>
        <path d="M4 16a8 8 0 1 1 16 0" />
        <path d="m12 14 4-5" />
        <path d="M12 18h.01" />
      </>
    ),
    trophy: (
      <>
        <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
        <path d="M8 6H4v2a4 4 0 0 0 4 4" />
        <path d="M16 6h4v2a4 4 0 0 1-4 4" />
        <path d="M12 13v4M8 20h8" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 11a8 8 0 0 0-14-5L4 8" />
        <path d="M4 4v4h4" />
        <path d="M4 13a8 8 0 0 0 14 5l2-2" />
        <path d="M20 20v-4h-4" />
      </>
    ),
    palette: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="9" cy="8" r=".7" fill="currentColor" />
        <circle cx="14" cy="7" r=".7" fill="currentColor" />
        <circle cx="17" cy="11" r=".7" fill="currentColor" />
        <path d="M12 21c1.5 0 2.2-1.2 1.4-2.3-.8-1.2-.1-2.7 1.4-2.7H17a4 4 0 0 0 4-4" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

const photos = [
  "https://images.unsplash.com/photo-1665602878676-219e01293b51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1634834300387-8015d9fb7550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1672872476232-da16b45c9001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1651421569876-f74b6a70b9b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1714283339889-8130f4b92970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1647009894481-78bc91fcf724?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1200",
];

const games = [
  {
    title: "Galaxy Grinder",
    category: "Automation",
    presets: 12,
    image: photos[0],
    accent: "var(--signal)",
  },
  {
    title: "Neon Tycoon",
    category: "Tycoon",
    presets: 8,
    image: photos[1],
    accent: "#00e5a0",
  },
  {
    title: "Cyber Clicker",
    category: "Clicker",
    presets: 10,
    image: photos[2],
    accent: "#9d7bff",
  },
  {
    title: "Factory Infinite",
    category: "Automation",
    presets: 15,
    image: photos[3],
    accent: "#ffbc42",
  },
  {
    title: "Dungeon Ascend",
    category: "RPG",
    presets: 9,
    image: photos[4],
    accent: "#ff5470",
  },
  {
    title: "Night Shift Inc.",
    category: "Tycoon",
    presets: 7,
    image: photos[5],
    accent: "#4ecdc4",
  },
];

type Game = (typeof games)[number];

function gameSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const themes = [
  { id: "forge", name: "Forge Orange" },
  { id: "aubergine", name: "Orange + Violet" },
  { id: "electric", name: "Electric Violet" },
  { id: "ultraviolet", name: "Violet + Lime" },
  { id: "cobalt", name: "Cobalt + Lime" },
  { id: "spectrum", name: "Spectrum" },
  { id: "teal", name: "Teal + Magenta" },
  { id: "matrix", name: "Hacker Green" },
  { id: "crimson", name: "Crimson + Ice" },
] as const;

type ThemeId = (typeof themes)[number]["id"];

function Header({
  onHome,
  theme,
  onThemeChange,
}: {
  onHome: () => void;
  theme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}) {
  const themeSelectRef = useRef<HTMLSelectElement>(null);

  return (
    <header className="header">
      <button className="brand" onClick={onHome} aria-label="Idle Forge home">
        <span className="brand-mark">
          <Icon name="anvil" size={23} />
        </span>
        <span>
          IDLE <b>FORGE</b>
        </span>
      </button>
      <nav aria-label="Primary navigation">
        <button onClick={onHome}>Games</button>
        <a href="#how-it-works">How it works</a>
        <a href="#about">About</a>
      </nav>
      <label
        className="theme-switcher"
        htmlFor="theme-selector"
        onClick={(event) => {
          if (event.target !== themeSelectRef.current) {
            event.preventDefault();
            themeSelectRef.current?.showPicker();
          }
        }}
      >
        <Icon name="palette" size={16} />
        <span>Theme</span>
        <select
          ref={themeSelectRef}
          aria-label="Color theme"
          value={theme}
          onChange={(event) => onThemeChange(event.target.value as ThemeId)}
          id="theme-selector"
        >
          {themes.map((option) => (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <Icon name="chevron" size={13} />
      </label>
      <div className="header-meta">
        <span className="status-dot" /> All systems operational
      </div>
    </header>
  );
}

function Landing({ onOpen }: { onOpen: (game: Game) => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All Games");
  const categories = ["All Games", "Clicker", "Tycoon", "RPG", "Automation"];
  const filtered = useMemo(
    () =>
      games.filter(
        (game) =>
          (active === "All Games" || game.category === active) &&
          game.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, active],
  );

  return (
    <>
      <div className="warning-bar">
        <Icon name="warning" size={18} />
        <p>
          <b>Fair warning:</b> Save editors can change how you experience
          progression. Use responsibly — and always keep a backup.
        </p>
        <button aria-label="Dismiss warning">×</button>
      </div>

      <main>
        <section className="hero">
          <div className="eyebrow">
            <span /> PLAYER TOOLKIT / SAVE LAB
          </div>
          <h1>
            BREAK THE GRIND.
            <br />
            <em>KEEP THE FUN.</em>
          </h1>
          <p>
            Powerful, private save editing for your favorite idle games.
            <br className="desktop-only" /> No installs. No accounts. Just
            progress on your terms.
          </p>

          <label className="search-box">
            <Icon name="search" size={24} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search games..."
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="filter-row">
            {categories.map((category) => (
              <button
                className={active === category ? "active" : ""}
                onClick={() => setActive(category)}
                key={category}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="directory">
          <div className="section-heading">
            <div>
              <span>GAME DIRECTORY</span>
              <h2>Choose your game</h2>
            </div>
            <p>
              {filtered.length} tools available <i />
            </p>
          </div>
          <div className="game-grid">
            {filtered.map((game, index) => (
              <article
                className="game-card"
                key={game.title}
                style={{ "--accent": game.accent } as React.CSSProperties}
              >
                <button
                  className="card-image"
                  onClick={() => onOpen(game)}
                  aria-label={`Open ${game.title} editor`}
                >
                  <img src={game.image} alt="" />
                  <span className="index">0{index + 1}</span>
                  <span className="preset-badge">{game.presets} presets</span>
                </button>
                <div className="card-info">
                  <div>
                    <span className="category">{game.category}</span>
                    <h3>{game.title}</h3>
                  </div>
                  <button className="open-button" onClick={() => onOpen(game)}>
                    <span>Open editor</span>
                    <Icon name="arrow" />
                  </button>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty">
              No games found in this sector. Try another search.
            </div>
          )}
        </section>

        <section className="process" id="how-it-works">
          <div>
            <span>01</span>
            <b>Load your save</b>
            <p>Paste a string or upload your local file.</p>
          </div>
          <div>
            <span>02</span>
            <b>Choose your mods</b>
            <p>Fine-tune currency, speed, and unlocks.</p>
          </div>
          <div>
            <span>03</span>
            <b>Export & play</b>
            <p>Generate a ready-to-import save in seconds.</p>
          </div>
        </section>
      </main>
      <footer id="about">
        <div className="brand">
          <span className="brand-mark">
            <Icon name="anvil" size={20} />
          </span>
          <span>
            IDLE <b>FORGE</b>
          </span>
        </div>
        <p>Built for players who value their time.</p>
        <span>Local processing · Your data stays yours</span>
      </footer>
    </>
  );
}

function Toggle({
  on,
  setOn,
}: {
  on: boolean;
  setOn: (value: boolean) => void;
}) {
  return (
    <button
      className={`toggle ${on ? "on" : ""}`}
      onClick={() => setOn(!on)}
      role="switch"
      aria-checked={on}
    >
      <span />
    </button>
  );
}

function Editor({ game, onBack }: { game: Game; onBack: () => void }) {
  const [save, setSave] = useState("");
  const [currency, setCurrency] = useState(true);
  const [speed, setSpeed] = useState(false);
  const [achievements, setAchievements] = useState(false);
  const [prestige, setPrestige] = useState(false);
  const [speedValue, setSpeedValue] = useState(10);
  const [toast, setToast] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };
  const handleFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSave(String(reader.result || ""));
      notify(`${file.name} loaded`);
    };
    reader.readAsText(file);
  };
  const paste = async () => {
    try {
      setSave(await navigator.clipboard.readText());
      notify("Clipboard pasted");
    } catch {
      notify("Clipboard access unavailable");
    }
  };
  const generated = btoa(
    unescape(
      encodeURIComponent(
        JSON.stringify({
          source: save || "demo_save",
          mods: {
            currency,
            speed: speed ? speedValue : 1,
            achievements,
            prestige,
          },
        }),
      ),
    ),
  );
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(generated);
      notify("Modded save copied");
    } catch {
      notify("Copy unavailable");
    }
  };
  const download = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob([generated], { type: "text/plain" }),
    );
    link.download = `${game.title.toLowerCase().replaceAll(" ", "-")}-modded-save.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
    notify("Download started");
  };

  return (
    <main className="editor">
      {toast && (
        <div className="toast">
          <Icon name="check" size={17} />
          {toast}
        </div>
      )}
      <button className="back-button" onClick={onBack}>
        Game directory <Icon name="chevron" size={16} /> {game.title}
      </button>
      <section
        className="game-context"
        style={{ "--accent": game.accent } as React.CSSProperties}
      >
        <img src={game.image} alt="" />
        <div className="context-shade" />
        <div className="game-icon">
          <Icon name="anvil" size={31} />
        </div>
        <div className="context-copy">
          <span>{game.category} / SAVE EDITOR</span>
          <h1>{game.title}</h1>
          <p>
            Build the save you want. Every change is processed locally in your
            browser.
          </p>
        </div>
        <div className="secure-chip">
          <span /> LOCAL & SECURE
        </div>
      </section>

      <div className="workspace">
        <section className="step">
          <div className="step-title">
            <span>01</span>
            <div>
              <small>IMPORT</small>
              <h2>Load your save</h2>
            </div>
            <p>JSON · Base64 · Encoded file</p>
          </div>
          <div
            className="dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFile(e.dataTransfer.files[0]);
            }}
          >
            <textarea
              value={save}
              onChange={(e) => setSave(e.target.value)}
              placeholder="Paste your save string here..."
            />
            {!save && (
              <div className="drop-hint">
                <span>
                  <Icon name="upload" size={25} />
                </span>
                <b>Drop your save file here</b>
                <p>or paste a save string into this area</p>
              </div>
            )}
            <div className="input-actions">
              <button onClick={paste}>
                <Icon name="clipboard" size={17} /> Paste from clipboard
              </button>
              <button onClick={() => fileRef.current?.click()}>
                <Icon name="upload" size={17} /> Upload file
              </button>
              <input
                ref={fileRef}
                type="file"
                hidden
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>
          </div>
          <div className="privacy-note">
            <span>
              <Icon name="check" size={13} />
            </span>
            Your save is processed entirely in your browser. Nothing is
            uploaded.
          </div>
        </section>

        <section className="step">
          <div className="step-title">
            <span>02</span>
            <div>
              <small>MODIFY</small>
              <h2>Choose your upgrades</h2>
            </div>
            <p>
              {[currency, speed, achievements, prestige].filter(Boolean).length}{" "}
              modifications active
            </p>
          </div>
          <div className="mods-grid">
            <div className={`mod-card ${currency ? "selected" : ""}`}>
              <div className="mod-icon">
                <Icon name="coins" />
              </div>
              <Toggle on={currency} setOn={setCurrency} />
              <h3>Max Currency</h3>
              <p>Set all primary and premium currencies to maximum.</p>
              <div className="value-preview">
                <span>New value</span>
                <b>999,999,999</b>
              </div>
            </div>
            <div className={`mod-card ${speed ? "selected" : ""}`}>
              <div className="mod-icon purple">
                <Icon name="speed" />
              </div>
              <Toggle on={speed} setOn={setSpeed} />
              <h3>Speed Multiplier</h3>
              <p>Accelerate all timers and production rates.</p>
              <div className="number-control">
                <button
                  onClick={() => setSpeedValue(Math.max(1, speedValue - 1))}
                >
                  −
                </button>
                <b>{speedValue}×</b>
                <button onClick={() => setSpeedValue(speedValue + 1)}>+</button>
              </div>
            </div>
            <div className={`mod-card ${achievements ? "selected" : ""}`}>
              <div className="mod-icon yellow">
                <Icon name="trophy" />
              </div>
              <Toggle on={achievements} setOn={setAchievements} />
              <h3>Unlock Achievements</h3>
              <p>Unlock every achievement and its associated rewards.</p>
              <div className="value-preview">
                <span>Progress</span>
                <b>48 / 48</b>
              </div>
            </div>
            <div className={`mod-card ${prestige ? "selected" : ""}`}>
              <div className="mod-icon pink">
                <Icon name="refresh" />
              </div>
              <Toggle on={prestige} setOn={setPrestige} />
              <h3>Instant Prestige</h3>
              <p>Meet all requirements for your next ascension.</p>
              <div className="value-preview">
                <span>Next tier</span>
                <b>OMEGA III</b>
              </div>
            </div>
          </div>
        </section>

        <section className="export-bar">
          <div>
            <span>03</span>
            <div>
              <small>EXPORT</small>
              <h2>Forge your new save</h2>
            </div>
          </div>
          <div className="export-actions">
            <button className="secondary" onClick={copy}>
              <Icon name="copy" size={18} /> Copy string
            </button>
            <button className="secondary" onClick={download}>
              <Icon name="download" size={18} /> Download save
            </button>
            <button
              className="generate"
              onClick={() => notify("Modded save generated")}
            >
              <Icon name="spark" size={19} /> Generate modded save{" "}
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function GameEditorRoute({ onBack }: { onBack: () => void }) {
  const { slug } = useParams();
  const game = games.find((candidate) => gameSlug(candidate.title) === slug);

  return game ? (
    <Editor game={game} onBack={onBack} />
  ) : (
    <Navigate to="/" replace />
  );
}

function AppContent() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<ThemeId>(() => {
    const saved = localStorage.getItem("idle-forge-theme");
    return themes.some((option) => option.id === saved)
      ? (saved as ThemeId)
      : "spectrum";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("idle-forge-theme", theme);
  }, [theme]);
  const home = () => {
    navigate(variantBasePath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const open = (game: Game) => {
    navigate(`${variantBasePath}/editor/${gameSlug(game.title)}`);
    window.scrollTo({ top: 0 });
  };
  return (
    <div className="app-shell">
      <Header onHome={home} theme={theme} onThemeChange={setTheme} />
      <Routes>
        <Route index element={<Landing onOpen={open} />} />
        <Route
          path="editor/:slug"
          element={<GameEditorRoute onBack={home} />}
        />
        <Route path="*" element={<Navigate to={variantBasePath} replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
