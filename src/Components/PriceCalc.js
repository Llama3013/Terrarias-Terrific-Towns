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

  /* Might add a input that allows the user to select other towns that maybe within
     25 to 120 tiles. So for now it is going to just check if there are more than 3
     npcs in the town */
  const npcAmount = town.npcs.length;
  if (npcAmount >= 4 && npcType !== "Princess") {
    for (let i = 3; i <= npcAmount; i++) {
      priceNotes += "*" + prices.extra;
      priceModifier *= prices.extra;
    }
  }

  if (priceModifier > 1.5) {
    return { price: 150, priceNotes: priceNotes };
  } else if (priceModifier < 0.75) {
    console.warn(
      "price modifier is " +
        priceModifier +
        ". This shouldn't be this low, probably calculation issue or is a princess."
    );
    return { price: 75, priceNotes: priceNotes };
  } else {
    /* This variablePrice element is used to show users the difference in price if 
       other npcs are within 120 tiles */
    let variablePrice;
    if (npcAmount <= 2 && npcType === "Princess") {
      variablePrice = priceModifier * 100;
      priceNotes += "*" + prices.despises;
      priceModifier = prices.despises;
    } else if (npcType === "Princess") {
      priceModifier = priceModifier * 100;
      return { price: priceModifier, priceNotes: priceNotes };
    } else {
      variablePrice = priceModifier * 0.95 * 100;
    }
    priceModifier = priceModifier * 100;
    priceModifier = Math.round(variablePrice) + "-" + Math.round(priceModifier);
    return { price: priceModifier, priceNotes: priceNotes };
  }
}
