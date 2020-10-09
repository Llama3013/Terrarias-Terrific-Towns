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
import ForestPylon from "./data/images/biomes/Forest_Pylon.png";
import ForestPylonSelect from "./data/images/biomes/Forest_Pylon_(placed).gif";
import SnowPylon from "./data/images/biomes/Snow_Pylon.png";
import SnowPylonSelect from "./data/images/biomes/Snow_Pylon_(placed).gif";
import DesertPylon from "./data/images/biomes/Desert_Pylon.png";
import DesertPylonSelect from "./data/images/biomes/Desert_Pylon_(placed).gif";
import CavernPylon from "./data/images/biomes/Cavern_Pylon.png";
import CavernPylonSelect from "./data/images/biomes/Cavern_Pylon_(placed).gif";
import OceanPylon from "./data/images/biomes/Ocean_Pylon.png";
import OceanPylonSelect from "./data/images/biomes/Ocean_Pylon_(placed).gif";
import JunglePylon from "./data/images/biomes/Jungle_Pylon.png";
import JunglePylonSelect from "./data/images/biomes/Jungle_Pylon_(placed).gif";
import HallowPylon from "./data/images/biomes/Hallow_Pylon.png";
import HallowPylonSelect from "./data/images/biomes/Hallow_Pylon_(placed).gif";
import MushroomPylon from "./data/images/biomes/Mushroom_Pylon.png";
import MushroomPylonSelect from "./data/images/biomes/Mushroom_Pylon_(placed).gif";
import UniPylon from "./data/images/biomes/Universal_Pylon.png";
import UniPylonSelect from "./data/images/biomes/Universal_Pylon_(placed).gif";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: theme.spacing(1),
    height: "fit-content",
    backgroundSize: "cover",
    background: "no-repeat center",
    backgroundImage: (props) =>
      props.town.biome === "Corruption"
        ? "url(" + CorruptBack + ")"
        : props.town.biome === "Crimson"
        ? "url(" + CrimBack + ")"
        : props.town.biome === "Desert"
        ? "url(" + DesertBack + ")"
        : props.town.biome === "Dungeon"
        ? "url(" + DungeonBack + ")"
        : props.town.biome === "Mushroom"
        ? "url(" + MushroomBack + ")"
        : props.town.biome === "Hallow"
        ? "url(" + HallowBack + ")"
        : props.town.biome === "Jungle"
        ? "url(" + JungleBack + ")"
        : props.town.biome === "Ocean"
        ? "url(" + OceanBack + ")"
        : props.town.biome === "Snow"
        ? "url(" + SnowBack + ")"
        : props.town.biome === "Underground"
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
  pylon: { width: "32px", height: "48px" },
}));

export default function Town(props) {
  const { town } = props;
  const { townId, biome, name, pylonStatus } = town;
  const pylon = biome === "Forest"
  ? ForestPylon
  : biome === "Snow"
  ? SnowPylon
  : biome === "Desert"
  ? DesertPylon
  : biome === "Cavern"
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
  const pylonSelect = biome === "Forest"
  ? ForestPylonSelect
  : biome === "Snow"
  ? SnowPylonSelect
  : biome === "Desert"
  ? DesertPylonSelect
  : biome === "Cavern"
  ? CavernPylonSelect
  : biome === "Ocean"
  ? OceanPylonSelect
  : biome === "Jungle"
  ? JunglePylonSelect
  : biome === "Hallow"
  ? HallowPylonSelect
  : biome === "Mushroom"
  ? MushroomPylonSelect
  : UniPylonSelect;
  const [expanded, setExpanded] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };
  const handleCheckedClick = () => {
    setChecked((prev) => !prev);
  };
  const handleAddNPC = () => {
    setExpanded((prev) => {
      return prev ? prev : !prev;
    });
    return props.addNPC(townId);
  };
  const classes = useStyles(props);
  const showPylon =
    town.npcs.length >= 2 ? (
      <img
        src={pylonStatus ? pylonSelect : pylon}
        alt=""
        onClick={() => props.pylonChange(townId, !pylonStatus)}
        className={classes.pylon}
      ></img>
    ) : (
      ""
    );
  const npcRows = [];
  town.npcs.forEach((npc) => {
    npcRows.push(
      <NPCs
        delNPC={(townId, npcId) => props.delNPC(townId, npcId)}
        onNPCChange={(townId, npcId, newNPCType) =>
          props.onNPCChange(townId, npcId, newNPCType)
        }
        npc={npc}
        townId={townId}
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
            id="town-name"
            label="Town Name"
            defaultValue={name}
            variant="outlined"
          />
        }
        action={
          <div>
            {showPylon}
            <IconButton onClick={() => props.delTown(townId)}>
              <Delete />
            </IconButton>
          </div>
        }
      />
      <CardContent>
        <Biome
          className={classes.biome}
          onBiomeChange={(townId, biome) => props.onBiomeChange(townId, biome)}
          biome={biome}
          townId={townId}
          key={townId}
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
          label="Linked town"
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
