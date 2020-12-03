import CorruptBack from "./data/images/biomes/Corruption_back_1.png";
import CrimBack from "./data/images/biomes/Crimson_back_1.png";
import DesertBack from "./data/images/biomes/Desert_back_1.png";
import DungeonBack from "./data/images/biomes/Dungeon_back_1.png";
import ForestBack from "./data/images/biomes/Forest_back_1.png";
import SnowBack from "./data/images/biomes/Snow_back_1.png";
import MushroomBack from "./data/images/biomes/Mushroom_back_1.png";
import HallowBack from "./data/images/biomes/Hallow_back_1.png";
import JungleBack from "./data/images/biomes/Jungle_back_1.png";
import OceanBack from "./data/images/biomes/Ocean_back_1.png";
import UnderBack from "./data/images/biomes/Underground_back_1.png";
import ForestPylon from "./data/images/biomes/Forest_Pylon.png";
import ForestPylonPlaced from "./data/images/biomes/Forest_Pylon_(placed).gif";
import SnowPylon from "./data/images/biomes/Snow_Pylon.png";
import SnowPylonPlaced from "./data/images/biomes/Snow_Pylon_(placed).gif";
import DesertPylon from "./data/images/biomes/Desert_Pylon.png";
import DesertPylonPlaced from "./data/images/biomes/Desert_Pylon_(placed).gif";
import CavernPylon from "./data/images/biomes/Cavern_Pylon.png";
import CavernPylonPlaced from "./data/images/biomes/Cavern_Pylon_(placed).gif";
import OceanPylon from "./data/images/biomes/Ocean_Pylon.png";
import OceanPylonPlaced from "./data/images/biomes/Ocean_Pylon_(placed).gif";
import JunglePylon from "./data/images/biomes/Jungle_Pylon.png";
import JunglePylonPlaced from "./data/images/biomes/Jungle_Pylon_(placed).gif";
import HallowPylon from "./data/images/biomes/Hallow_Pylon.png";
import HallowPylonPlaced from "./data/images/biomes/Hallow_Pylon_(placed).gif";
import MushroomPylon from "./data/images/biomes/Mushroom_Pylon.png";
import MushroomPylonPlaced from "./data/images/biomes/Mushroom_Pylon_(placed).gif";
import UniPylon from "./data/images/biomes/Universal_Pylon.png";
import UniPylonPlaced from "./data/images/biomes/Universal_Pylon_(placed).gif";

/**
 * This gets which background image to use based on the current biome
 * @param {*} biome The town's current biome
 */
export function getTownBackground(biome) {
  return biome === "Corruption"
    ? "url(" + CorruptBack + ")"
    : biome === "Crimson"
    ? "url(" + CrimBack + ")"
    : biome === "Desert"
    ? "url(" + DesertBack + ")"
    : biome === "Dungeon"
    ? "url(" + DungeonBack + ")"
    : biome === "Forest"
    ? "url(" + ForestBack + ")"
    : biome === "Mushroom"
    ? "url(" + MushroomBack + ")"
    : biome === "Hallow"
    ? "url(" + HallowBack + ")"
    : biome === "Jungle"
    ? "url(" + JungleBack + ")"
    : biome === "Ocean"
    ? "url(" + OceanBack + ")"
    : biome === "Snow"
    ? "url(" + SnowBack + ")"
    : biome === "Underground"
    ? "url(" + UnderBack + ")"
    : "none";
}

/**
 * This gets which pylon image to use based on the current biome and
 * whether it is placed in the town.
 * @param {*} biome The town's current biome
 * @param {*} pylonStatus Boolean value of whether the pylon has
 *            been placed in the town
 */
export function getPylonImage(biome, pylonStatus) {
  if (pylonStatus) {
    return biome === "Forest"
      ? ForestPylonPlaced
      : biome === "Snow"
      ? SnowPylonPlaced
      : biome === "Desert"
      ? DesertPylonPlaced
      : biome === "Underground"
      ? CavernPylonPlaced
      : biome === "Ocean"
      ? OceanPylonPlaced
      : biome === "Jungle"
      ? JunglePylonPlaced
      : biome === "Hallow"
      ? HallowPylonPlaced
      : biome === "Mushroom"
      ? MushroomPylonPlaced
      : UniPylonPlaced;
  } else {
    return biome === "Forest"
      ? ForestPylon
      : biome === "Snow"
      ? SnowPylon
      : biome === "Desert"
      ? DesertPylon
      : biome === "Underground"
      ? CavernPylon
      : biome === "Ocean"
      ? OceanPylon
      : biome === "Jungle"
      ? JunglePylon
      : biome === "Hallow"
      ? HallowPylon
      : biome === "Mushroom"
      ? MushroomPylon
      : UniPylon;
  }
}

/**
 * This gets which background image to use based on whether the multiBiome
 * switch is on and what multi biome is currently selected
 * @param {*} multiBiome The npc state of multiBiome
 * @param {*} multiBiomeSetting Boolean value of user's setting of multi biome
 */
export function getNPCBackground(multiBiome, multiBiomeSetting) {
  if (multiBiome.biomeSwitch && multiBiomeSetting) {
    return multiBiome.biomeSwitch === "Corruption"
      ? "url(" + CorruptBack + ")"
      : multiBiome.biomeSwitch === "Crimson"
      ? "url(" + CrimBack + ")"
      : multiBiome.biomeSwitch === "Desert"
      ? "url(" + DesertBack + ")"
      : multiBiome.biomeSwitch === "Dungeon"
      ? "url(" + DungeonBack + ")"
      : multiBiome.biomeSwitch === "Forest"
      ? "url(" + ForestBack + ")"
      : multiBiome.biomeSwitch === "Mushroom"
      ? "url(" + MushroomBack + ")"
      : multiBiome.biomeSwitch === "Hallow"
      ? "url(" + HallowBack + ")"
      : multiBiome.biomeSwitch === "Jungle"
      ? "url(" + JungleBack + ")"
      : multiBiome.biomeSwitch === "Ocean"
      ? "url(" + OceanBack + ")"
      : multiBiome.biomeSwitch === "Snow"
      ? "url(" + SnowBack + ")"
      : multiBiome.biomeSwitch === "Underground"
      ? "url(" + UnderBack + ")"
      : "none";
  } else {
    return "none";
  }
}
