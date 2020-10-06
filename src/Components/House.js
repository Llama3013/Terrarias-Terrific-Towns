import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  CardHeader,
} from "@material-ui/core/";
import { ExpandMore, Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import NPCs from "./NPCs";
import Biome from "./Biome";
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

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: theme.spacing(1),
    height: "fit-content",
    backgroundSize: "cover",
    background: "no-repeat center",
    backgroundImage: (props) =>
      props.house.biome === "Corruption"
        ? "url(" + CorruptBack + ")"
        : props.house.biome === "Crimson"
        ? "url(" + CrimBack + ")"
        : props.house.biome === "Desert"
        ? "url(" + DesertBack + ")"
        : props.house.biome === "Dungeon"
        ? "url(" + DungeonBack + ")"
        : props.house.biome === "Mushroom"
        ? "url(" + MushroomBack + ")"
        : props.house.biome === "Hallow"
        ? "url(" + HallowBack + ")"
        : props.house.biome === "Jungle"
        ? "url(" + JungleBack + ")"
        : props.house.biome === "Ocean"
        ? "url(" + OceanBack + ")"
        : props.house.biome === "Snow"
        ? "url(" + SnowBack + ")"
        : props.house.biome === "Underground"
        ? "url(" + UnderBack + ")"
        : "url(" + ForestBack + ")",
  },
  biome: { width: "fit-content" },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default function House(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };
  const handleCheckedClick = () => {
    setChecked((prev) => !prev);
  };
  const { house } = props;
  const { houseId, biome, name } = house;
  const handleAddNPC = () => {
    setExpanded((prev) => {
      return prev ? prev : !prev;
    });
    return props.addNPC(houseId);
  };
  const classes = useStyles(props);
  const npcRows = [];
  house.npcs.forEach((npc) => {
    npcRows.push(
      <NPCs
        delNPC={(houseId, npcId) => props.delNPC(houseId, npcId)}
        onNPCChange={(houseId, npcId, newNPCType) =>
          props.onNPCChange(houseId, npcId, newNPCType)
        }
        npc={npc}
        houseId={houseId}
        key={npc.npcId}
      ></NPCs>
    );
  });
  return (
    <Card elevation={3} className={classes.root}>
      <CardHeader
        title={
          <TextField
            size="small"
            id="house-name"
            label="House Name"
            defaultValue={name}
            variant="outlined"
          />
        }
        action={
          <IconButton onClick={() => props.delHouse(houseId)}>
            <Delete />
          </IconButton>
        }
      />
      <CardContent>
        <Biome
          className={classes.biome}
          onBiomeChange={(houseId, biome) =>
            props.onBiomeChange(houseId, biome)
          }
          biome={biome}
          houseId={houseId}
          key={houseId}
        ></Biome>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheckedClick}
              name="link-checked"
              color="primary"
            />
          }
          label="Linked house"
        />
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" onClick={handleAddNPC} variant="outlined">
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
        <CardContent>
          {npcRows}
          <TextField
            size="medium"
            id="notes"
            label="notes"
            variant="outlined"
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
