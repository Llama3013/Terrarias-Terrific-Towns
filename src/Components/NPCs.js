import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import preferences from "./data/json/prefrences.json";

function NPCType(props) {
  const npc = props.npc;
  const npcRows = [];
  preferences.forEach((npcPref) => {
    npcRows.push(<option key={npcPref.type}>{npcPref.type}</option>);
  });
  return (
    <select
      value={npc.type}
      onChange={(npcType) => props.onNPCChange(npc.id, npcType.target.value)}
    >
      {npcRows}
    </select>
  );
}

function Price(props) {
  const price = props.price;
  return <p>{price}</p>;
}

export default class NPCRow extends React.Component {
  onNPCChange(npcId, npc) {
    return this.props.onNPCChange(this.props.houseId, npcId, npc);
  }

  delNPC(npcId) {
    return this.props.delNPC(this.props.houseId, npcId);
  }

  render() {
    const npc = this.props.npc;
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            <NPCType
              delNPC={(npcId) => this.delNPC(npcId)}
              onNPCChange={(npcId, npc) => this.onNPCChange(npcId, npc)}
              key={npc.id}
              npc={npc}
            ></NPCType>
          </Typography>
          <Typography variant="h5" component="h2">
            <Price key={npc.id} price={npc.price}></Price>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => this.delNPC(npc.id)}>
            Delete NPC
          </Button>
        </CardActions>
      </Card>
    );
  }
}
