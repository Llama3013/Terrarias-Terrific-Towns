import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Card, CardActions, CardContent, Button, Typography } from "@material-ui/core";

import preferences from "./data/json/prefrences.json";
import iconAngler from "./data/images/npcs/Icon_Angler.png";
import iconArms from "./data/images/npcs/Icon_Arms_Dealer.png";
import iconCloth from "./data/images/npcs/Icon_Clothier.png";
import iconCyborg from "./data/images/npcs/Icon_Cyborg.png";
import iconDemol from "./data/images/npcs/Icon_Demolitionist.png";
import iconDryad from "./data/images/npcs/Icon_Dryad.png";
import iconDye from "./data/images/npcs/Icon_Dye_Trader.png";
import iconGoblin from "./data/images/npcs/Icon_Goblin_Tinkerer.png";
import iconGolfer from "./data/images/npcs/Icon_Golfer.png";
import iconGuide from "./data/images/npcs/Icon_Guide.png";
import iconMech from "./data/images/npcs/Icon_Mechanic.png";
import iconMerch from "./data/images/npcs/Icon_Merchant.png";
import iconNurse from "./data/images/npcs/Icon_Nurse.png";
import iconPainter from "./data/images/npcs/Icon_Painter.png";
import iconParty from "./data/images/npcs/Icon_Party_Girl.png";
import iconPirate from "./data/images/npcs/Icon_Pirate.png";
import iconSanta from "./data/images/npcs/Icon_Santa_Claus.png";
import iconSteam from "./data/images/npcs/Icon_Steampunker.png";
import iconStyl from "./data/images/npcs/Icon_Stylist.png";
import iconTavern from "./data/images/npcs/Icon_Tavernkeep.png";
import iconTax from "./data/images/npcs/Icon_Tax_Collector.png";
import iconTruf from "./data/images/npcs/Icon_Truffle.png";
import iconWitch from "./data/images/npcs/Icon_Witch_Doctor.png";
import iconWiz from "./data/images/npcs/Icon_Wizard.png";
import iconZool from "./data/images/npcs/Icon_Zoologist.png";

function NPCType(props) {
  const npc = props.npc;
  const npcRows = [];
  preferences.forEach((npcPref) => {
    const npcImage =
      npcPref.type === "Guide"
        ? iconGuide
        : npcPref.type === "Merchant"
        ? iconMerch
        : npcPref.type === "Zoologist"
        ? iconZool
        : npcPref.type === "Golfer"
        ? iconGolfer
        : npcPref.type === "Nurse"
        ? iconNurse
        : npcPref.type === "Tavernkeep"
        ? iconTavern
        : npcPref.type === "Party Girl"
        ? iconParty
        : npcPref.type === "Wizard"
        ? iconWiz
        : npcPref.type === "Demolitionist"
        ? iconDemol
        : npcPref.type === "Goblin Tinkerer"
        ? iconGoblin
        : npcPref.type === "Clothier"
        ? iconCloth
        : npcPref.type === "Dye Trader"
        ? iconDye
        : npcPref.type === "Arms Dealer"
        ? iconArms
        : npcPref.type === "Steampunker"
        ? iconSteam
        : npcPref.type === "Dryad"
        ? iconDryad
        : npcPref.type === "Painter"
        ? iconPainter
        : npcPref.type === "Witch Doctor"
        ? iconWitch
        : npcPref.type === "Stylist"
        ? iconStyl
        : npcPref.type === "Angler"
        ? iconAngler
        : npcPref.type === "Pirate"
        ? iconPirate
        : npcPref.type === "Mechanic"
        ? iconMech
        : npcPref.type === "Tax Collector"
        ? iconTax
        : npcPref.type === "Cyborg"
        ? iconCyborg
        : npcPref.type === "Santa Claus"
        ? iconSanta
        : iconTruf;
    npcRows.push(
      <MenuItem value={npcPref.type} key={npcPref.type}>
        <img src={npcImage} alt=""></img>
        {npcPref.type}
      </MenuItem>
    );
  });
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="npc-select">NPC</InputLabel>
      <Select
        value={npc.type}
        onChange={(npcType) => props.onNPCChange(npc.id, npcType.target.value)}
        label="NPC"
        inputProps={{
          name: "npc",
          id: "npc-select",
        }}
      >
        {npcRows}
      </Select>
    </FormControl>
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
