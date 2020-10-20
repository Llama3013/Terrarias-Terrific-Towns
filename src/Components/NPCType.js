import React from "react";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Tooltip,
} from "@material-ui/core";
import { AttachMoney, MoneyOff } from "@material-ui/icons";

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
  root: { display: "flex", alignItems: "center" },
  form: { flexGrow: 1},
  backgroundBubble: {
    backgroundColor: "rgba(123, 104, 238, 0.5)",
    textAlign: "left"
  },
  npcIcon: { width: "24px", height: "24px" },
  shopIcon: { fontSize: "40px" },
}));

/**
 * This functiondisplays the npc selecter on the npc card.
 * It goes through the list of npcs and has a option for each npc.
 * @param {*} props
 */
export default function NPCType(props) {
  const npcRows = [];
  const classes = useStyles();
  preferences.forEach((npcPrefs) => {
    const npcImage =
      npcPrefs.type === "Guide"
        ? iconGuide
        : npcPrefs.type === "Merchant"
        ? iconMerch
        : npcPrefs.type === "Zoologist"
        ? iconZool
        : npcPrefs.type === "Golfer"
        ? iconGolfer
        : npcPrefs.type === "Nurse"
        ? iconNurse
        : npcPrefs.type === "Tavernkeep"
        ? iconTavern
        : npcPrefs.type === "Party Girl"
        ? iconParty
        : npcPrefs.type === "Wizard"
        ? iconWiz
        : npcPrefs.type === "Demolitionist"
        ? iconDemol
        : npcPrefs.type === "Goblin Tinkerer"
        ? iconGoblin
        : npcPrefs.type === "Clothier"
        ? iconCloth
        : npcPrefs.type === "Dye Trader"
        ? iconDye
        : npcPrefs.type === "Arms Dealer"
        ? iconArms
        : npcPrefs.type === "Steampunker"
        ? iconSteam
        : npcPrefs.type === "Dryad"
        ? iconDryad
        : npcPrefs.type === "Painter"
        ? iconPainter
        : npcPrefs.type === "Witch Doctor"
        ? iconWitch
        : npcPrefs.type === "Stylist"
        ? iconStyl
        : npcPrefs.type === "Angler"
        ? iconAngler
        : npcPrefs.type === "Pirate"
        ? iconPirate
        : npcPrefs.type === "Mechanic"
        ? iconMech
        : npcPrefs.type === "Tax Collector"
        ? iconTax
        : npcPrefs.type === "Cyborg"
        ? iconCyborg
        : npcPrefs.type === "Santa Claus"
        ? iconSanta
        : npcPrefs.type === "Princess"
        ? iconPrincess
        : iconTruf;
    npcRows.push(
      <MenuItem value={npcPrefs.type} key={npcPrefs.type}>
        <img src={npcImage} alt="" className={classes.npcIcon}></img>
        {npcPrefs.type}
      </MenuItem>
    );
  });
  const { npcId, npcType } = props;
  const currNPCPref = preferences.find((npc) => npc.type === npcType);
  const notes = currNPCPref.notes;
  const vendor = currNPCPref.vendor ? (
    <AttachMoney className={classes.shopIcon} />
  ) : (
    <MoneyOff className={classes.shopIcon} />
  );
  return (
    <div className={classes.root}>
      <FormControl variant="filled" className={classes.form}>
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
      <Tooltip title={notes}>{vendor}</Tooltip>
    </div>
  );
}
