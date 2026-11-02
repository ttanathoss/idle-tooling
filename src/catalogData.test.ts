import { describe, expect, it } from "vitest";
import {
  categories,
  games,
  getVisibleGames,
  liveToolCount,
} from "./catalogData.ts";

describe("shared version catalog", () => {
  it("uses the same six games, categories, and available tools", () => {
    expect(categories).toEqual(["Clicker", "RPG", "Automation", "Tycoon"]);
    expect(games.map((game) => game.title)).toEqual([
      "Forge & Fortune",
      "Clicker Heroes",
      "Realm Grinder",
      "Cookie Clicker",
      "Melvor Idle",
      "Idle Champions",
    ]);
    expect(liveToolCount).toBe(2);
    expect(
      games
        .filter((game) => game.editorUrl)
        .map(({ title, editorUrl }) => ({ title, editorUrl })),
    ).toEqual([
      { title: "Forge & Fortune", editorUrl: "/forgeandfortune" },
      { title: "Cookie Clicker", editorUrl: "/v-cyan/cookie-clicker" },
    ]);
  });

  it("uses shared filtering and ordering", () => {
    expect(
      getVisibleGames("", "All", "featured").map((game) => game.title),
    ).toEqual([
      "Forge & Fortune",
      "Clicker Heroes",
      "Cookie Clicker",
      "Melvor Idle",
      "Realm Grinder",
      "Idle Champions",
    ]);
    expect(
      getVisibleGames("", "Tycoon", "alphabetical").map((game) => game.title),
    ).toEqual(["Forge & Fortune", "Realm Grinder"]);
  });
});
