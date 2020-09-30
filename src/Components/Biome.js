import React from "react"
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

import biomeList from "./data/json/biome.json";
import corrupt from "./data/images/biomes/Corruption.png";
import crimson from "./data/images/biomes/Crimson.png";
import desert from "./data/images/biomes/Desert.png";
import dungeon from "./data/images/biomes/Dungeon.png";
import hallow from "./data/images/biomes/Hallow.png";
import jungle from "./data/images/biomes/Jungle.png";
import mushroom from "./data/images/biomes/Mushroom.png";
import ocean from "./data/images/biomes/Ocean.png";
import snow from "./data/images/biomes/Snow.png";
import forest from "./data/images/biomes/Surface.png";
import under from "./data/images/biomes/Underground.png";

export default function Biome(props) {
  const curBiome = props.biome;
  const biomeRows = [];
  biomeList.forEach((biome) => {
    const biomeImage =
      biome.type === "Dungeon"
        ? dungeon
        : biome.type === "Corruption"
        ? corrupt
        : biome.type === "Crimson"
        ? crimson
        : biome.type === "Mushroom"
        ? mushroom
        : biome.type === "Hallow"
        ? hallow
        : biome.type === "Jungle"
        ? jungle
        : biome.type === "Snow"
        ? snow
        : biome.type === "Ocean"
        ? ocean
        : biome.type === "Desert"
        ? desert
        : biome.type === "Underground"
        ? under
        : forest;
    biomeRows.push(
      <MenuItem value={biome.type} key={biome.priority}>
        <img src={biomeImage} alt=""></img>
        {biome.type}
      </MenuItem>
    );
  });
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="biome-select">Biome</InputLabel>
      <Select
        value={curBiome}
        onChange={(biome) =>
          props.onBiomeChange(props.id, biome.target.value, props.npc)
        }
        label="Biome"
        inputProps={{
          name: "biome",
          id: "biome-select",
        }}
      >
        {biomeRows}
      </Select>
    </FormControl>
  );
}