import React from "react";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Tooltip,
} from "@material-ui/core";

import biomeList from "./data/json/biome.json";
import corrupt from "./data/images/biomes/Corruption_icon.png";
import crimson from "./data/images/biomes/Crimson_icon.png";
import desert from "./data/images/biomes/Desert_icon.png";
import dungeon from "./data/images/biomes/Dungeon_icon.png";
import forest from "./data/images/biomes/Forest_icon.png";
import hallow from "./data/images/biomes/Hallow_icon.png";
import jungle from "./data/images/biomes/Jungle_icon.png";
import mushroom from "./data/images/biomes/Mushroom_icon.png";
import ocean from "./data/images/biomes/Ocean_icon.png";
import snow from "./data/images/biomes/Snow_icon.png";
import under from "./data/images/biomes/Underground_icon.png";

const useStyles = makeStyles(() => ({
  backgroundBubble: {
    backgroundColor: "rgba(123, 104, 238, 0.5)",
  },
  biomeIcon: { width: "24px", height: "24px" },
}));

export default function Biome(props) {
  const classes = useStyles();
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
        <img src={biomeImage} alt="" className={classes.biomeIcon}></img>
        {biome.type}
      </MenuItem>
    );
  });
  const curBiome = props.biome;
  const { townId } = props;
  return (
    <FormControl variant="filled" >
      <InputLabel htmlFor="biome-select">Biome</InputLabel>
      <Tooltip title="Select Biome">
        <Select className={classes.backgroundBubble}
          value={curBiome}
          onChange={(biome) => props.onBiomeChange(townId, biome.target.value)}
          label="Biome"
          inputProps={{
            name: "biome",
            id: "biome-select",
          }}
        >
          {biomeRows}
        </Select>
      </Tooltip>
    </FormControl>
  );
}