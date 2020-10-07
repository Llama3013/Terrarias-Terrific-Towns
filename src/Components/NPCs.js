import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import preferences from "./data/json/prefrences.json";
import NPCType from "./NPCType";
import { Delete } from "@material-ui/icons";

export default function NPCs(props) {
  const delNPC = (npcId) => {
    return props.delNPC(props.townId, npcId);
  };
  const onNPCChange = (npcId, newNpcType) => {
    return props.onNPCChange(props.townId, npcId, newNpcType);
  };
  const { npcType, npcId, price } = props.npc;
  const npcPrefs = preferences.find(
    (preference) => preference.type === npcType
  );
  let loves = "😍-";
  npcPrefs.neighbour.loves.forEach((npc) => {
    loves += npc + ", ";
  });
  loves += npcPrefs.biome.loves;
  let likes = "👍-";
  npcPrefs.neighbour.likes.forEach((npc) => {
    likes += npc + ", ";
  });
  likes += npcPrefs.biome.likes;
  let dislikes = "👎-";
  npcPrefs.neighbour.dislikes.forEach((npc) => {
    dislikes += npc + ", ";
  });
  dislikes += npcPrefs.biome.dislikes;
  let hates = "😡-";
  npcPrefs.neighbour.hates.forEach((npc) => {
    hates += npc + ", ";
  });
  hates += npcPrefs.biome.hates;
  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <NPCType
            delNPC={(npcId) => delNPC(npcId)}
            onNPCChange={(npcId, newNPCType) => onNPCChange(npcId, newNPCType)}
            npcType={npcType}
            npcId={npcId}
            key={npcId}
          ></NPCType>
        }
        action={
          <IconButton onClick={() => delNPC(npcId)}>
            <Delete />
          </IconButton>
        }
      />
      <CardContent>
        <Typography>{price}</Typography>
        <Typography>{loves}</Typography>
        <Typography>{likes}</Typography>
        <Typography>{dislikes}</Typography>
        <Typography>{hates}</Typography>
      </CardContent>
    </Card>
  );
}
