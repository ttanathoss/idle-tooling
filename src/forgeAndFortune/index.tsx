import { useState, useEffect, useMemo, type ChangeEvent } from "react";
import debounce from "lodash.debounce";
import classnames from "classnames";

import { update, generateMuseum, type SaveData } from "./update.ts";

const TabsMap = {
  OldUpdate: "Old Update",
  GenerateMuseum: "Generate Museum",
} as const;

const ForgeAndFortune = () => {
  const [updating, setUpdating] = useState(false);
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<
    (typeof TabsMap)[keyof typeof TabsMap]
  >(TabsMap.OldUpdate);
  const [itemId, setItemId] = useState("");

  const runUpdate = useMemo(
    () =>
      debounce(
        (
          value: string,
          tab: (typeof TabsMap)[keyof typeof TabsMap],
          id: string,
        ) => {
          try {
            const jsonData = JSON.parse(value) as SaveData;
            const ret =
              tab === TabsMap.OldUpdate
                ? update(jsonData)
                : generateMuseum(jsonData, id);
            setOutput(JSON.stringify(ret));
            setError("");
          } catch {
            setOutput("");
            setError(
              "Could not process this save. Check that the JSON is valid.",
            );
          } finally {
            setUpdating(false);
          }
        },
        375,
      ),
    [],
  );

  const scheduleUpdate = (
    value: string,
    tab: (typeof TabsMap)[keyof typeof TabsMap],
    id: string,
  ) => {
    if (!value || (!id && tab === TabsMap.GenerateMuseum)) {
      runUpdate.cancel();
      setUpdating(false);
      setError("");
      return;
    }

    setUpdating(true);
    setError("");
    runUpdate(value, tab, id);
  };

  useEffect(() => () => runUpdate.cancel(), [runUpdate]);

  const changeHandler = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(value);
    scheduleUpdate(value, activeTab, itemId);
  };
  const changeItemId = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setItemId(value);
    scheduleUpdate(input, activeTab, value);
  };
  const useOutputAsInput = () => {
    setInput(output);
    scheduleUpdate(output, activeTab, itemId);
  };
  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const itemIds = useMemo(() => {
    try {
      const data = JSON.parse(input) as SaveData;
      return (
        data.r
          ?.filter((r) => r.owned)
          .map((r) => ({
            id: r.id,
            museumCount: r.museum.reduce(
              (acc, curr) => acc + curr.filter((c) => c).length,
              0,
            ),
          })) ?? []
      );
    } catch {
      return [];
    }
  }, [input]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Cheat script for Forge &amp; Fortune online game
          </h1>
          <p className="text-slate-400">
            To make it work just paste save in input below, copy from output and
            import it in game
          </p>
        </header>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Select mode</h2>
          <ul className="flex gap-2">
            {Object.entries(TabsMap).map(([key, value]) => (
              <li key={key}>
                <button
                  onClick={() => {
                    setActiveTab(value);
                    scheduleUpdate(input, value, itemId);
                  }}
                  className={classnames(
                    "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    activeTab === value
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700",
                  )}
                >
                  {value}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Input</h2>
          <textarea
            value={input}
            onChange={changeHandler}
            className="h-40 w-full resize-y rounded-md border border-slate-700 bg-slate-800 p-3 font-mono text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          {error && (
            <p role="alert" className="text-sm text-rose-400">
              {error}
            </p>
          )}
        </div>

        {activeTab === TabsMap.GenerateMuseum && (
          <div className={classnames("space-y-2")}>
            <h2 className="text-lg font-semibold">Settings</h2>
            <div className="flex items-center justify-between gap-2">
              <select
                value={itemId}
                onChange={changeItemId}
                className="rounded-md border border-slate-700 bg-slate-800 p-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                {!itemId && <option value="" />}
                {itemIds.map(({ id, museumCount }) => (
                  <option key={id} value={id}>
                    {id} ({museumCount})
                  </option>
                ))}
              </select>
              <button
                onClick={useOutputAsInput}
                title="Copy output as input"
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
              >
                ↑
              </button>
            </div>
          </div>
        )}

        <div className="relative space-y-2">
          <div
            className={classnames(
              "absolute inset-0 z-10 flex items-center justify-center rounded-md bg-slate-900/60 transition-opacity",
              updating ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-indigo-500" />
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Output</h2>
            <div className="flex items-center gap-2">
              {copied && (
                <span className="text-sm font-medium text-green-400">
                  Copied!
                </span>
              )}
              <button
                onClick={copyOutput}
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
              >
                Copy
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={output}
            className="h-40 w-full resize-y rounded-md border border-slate-700 bg-slate-800 p-3 font-mono text-sm outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgeAndFortune;
