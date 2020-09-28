import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core/";
import { ExpandMore } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles";
import NPCs from "./NPCs";

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

function Biome(props) {
  const curBiome = props.house.biome;
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
          props.onBiomeChange(props.house.id, biome.target.value)
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

export default function House(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
      margin: theme.spacing(1),
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
  }));
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };
  const house = props.house;
  const handleAddNPC = () => {
    setExpanded((prev) => {
      return prev ? prev : !prev;
    });
    return props.addNPC(house.id);
  };
  const classes = useStyles();
  const npcRows = [];
  house.npcs.forEach((npc) => {
    npcRows.push(
      <NPCs
        delNPC={(houseId, npcId) => props.delNPC(houseId, npcId)}
        onNPCChange={(houseId, npcId, npc) =>
          props.onNPCChange(houseId, npcId, npc)
        }
        npc={npc}
        houseId={house.id}
        key={npc.id}
      ></NPCs>
    );
  });
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          <TextField
            size="small"
            id="house-name"
            label="House Name"
            defaultValue={house.name}
            variant="outlined"
          />
        </Typography>
        <Typography variant="h5" component="h2">
          <Biome
            onBiomeChange={(houseId, biome) =>
              props.onBiomeChange(houseId, biome)
            }
            house={house}
          ></Biome>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.delHouse(house.id)}>
          Delete House
        </Button>
        <Button size="small" onClick={handleAddNPC}>
          Add NPC
        </Button>
        <IconButton
          className={expanded ? classes.expandOpen : classes.expand}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <CardContent>{npcRows}</CardContent>
      </Collapse>
    </Card>
  );
}
