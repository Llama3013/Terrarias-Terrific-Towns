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

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 225,
    margin: theme.spacing(1),
    height: "fit-content",
    background: "no-repeat center",
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
}));

export default function NPCs(props) {
  const onNPCChange = (npcId, newNpcType) => {
    return props.onNPCChange(props.townId, npcId, newNpcType);
  };
  const { npcType, npcId, price, priceNotes } = props.npc;
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
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <NPCType
            onNPCChange={(npcId, newNPCType) => onNPCChange(npcId, newNPCType)}
            npcType={npcType}
            npcId={npcId}
            key={npcId}
          ></NPCType>
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
            <Typography>
              <Mood />
              {loves}
            </Typography>
          </Tooltip>
          <Tooltip title="Likes">
            <Typography>
              <SentimentSatisfied />
              {likes}
            </Typography>
          </Tooltip>
          <Tooltip title="Dislikes">
            <Typography>
              <SentimentDissatisfied />
              {dislikes}
            </Typography>
          </Tooltip>
          <Tooltip title="Hates">
            <Typography>
              <MoodBad />
              {hates}
            </Typography>
          </Tooltip>
        </Paper>
      </CardContent>
    </Card>
  );
}
