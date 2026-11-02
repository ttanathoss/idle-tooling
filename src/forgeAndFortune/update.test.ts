import { afterEach, describe, expect, it, vi } from "vitest";
import { generateMuseum, update, type SaveData } from "./update";

const createSaveData = (): SaveData => ({
  h: {
    heroes: [
      {
        gearSlots: [
          { gear: { id: "equipped", qty: 1, rarity: 0, rune: 0, sharp: 2 } },
          {},
          {},
          {},
          {},
          {},
          { gear: { id: "overflow", qty: 1, rarity: 0, rune: 0, sharp: 3 } },
        ],
      },
    ],
  },
  i: [{ id: "existing", qty: 1, rarity: 0, rune: 0, sharp: 0 }],
  r: [{ id: "forge", craftCount: 0, owned: true, museum: [] }],
  rs: [
    { id: "gold", amt: 25 },
    { id: "empty", amt: 0 },
    { id: "wood", amt: 4 },
  ],
  ac: {
    totalGoldEarned: 0,
    epicsCrafted: 0,
    greatsCrafted: 0,
    goodsCrafted: 0,
    commonsCrafted: 0,
    totalItemsCrafted: 0,
  },
  me: {
    orders: [{ id: "forge", amt: [2, 3], rarity: [1, 2], sharp: [2, 3] }],
  },
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("update", () => {
  it("returns a modified clone and preserves unrelated save data", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const input = createSaveData();
    const original = structuredClone(input);

    const result = update(input);

    expect(result).not.toBe(input);
    expect(input).toEqual(original);
    expect(result.i).toHaveLength(4);
    expect(result.r[0].craftCount).toBe(220);
    expect(result.rs.map(({ amt }) => amt)).toEqual([25, 0, 4000]);
    expect(result.h.heroes[0].gearSlots[0].gear?.sharp).toBe(10);
    expect(result.h.heroes[0].gearSlots[6].gear?.sharp).toBe(3);
  });
});

describe("generateMuseum", () => {
  it("generates every rarity and sharp combination without mutating input", () => {
    const input = createSaveData();
    const original = structuredClone(input);

    const result = generateMuseum(input, "forge");
    const generatedItems = result.i.filter(({ id }) => id === "forge");

    expect(result).not.toBe(input);
    expect(input).toEqual(original);
    expect(result.i[0]).toEqual(input.i[0]);
    expect(generatedItems).toHaveLength(44);
    expect(new Set(generatedItems.map(({ rarity }) => rarity))).toEqual(
      new Set([0, 1, 2, 3]),
    );
    expect(new Set(generatedItems.map(({ sharp }) => sharp))).toEqual(
      new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    );
    expect(
      generatedItems.every(
        ({ qty, rune, hpRatio, powRatio }) =>
          qty === 1 && rune === 0 && hpRatio === 0 && powRatio === 3,
      ),
    ).toBe(true);
    expect(result.ac).toEqual({
      totalGoldEarned: 0,
      epicsCrafted: 11,
      greatsCrafted: 11,
      goodsCrafted: 11,
      commonsCrafted: 11,
      totalItemsCrafted: 44,
    });
    expect(result.r[0].craftCount).toBe(44);
  });
});
