interface Order {
  id: string;
  amt: number[];
  rarity: number[];
  sharp: number[];
}

interface Gear {
  id: string;
  hpRatio?: number;
  powRatio?: number;
  qty: number;
  rarity: number;
  rune: number;
  sharp: number;
}

export interface SaveData {
  h: { heroes: { gearSlots: { gear?: Gear }[] }[] };
  i: Gear[];
  r: { id: string; craftCount: number; owned: boolean; museum: boolean[][] }[];
  rs: { id: string; amt: number }[];
  ac: {
    totalGoldEarned: number;
    epicsCrafted: number;
    greatsCrafted: number;
    goodsCrafted: number;
    commonsCrafted: number;
    totalItemsCrafted: number;
  };
  me: { orders: Order[] };
}

export const update = (input: SaveData) => {
  const maxRes = 4000;
  const topRarity = 3;
  const topSharp = 10;
  const topQty = 15;

  const data = structuredClone(input);

  data.me.orders.forEach((order) => {
    data.r.find((r) => r.id === order.id)!.craftCount +=
      order.amt.reduce((acc, curr) => acc + curr, 0) +
      topQty +
      Math.floor(Math.random() * 400);
    console.log(data.r.find((r) => r.id === order.id));
  });

  data.i = [
    ...data.i,
    ...data.me.orders.flatMap((order) => {
      const ret = order.amt.map((amt, ind) => ({
        ...order,
        rarity: order.rarity[ind],
        sharp: order.sharp[ind],
        qty: amt,
        rune: 0,
      }));

      ret.push({
        ...order,
        rarity: topRarity,
        sharp: topSharp,
        qty: topQty,
        rune: 0,
      });

      return ret;
    }),
  ];

  data.rs.forEach(
    (rs, ind) => (rs.amt = ind === 0 || rs.amt === 0 ? rs.amt : maxRes),
  );

  data.h.heroes.forEach((h) => {
    h.gearSlots.forEach((g, ind) => {
      if (g && g.gear && ind < 6) {
        g.gear.sharp = topSharp;
      }
    });
  });

  return data;
};

export const generateMuseum = (input: SaveData, itemId: string) => {
  const data = structuredClone(input);
  const rarities = [3, 2, 1, 0];
  const sharps = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  rarities.forEach((rarity) =>
    sharps.forEach((sharp) =>
      data.i.push({
        id: itemId,
        rarity,
        sharp,
        powRatio: 3,
        hpRatio: 0,
        rune: 0,
        qty: 1,
      }),
    ),
  );
  data.ac.epicsCrafted += sharps.length;
  data.ac.greatsCrafted += sharps.length;
  data.ac.goodsCrafted += sharps.length;
  data.ac.commonsCrafted += sharps.length;
  data.ac.totalItemsCrafted += sharps.length * rarities.length;
  data.r.find((r) => r.id === itemId)!.craftCount +=
    sharps.length * rarities.length;

  // Implement the logic for generating the museum here

  return data;
};
