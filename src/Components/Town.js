import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Button,
  TextField,
  CardHeader,
  Tooltip,
} from "@material-ui/core/";
import { ExpandMore, Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import NPCs from "./NPCs";
import Biome from "./Biome";
import { getPylonImage, getTownBackground } from "./Images";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: theme.spacing(1),
    height: "fit-content",
    backgroundSize: "cover",
    background: "no-repeat center",
    backgroundImage: (props) => getTownBackground(props.town.biome),
    alignself: "center",
  },
  backgroundBubble: {
    backgroundColor: "rgba(123, 104, 238, 0.5)",
  },
  biome: { display: "flex", alignItems: "center" },
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
  pylon: { width: "32px", height: "48px", margin: theme.spacing(1) },
  disabledPylon: {
    opacity: "0.5",
    width: "32px",
    height: "48px",
    margin: theme.spacing(1),
  },
  notes: { display: "flex" },
}));

/**
 * This gets the details of the pylon used in the town. Gets the image,
 * whether it is disabled and what tooltip should be shown.
 * @param {*} townLength The length of the current town
 * @param {*} biome The biome the town is located
 * @param {*} pylonStatus A boolean value that shows whether the pylon is placed
 * @param {*} classes The styles needed for the pylons whether working or disabled
 */
function getPylon(townLength, biome, pylonStatus, classes) {
  const pylon = getPylonImage(biome, pylonStatus);
  //Checks for if the pylon can be activated
  const disabledPylon =
    townLength >= 2 &&
    biome !== "Dungeon" &&
    biome !== "Corruption" &&
    biome !== "Crimson"
      ? false
      : true;
  //This is stores the style of the pylon dependent on disabledPylon
  const disabledLook = disabledPylon ? classes.disabledPylon : classes.pylon;
  const pylonTooltip =
    biome === "Dungeon" || biome === "Corruption" || biome === "Crimson"
      ? "Pylon in bad biome (cannot be used)"
      : pylonStatus && disabledPylon
      ? "Pylon placed but needs more npcs"
      : !pylonStatus && disabledPylon
      ? "Pylon not placed and needs more npcs"
      : pylonStatus && !disabledPylon
      ? "Pylon is active"
      : "Pylon is not placed and can be activated";
  return { pylon, disabledPylon, disabledLook, pylonTooltip };
}

/**
 *
 * @param {*} props
 */
export default function Town(props) {
  const { npcCount, settings, town } = props;
  const { townId, name, biome, pylonStatus, notes } = town;
  //Hook setup for collapse menu, checkbox(which is disabled atm) and townName change
  const [expanded, setExpanded] = React.useState(false);
  const [townName, setTownName] = React.useState(name);
  const [notesData, setNotesData] = React.useState(notes)
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
  const multiBiomeSwitch = (npcId, multiBiome) => {
    return props.multiBiomeSwitch(townId, npcId, multiBiome);
  };
  const multiBiomeChange = (npcId, biome) => {
    return props.multiBiomeChange(townId, npcId, biome);
  };
  const classes = useStyles(props);
  const { pylon, disabledPylon, disabledLook, pylonTooltip } = getPylon(
    town.npcs.length,
    biome,
    pylonStatus,
    classes
  );
  const npcRows = [];
  town.npcs.forEach((npc) => {
    npcRows.push(
      <NPCs
        delNPC={(townId, npcId) => props.delNPC(townId, npcId)}
        npcChange={(townId, npcId, newNPCType) =>
          props.npcChange(townId, npcId, newNPCType)
        }
        multiBiomeSwitch={(npcId, on) => multiBiomeSwitch(npcId, on)}
        multiBiomeChange={(npcId, biome) => multiBiomeChange(npcId, biome)}
        npc={npc}
        townId={townId}
        npcCount={npcCount}
        settings={settings}
        key={npc.npcId}
      ></NPCs>
    );
  });

  const cardTitleId = "town-name-" + townId;
  const notesId = "notes-" + townId;

  //May replace with display="none" once I overhaul the styles
  const notesText = settings.notes ? (
    <TextField
      onChange={(e) => setNotesData(e.target.value)}
      multiline
      id={notesId}
      label="notes"
      variant="outlined"
      className={classes.notes}
    />
  ) : undefined;
  return (
    <Card elevation={3} className={classes.root}>
      <CardHeader
        title={
          <TextField
            size="small"
            id={cardTitleId}
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
          biomeChange={(townId, biome) => props.biomeChange(townId, biome)}
          biome={biome}
          isTown={true}
          id={townId}
          key={townId}
        ></Biome>
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
          {notesText}
        </CardContent>
      </Collapse>
    </Card>
  );
}
