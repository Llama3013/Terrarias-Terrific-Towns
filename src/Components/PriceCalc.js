import preferences from "./data/json/prefrences.json";
import prices from "./data/json/prices.json";

/**
 * This is probably confusing and probably needs a rework.
 * This checks the current npc's price modifier by checking
 * if they have a preference in their current biome and if they
 * have a preference on what npcs are in the same area as them
 * @param {*} towns This is the state of the towns
 * @param {*} townIndex This is the index of the current town
 * @param {*} npcIndex This is the index of the current npc
 */
export default function priceCalc(town, npcType) {
  let priceModifier = 1;
  let priceNotes = "1";
  let npcPrefs = preferences.find((preference) => preference.type === npcType);
  if (npcPrefs === undefined) {
    console.warn("npcPref for " + npcType + " is " + npcPrefs);
    npcPrefs = {
      type: npcType,
      biome: { loves: "", likes: "", dislikes: "", hates: "" },
      neighbour: {
        loves: [],
        likes: [],
        dislikes: [],
        hates: [],
      },
    };
  }

  //If the npc is in any of these biomes they instantly have a price modifier of 150%
  const townBiome = town.biome;
  if (
    townBiome === "Dungeon" ||
    townBiome === "Corruption" ||
    townBiome === "Crimson"
  ) {
    priceNotes += "*" + prices.despises + "=" + prices.despises;
    priceModifier *= prices.despises;
    priceModifier *= 100;
    return { price: priceModifier, priceNotes: priceNotes };
  }

  //Still need to add a checkbox or something for if more than 3 npcs
  //are within 240 blocks (not including the NPC's within 50 tiles)
  //So for now it is going to just check if there are only 2 npcs in the town
  const npcAmount = town.npcs.length;
  if (npcAmount <= 2 && npcType !== "Princess") {
    priceNotes += "*" + prices.couple;
    priceModifier *= prices.couple;
  } else if (npcAmount === 1 && npcType === "Princess") {
    priceNotes += "*" + prices.hates;
    priceModifier *= prices.hates;
  } else if (npcAmount >= 3 && npcType !== "Princess") {
    for (let i = 3; i <= npcAmount; i++) {
      priceNotes += "*" + prices.extra;
      priceModifier *= prices.extra;
    }
  } else if (npcAmount >= 3 && npcType === "Princess") {
    priceNotes += "*" + prices.loves;
    priceModifier *= prices.loves;
  }

  priceModifier *=
    townBiome === npcPrefs.biome.loves
      ? prices.loves
      : townBiome === npcPrefs.biome.likes
      ? prices.likes
      : townBiome === npcPrefs.biome.dislikes
      ? prices.dislikes
      : townBiome === npcPrefs.biome.hates
      ? prices.hates
      : 1;

  priceNotes +=
    townBiome === npcPrefs.biome.loves
      ? "*" + prices.loves
      : townBiome === npcPrefs.biome.likes
      ? "*" + prices.likes
      : townBiome === npcPrefs.biome.dislikes
      ? "*" + prices.dislikes
      : townBiome === npcPrefs.biome.hates
      ? "*" + prices.hates
      : "";

  town.npcs.forEach((npc) => {
    if (npc.npcType !== npcType) {
      priceModifier *= npcPrefs.neighbour.loves.includes(npc.npcType)
        ? prices.loves
        : npcPrefs.neighbour.likes.includes(npc.npcType)
        ? prices.likes
        : npcPrefs.neighbour.dislikes.includes(npc.npcType)
        ? prices.dislikes
        : npcPrefs.neighbour.hates.includes(npc.npcType)
        ? prices.hates
        : 1;
      priceNotes += npcPrefs.neighbour.loves.includes(npc.npcType)
        ? "*" + prices.loves
        : npcPrefs.neighbour.likes.includes(npc.npcType)
        ? "*" + prices.likes
        : npcPrefs.neighbour.dislikes.includes(npc.npcType)
        ? "*" + prices.dislikes
        : npcPrefs.neighbour.hates.includes(npc.npcType)
        ? "*" + prices.hates
        : "";
    }
  });

  priceNotes += "=" + priceModifier.toFixed(2);
  priceModifier = roundFive(priceModifier);
  priceModifier = Math.round(priceModifier * 100);
  if (priceModifier >= 150) {
    return { price: 150, priceNotes: priceNotes };
  } else if (priceModifier <= 75) {
    console.warn(
      "price modifier is " +
        priceModifier +
        ". This shouldn't be this low, probably calculation issue or is a princess."
    );
    return { price: 75, priceNotes: priceNotes };
  } else {
    priceModifier =
      npcAmount >= 3 ? priceModifier - 5 + "-" + priceModifier : priceModifier;
    return { price: priceModifier, priceNotes: priceNotes };
  }
}

/**
 * This rounds the prices to the correct 5% interval
 * @param {*} num
 */
function roundFive(num) {
  return Math.round(num * 20) / 20;
}
