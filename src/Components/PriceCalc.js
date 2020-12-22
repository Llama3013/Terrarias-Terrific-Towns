import preferences from "./data/json/prefrences.json";
import prices from "./data/json/prices.json";

/**
 * This is probably confusing and probably needs a rework.
 * This checks the current npc's price modifier by checking
 * if they have a preference in their current biome and if they
 * have a preference on what npcs are in the same area as them
 * @param {*} town The current town that is being calculated
 * @param {*} npcType The current npc type which will have likes and dislikes
 * @param {*} biome The current biome used for calculation (could be using
 *            town's biome or npc specfic biome multi biome)
 */
export default function priceCalc(town, npcType, biome, solitary) {
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

  /*If the npc is in any of these biomes they instantly have a price modifier of 150%*/
  if (biome === "Dungeon" || biome === "Corruption" || biome === "Crimson") {
    priceNotes += "*" + prices.despises + "=" + prices.despises;
    priceModifier *= prices.despises;
    priceModifier *= 100;
    return { price: priceModifier, priceNotes: priceNotes };
  }

  priceModifier *=
    biome === npcPrefs.biome.loves
      ? prices.loves
      : biome === npcPrefs.biome.likes
      ? prices.likes
      : biome === npcPrefs.biome.dislikes
      ? prices.dislikes
      : biome === npcPrefs.biome.hates
      ? prices.hates
      : 1;
  //console.log("biome calc: " + priceModifier);

  priceNotes +=
    biome === npcPrefs.biome.loves
      ? "*" + prices.loves
      : biome === npcPrefs.biome.likes
      ? "*" + prices.likes
      : biome === npcPrefs.biome.dislikes
      ? "*" + prices.dislikes
      : biome === npcPrefs.biome.hates
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
    //console.log("npc likes: " + priceModifier);
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
  //console.log("extra npcs: " + priceModifier);

  let variablePrice;
  if (npcType === "Princess") {
    if (npcAmount <= 2 && solitary) {
      priceNotes = prices.despises;
      priceModifier = prices.despises;
    } else if (npcAmount <= 2) {
      variablePrice = priceModifier;
      priceNotes += "*" + prices.despises;
      priceModifier = prices.despises;
    }
    /* This variablePrice element is used to show users the difference in price if 
       other npcs are within 120 tiles */
  } else if (solitary) {
    priceModifier *= 0.95;
    priceNotes += "*" + prices.solitary;
  } else {
    variablePrice = priceModifier * 0.95;
  }
  priceModifier = checkLimits(priceModifier);
  if (variablePrice) {
    variablePrice = checkLimits(variablePrice);
    priceModifier *= 100;
    variablePrice *= 100;
    priceModifier = Math.round(variablePrice) + "-" + Math.round(priceModifier);
  } else {
    priceModifier *= 100;
    priceModifier = Math.round(priceModifier);
  }
  return { price: priceModifier, priceNotes: priceNotes };
}

function checkLimits(price) {
  if (price > 1.5) {
    return 1.5;
  } else if (price < 0.75) {
    return 0.75;
  } else {
    return price;
  }
}
