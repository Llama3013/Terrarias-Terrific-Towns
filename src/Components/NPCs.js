import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
  makeStyles,
  Tooltip,
  Paper,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import preferences from "./data/json/prefrences.json";
import NPCType from "./NPCType";
import {
  Delete,
  Mood,
  MoodBad,
  SentimentDissatisfied,
  SentimentSatisfied,
} from "@material-ui/icons";
import Biome from "./Biome";
import { getNPCBackground } from "./Images";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 225,
    margin: theme.spacing(0),
    height: "fit-content",
    backgroundSize: "cover",
    background: "no-repeat center",
    backgroundImage: (props) =>
      getNPCBackground(props.npc.multiBiome, props.settings.multiBiome),
  },
  typo: {
    textAlign: "left",
  },
  backgroundBubble: {
    backgroundColor: "rgba(123, 104, 238, 0.5)",
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
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  npcHeader: { "& .MuiCardHeader-action": { alignSelf: "center" } },
}));

/**
 * This function represents a NPC card. It finds out what
 * the current npc's likes/dislikes and displays the
 * happiness and likes/dislikes information.
 * @param {*} props
 */
export default function NPCs(props) {
  const npcChange = (npcId, newNpcType) => {
    return props.npcChange(props.townId, npcId, newNpcType);
  };
  const { npc, npcCount, settings } = props;
  const { npcType, npcId, price, priceNotes, multiBiome } = npc;
  const npcPrefs = preferences.find(
    (preference) => preference.type === npcType
  );
  let loves = ": ";
  npcPrefs.neighbour.loves.forEach((npc) => {
    loves += npc + ", ";
  });
  loves += npcPrefs.biome.loves;
  let likes = ": ";
  npcPrefs.neighbour.likes.forEach((npc) => {
    likes += npc + ", ";
  });
  likes += npcPrefs.biome.likes;
  let dislikes = ": ";
  npcPrefs.neighbour.dislikes.forEach((npc) => {
    dislikes += npc + ", ";
  });
  dislikes += npcPrefs.biome.dislikes;
  let hates = ": ";
  npcPrefs.neighbour.hates.forEach((npc) => {
    hates += npc + ", ";
  });
  hates += npcPrefs.biome.hates;
  const classes = useStyles(props);
  const [biomeSwitch, setBiomeSwitch] = React.useState(false);

  const multiBiomeToggle = () => {
    props.multiBiomeSwitch(npcId, !biomeSwitch);
    setBiomeSwitch((prev) => !prev);
  };

  //May replace with display="none" once I overhaul the styles
  const multiBiomeSelect = biomeSwitch ? (
    <Biome
      multiBiomeChange={(npcId, biome) => props.multiBiomeChange(npcId, biome)}
      biome={multiBiome.type}
      isTown={false}
      id={npcId}
      key={npcId}
    ></Biome>
  ) : null;

  //May replace with display="none" once I overhaul the styles
  const multiBiomeSwitch = settings.multiBiome ? (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={biomeSwitch}
            onChange={multiBiomeToggle}
            name="multi-biome-switch"
          />
        }
        label="Multi biome"
      />
      {multiBiomeSelect}
    </FormGroup>
  ) : null;

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader
        disableTypography={true}
        className={classes.npcHeader}
        title={
          <div>
            <NPCType
              npcChange={(npcId, newNPCType) => npcChange(npcId, newNPCType)}
              npcCount={npcCount}
              npcType={npcType}
              npcId={npcId}
              key={npcId}
            ></NPCType>
            {multiBiomeSwitch}
          </div>
        }
        action={
          <Tooltip title="Delete NPC">
            <IconButton
              className={classes.backgroundBubble}
              onClick={() => props.delNPC(props.townId, npcId)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <Paper variant="outlined" className={classes.backgroundBubble}>
          <Tooltip title={priceNotes}>
            <Typography>Price Modifier: {price}%</Typography>
          </Tooltip>
          <Tooltip title="Loves">
            <Typography className={classes.typo}>
              <Mood />
              {loves}
            </Typography>
          </Tooltip>
          <Tooltip title="Likes">
            <Typography className={classes.typo}>
              <SentimentSatisfied />
              {likes}
            </Typography>
          </Tooltip>
          <Tooltip title="Dislikes">
            <Typography className={classes.typo}>
              <SentimentDissatisfied />
              {dislikes}
            </Typography>
          </Tooltip>
          <Tooltip title="Hates">
            <Typography className={classes.typo}>
              <MoodBad />
              {hates}
            </Typography>
          </Tooltip>
        </Paper>
      </CardContent>
    </Card>
  );
}
