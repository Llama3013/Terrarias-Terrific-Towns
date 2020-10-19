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
  Tooltip,
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
  backgroundBubble: {
    backgroundColor: "rgba(123, 104, 238, 0.5)",
  },
  biome: { width: "fit-content" },
  expand: {
    backgroundColor: "rgba(123, 104, 238, 0.5)",
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    backgroundColor: "rgba(123, 104, 238, 0.5)",
    transform: "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  pylon: { width: "32px", height: "48px" },
  disabledPylon: { opacity: "0.5", width: "32px", height: "48px" },
}));

/**
 * 
 * @param {*} props
 */
export default function Town(props) {
  const { town } = props;
  const { townId, biome, name, pylonStatus } = town;
  //This checks which pylon image to use
  let pylon = "";
  if (pylonStatus) {
    pylon =
      biome === "Forest"
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
    pylon =
      biome === "Forest"
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
  //Hook setup for collapse menu, checkbox(which is disabled atm) and townName change
  const [expanded, setExpanded] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [townName, setTownName] = React.useState(name);
  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };
  //This opens the collapse menu when a npc is added
  const handleAddNPC = () => {
    setExpanded((prev) => {
      return prev ? prev : !prev;
    });
    return props.addNPC(townId);
  };
  const handleCheckedClick = () => {
    setChecked((prev) => !prev);
  };
  const classes = useStyles(props);
  //Checks for if the pylon can be activated
  const disabledPylon =
    town.npcs.length >= 2 &&
    biome !== "Dungeon" &&
    biome !== "Corruption" &&
    biome !== "Crimson"
      ? false
      : true;
  //This is stores the style of the pylon dependent on disabledPylon
  const disabledLook = disabledPylon ? classes.disabledPylon : classes.pylon;
  const pylonTooltip =
    pylonStatus && disabledPylon
      ? "Pylon placed but needs more npcs"
      : !pylonStatus && disabledPylon
      ? "Pylon not placed and needs more npcs"
      : pylonStatus && !disabledPylon
      ? "Pylon is active"
      : "Pylon is not placed and can be activated";
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
            value={townName}
            onChange={(e) => setTownName(e.target.value)}
            variant="filled"
            className={classes.backgroundBubble}
          />
        }
        action={
          <div>
            <Tooltip title={pylonTooltip}>
              <span>
                <IconButton
                  className={disabledLook}
                  disabled={disabledPylon}
                  onClick={() => props.pylonChange(townId, !pylonStatus)}
                >
                  <img
                    src={pylon}
                    alt="Biome pylon"
                    className={classes.pylon}
                  ></img>
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Delete House">
              <IconButton
                className={classes.backgroundBubble}
                onClick={() => props.delTown(townId)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
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
          disabled
          control={
            <Checkbox
              disabled
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
        <Button
          className={classes.backgroundBubble}
          onClick={handleAddNPC}
          variant="outlined"
        >
          Add NPC
        </Button>
        <Tooltip title="Show NPCs">
          <IconButton
            className={expanded ? classes.expandOpen : classes.expand}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <CardContent>
          {npcRows}
          <TextField
            disabled
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
