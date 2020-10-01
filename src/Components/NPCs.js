import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import NPCType from "./NPCType";

export default function NPCs(props) {
  const delNPC = (npcId) => {
    return props.delNPC(props.houseId, npcId);
  };
  const onNPCChange = (npcId, newNpcType) => {
    return props.onNPCChange(props.houseId, npcId, newNpcType);
  };
  const { npcType, npcId, price } = props.npc;
  return (
    <Card variant="outlined">
      <CardContent>
        <NPCType
          delNPC={(npcId) => delNPC(npcId)}
          onNPCChange={(npcId, newNPCType) => onNPCChange(npcId, newNPCType)}
          npcType={npcType}
          npcId={npcId}
          key={npcId}
        ></NPCType>
        <Typography variant="h5" component="h2">
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => delNPC(npcId)}>
          Delete NPC
        </Button>
      </CardActions>
    </Card>
  );
}
