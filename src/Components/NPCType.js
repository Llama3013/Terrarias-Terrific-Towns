import React from "react";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Tooltip,
} from "@material-ui/core";

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
import iconPrincess from "./data/images/npcs/Icon_Princess.png";
import iconSanta from "./data/images/npcs/Icon_Santa_Claus.png";
import iconSteam from "./data/images/npcs/Icon_Steampunker.png";
import iconStyl from "./data/images/npcs/Icon_Stylist.png";
import iconTavern from "./data/images/npcs/Icon_Tavernkeep.png";
import iconTax from "./data/images/npcs/Icon_Tax_Collector.png";
import iconTruf from "./data/images/npcs/Icon_Truffle.png";
import iconWitch from "./data/images/npcs/Icon_Witch_Doctor.png";
import iconWiz from "./data/images/npcs/Icon_Wizard.png";
import iconZool from "./data/images/npcs/Icon_Zoologist.png";

const useStyles = makeStyles(() => ({
  backgroundBubble: {
    backgroundColor: "rgba(123, 104, 238, 0.5)",
  },
  npcIcon: { width: "24px", height: "24px" },
}));

export default function NPCType(props) {
  const npcRows = [];
  const classes = useStyles();
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
        : npcPref.type === "Princess"
        ? iconPrincess
        : iconTruf;
    npcRows.push(
      <MenuItem value={npcPref.type} key={npcPref.type}>
        <img src={npcImage} alt="" className={classes.npcIcon}></img>
        {npcPref.type}
      </MenuItem>
    );
  });
  const { npcId, npcType } = props;
  return (
    <FormControl variant="filled">
      <InputLabel htmlFor="npc-select">NPC</InputLabel>
      <Tooltip title="Select NPC">
        <Select
          className={classes.backgroundBubble}
          value={npcType}
          onChange={(newNPCType) =>
            props.onNPCChange(npcId, newNPCType.target.value)
          }
          label="NPC"
          inputProps={{
            name: "npc",
            id: "npc-select",
          }}
        >
          {npcRows}
        </Select>
      </Tooltip>
    </FormControl>
  );
}
