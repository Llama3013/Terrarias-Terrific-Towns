import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
  makeStyles,
  Tooltip,
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
  const { npcType, npcId, price } = props.npc;
  const pricePercent = Math.round(price * 100);
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
            <IconButton onClick={() => props.delNPC(props.townId, npcId)}>
              <Delete />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <Typography>Price Modifier: {pricePercent}%</Typography>
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
      </CardContent>
    </Card>
  );
}
