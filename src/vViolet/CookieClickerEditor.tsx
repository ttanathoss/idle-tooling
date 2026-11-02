import { useState } from "react";
import { Link } from "react-router";

const cookieClickerBanner =
  "https://cdn.akamai.steamstatic.com/steam/apps/145440/header.jpg";
const initialCookieCount = 999_000_000_000;
const compactNumber = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 0,
});

type ToggleSwitchProps = {
  checked: boolean;
  label: string;
  onChange: () => void;
  tone?: "cyan" | "amber";
};

const ToggleSwitch = ({
  checked,
  label,
  onChange,
  tone = "cyan",
}: ToggleSwitchProps) => (
  <button
    aria-checked={checked}
    aria-label={label}
    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
      checked
        ? tone === "amber"
          ? "border-amber-400 bg-amber-500"
          : "border-cyan-400 bg-cyan-500"
        : "border-zinc-700 bg-zinc-800"
    }`}
    onClick={onChange}
    role="switch"
    type="button"
  >
    <span
      className={`size-4 rounded-full bg-white shadow-sm transition-transform ${
        checked ? "translate-x-5" : "translate-x-1"
      }`}
    />
  </button>
);

const CookieClickerEditor = () => {
  const [saveString, setSaveString] = useState("");
  const [saveFileName, setSaveFileName] = useState("");
  const [maximizeCookies, setMaximizeCookies] = useState(true);
  const [cookieCount, setCookieCount] = useState(initialCookieCount);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [unlockAll, setUnlockAll] = useState(false);
  const [prestigeBoost, setPrestigeBoost] = useState(false);
  const [generatedString, setGeneratedString] = useState("");
  const [message, setMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);

  const updateSaveString = (value: string) => {
    setSaveString(value);
    setGeneratedString("");
    setMessage("");
  };

  const pasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (!clipboardText.trim()) {
        setMessage("Your clipboard is empty.");
        setMessageIsError(true);
        return;
      }

      updateSaveString(clipboardText);
      setSaveFileName("");
      setMessage("Save string pasted from clipboard.");
      setMessageIsError(false);
    } catch {
      setMessage(
        "Clipboard access is unavailable. Paste your save string directly.",
      );
      setMessageIsError(true);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    try {
      updateSaveString(await file.text());
      setSaveFileName(file.name);
      setMessage(`${file.name} loaded.`);
      setMessageIsError(false);
    } catch {
      setMessage("This file could not be read. Try a plain text .txt file.");
      setMessageIsError(true);
    }

    event.currentTarget.value = "";
  };

  const generateModdedSave = () => {
    if (!saveString.trim()) {
      setMessage("Import a save string before generating a modifier preview.");
      setMessageIsError(true);
      return;
    }

    const localPayload = {
      format: "idle-forge-local-modifier-preview",
      game: "Cookie Clicker",
      supportedVersion: "v2.052",
      originalSaveString: saveString.trim(),
      modifiers: {
        maximizeCookies: maximizeCookies ? cookieCount : null,
        gameSpeedMultiplier: gameSpeed,
        unlockAchievementsAndUpgrades: unlockAll,
        instantPrestigeBoost: prestigeBoost,
      },
    };

    setGeneratedString(JSON.stringify(localPayload, null, 2));
    setMessage("Modifier preview generated locally.");
    setMessageIsError(false);
  };

  const copyGeneratedString = async () => {
    if (!generatedString) return;

    try {
      await navigator.clipboard.writeText(generatedString);
      setMessage("Generated modifier preview copied.");
      setMessageIsError(false);
    } catch {
      setMessage(
        "Clipboard access is unavailable. Select and copy the preview.",
      );
      setMessageIsError(true);
    }
  };

  const downloadGeneratedString = () => {
    if (!generatedString) return;

    const fileUrl = URL.createObjectURL(
      new Blob([generatedString], { type: "text/plain;charset=utf-8" }),
    );
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "cookie-clicker-modifier-preview.txt";
    document.body.append(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/85">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            className="inline-flex min-h-10 items-center gap-2 rounded-lg pr-3 text-sm font-bold text-zinc-300 transition hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            to="/v-cyan"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ←
            </span>
            Back to Catalog
          </Link>
          <span className="text-xs font-extrabold tracking-wide text-zinc-500">
            IDLE FORGE <span className="text-cyan-400">/</span> SAVE TUNER
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <section className="relative isolate overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-900/35" />
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 size-full object-cover opacity-45"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
            src={cookieClickerBanner}
          />
          <div className="absolute -right-12 -top-20 -z-10 size-72 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-7 sm:p-8">
            <div className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-400/30 via-orange-950/60 to-zinc-950 shadow-[0_12px_42px_-22px_rgba(245,158,11,0.65)] sm:size-32">
              <span aria-hidden="true" className="text-5xl sm:text-6xl">
                🍪
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-[10px] font-extrabold text-cyan-300">
                CLICKER / INCREMENTAL
              </p>
              <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Cookie Clicker{" "}
                <span className="text-zinc-400">— Save Tuner</span>
              </h1>
              <p className="mb-0 mt-2 text-sm text-zinc-400">by Orteil</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-zinc-700 bg-zinc-950/70 px-3 py-1 text-xs font-semibold text-zinc-300">
                  Supported version <span className="text-white">v2.052</span>
                </span>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  Active
                </span>
                <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
                  LOCAL PREVIEW
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <section
            aria-labelledby="import-heading"
            className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6"
          >
            <div className="flex items-start gap-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-extrabold text-cyan-300">
                01
              </span>
              <div>
                <p className="mb-1 text-[10px] font-extrabold text-cyan-300">
                  IMPORT
                </p>
                <h2
                  className="text-xl font-extrabold text-white"
                  id="import-heading"
                >
                  Save string
                </h2>
              </div>
            </div>

            <label className="mt-5 block">
              <span className="sr-only">Cookie Clicker save string</span>
              <textarea
                className="min-h-52 w-full resize-y rounded-xl border border-zinc-700 bg-zinc-950 p-4 font-mono text-xs leading-6 text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 sm:min-h-60"
                onChange={(event) => {
                  updateSaveString(event.currentTarget.value);
                  setSaveFileName("");
                }}
                placeholder="Paste your Cookie Clicker save string here..."
                spellCheck={false}
                value={saveString}
              />
            </label>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="m-0 text-xs text-zinc-500">
                {saveFileName ||
                  `${saveString.length.toLocaleString()} characters`}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-xs font-semibold text-zinc-300 transition hover:border-cyan-500/50 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-cyan-400"
                  onClick={pasteFromClipboard}
                  type="button"
                >
                  <span aria-hidden="true">▣</span> Paste from Clipboard
                </button>
                <label className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-xs font-semibold text-zinc-300 transition hover:border-cyan-500/50 hover:text-cyan-200 focus-within:outline-2 focus-within:outline-cyan-400">
                  <span aria-hidden="true">↑</span> Upload .txt File
                  <input
                    accept=".txt,text/plain"
                    className="sr-only"
                    onChange={handleFileUpload}
                    type="file"
                  />
                </label>
                <button
                  className="inline-flex min-h-9 items-center rounded-lg px-3 text-xs font-semibold text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200 focus-visible:outline-2 focus-visible:outline-cyan-400"
                  onClick={() => {
                    updateSaveString("");
                    setSaveFileName("");
                    setMessage("");
                    setMessageIsError(false);
                  }}
                  type="button"
                >
                  Clear
                </button>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="modifiers-heading"
            className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6"
          >
            <div className="flex items-start gap-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-sm font-extrabold text-amber-300">
                02
              </span>
              <div>
                <p className="mb-1 text-[10px] font-extrabold text-amber-300">
                  THE GAMER DECK
                </p>
                <h2
                  className="text-xl font-extrabold text-white"
                  id="modifiers-heading"
                >
                  Game modifiers
                </h2>
              </div>
            </div>

            <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2">
              <article className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-400/10 text-xl"
                    >
                      💰
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Max Currency / Cookies
                      </h3>
                      <p className="mt-1 text-xs text-zinc-500">
                        Set your cookie balance
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={maximizeCookies}
                    label="Max Currency / Cookies"
                    onChange={() => setMaximizeCookies(!maximizeCookies)}
                    tone="amber"
                  />
                </div>
                <div className="mt-4 rounded-lg border border-amber-400/15 bg-amber-400/5 p-3">
                  <p className="mb-1 text-[10px] font-bold text-amber-300">
                    COOKIE BALANCE
                  </p>
                  <p className="m-0 text-2xl font-extrabold text-amber-300">
                    {compactNumber.format(cookieCount)}
                    <span className="ml-1 text-xs font-bold text-amber-500">
                      {" "}
                      cookies
                    </span>
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      aria-label="Decrease cookie amount by one billion"
                      className="grid size-8 place-items-center rounded-lg border border-zinc-700 text-zinc-300 transition hover:border-amber-400/50 hover:text-amber-200 disabled:opacity-40"
                      disabled={!maximizeCookies || cookieCount < 1_000_000_000}
                      onClick={() =>
                        setCookieCount((count) =>
                          Math.max(0, count - 1_000_000_000),
                        )
                      }
                      type="button"
                    >
                      −
                    </button>
                    <input
                      aria-label="Cookie amount"
                      className="h-8 min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-2 text-center text-xs font-semibold text-white outline-none focus:border-amber-400"
                      disabled={!maximizeCookies}
                      min="0"
                      onChange={(event) =>
                        setCookieCount(
                          Math.max(0, Number(event.currentTarget.value) || 0),
                        )
                      }
                      type="number"
                      value={cookieCount}
                    />
                    <button
                      aria-label="Increase cookie amount by one billion"
                      className="grid size-8 place-items-center rounded-lg border border-zinc-700 text-zinc-300 transition hover:border-amber-400/50 hover:text-amber-200 disabled:opacity-40"
                      disabled={!maximizeCookies}
                      onClick={() =>
                        setCookieCount((count) => count + 1_000_000_000)
                      }
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>

              <article className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-xl text-cyan-300"
                    >
                      ⚡
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Game Speed Multiplier
                      </h3>
                      <p className="mt-1 text-xs text-zinc-500">
                        Adjust simulation speed
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-xs font-extrabold text-cyan-300">
                    {gameSpeed}x
                  </span>
                </div>
                <input
                  aria-label="Game speed multiplier"
                  className="mt-7 h-2 w-full cursor-pointer accent-cyan-400"
                  max="50"
                  min="1"
                  onChange={(event) =>
                    setGameSpeed(Number(event.currentTarget.value))
                  }
                  type="range"
                  value={gameSpeed}
                />
                <div className="mt-2 flex justify-between text-[10px] font-semibold text-zinc-500">
                  <span>1x</span>
                  <span>25x</span>
                  <span>50x</span>
                </div>
              </article>

              <article className="flex flex-col items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-lg text-cyan-300"
                  >
                    🔓
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Unlock Achievements &amp; Upgrades
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      Enable all milestones
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={unlockAll}
                  label="Unlock all achievements and upgrades"
                  onChange={() => setUnlockAll(!unlockAll)}
                />
              </article>

              <article className="flex flex-col items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-400/10 text-lg text-amber-300"
                  >
                    🔄
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Instant Prestige / Ascension
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      Apply an ascension boost
                    </p>
                  </div>
                </div>
                <button
                  aria-pressed={prestigeBoost}
                  className={`shrink-0 self-end rounded-full border px-3 py-1.5 text-[10px] font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:self-auto ${prestigeBoost ? "border-amber-300/40 bg-amber-400 text-zinc-950" : "border-amber-400/20 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20"}`}
                  onClick={() => setPrestigeBoost(!prestigeBoost)}
                  type="button"
                >
                  {prestigeBoost ? "BOOST ON" : "BOOST"}
                </button>
              </article>
            </div>
          </section>
        </div>

        <section
          aria-labelledby="export-heading"
          className="mt-6 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950/35 via-zinc-900 to-zinc-900 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-extrabold text-cyan-300">
                03
              </span>
              <div>
                <p className="mb-1 text-[10px] font-extrabold text-cyan-300">
                  EXPORT
                </p>
                <h2
                  className="text-xl font-extrabold text-white"
                  id="export-heading"
                >
                  Ready to generate?
                </h2>
                <p className="mb-0 mt-1 max-w-2xl text-sm leading-6 text-zinc-400">
                  Your save string stays in this browser. The generated JSON is
                  a local modifier preview, not an importable Cookie Clicker
                  save.
                </p>
              </div>
            </div>
            <button
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 text-sm font-extrabold text-white shadow-[0_10px_30px_-12px_rgba(14,165,233,0.75)] transition hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              onClick={generateModdedSave}
              type="button"
            >
              GENERATE MODDED SAVE <span aria-hidden="true">→</span>
            </button>
          </div>

          {message && (
            <p
              className={`mt-4 text-sm ${messageIsError ? "text-amber-300" : "text-cyan-300"}`}
              role={messageIsError ? "alert" : "status"}
            >
              {message}
            </p>
          )}

          {generatedString && (
            <div className="mt-5 border-t border-zinc-700/70 pt-5">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Generated modifier preview
                  </h3>
                  <p className="mb-0 mt-1 text-xs text-zinc-500">
                    JSON payload · not a game-import string
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    className="min-h-9 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-xs font-bold text-zinc-200 transition hover:border-cyan-500/50 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-cyan-400"
                    onClick={copyGeneratedString}
                    type="button"
                  >
                    Copy Modded String
                  </button>
                  <button
                    className="min-h-9 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-xs font-bold text-zinc-200 transition hover:border-cyan-500/50 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-cyan-400"
                    onClick={downloadGeneratedString}
                    type="button"
                  >
                    Download Modified Save (.txt)
                  </button>
                </div>
              </div>
              <textarea
                aria-label="Generated modifier payload preview"
                className="min-h-52 w-full resize-y rounded-xl border border-zinc-700 bg-zinc-950 p-4 font-mono text-xs leading-6 text-zinc-300 outline-none focus:border-cyan-500"
                readOnly
                value={generatedString}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default CookieClickerEditor;
