import React from "react";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Tooltip,
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

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
  form: { flexGrow: 1 },
  backgroundBubble: {
    backgroundColor: "rgba(123, 104, 238, 0.5)",
    textAlign: "left",
  },
  npcIcon: { width: "24px", height: "24px" },
  shopIcon: { fontSize: "40px" },
}));

/**
 * This function displays the npc selecter on the npc card.
 * It goes through the list of npcs and has a option for each npc.
 * @param {*} props
 */
export default function NPCType(props) {
  const { npcCount, npcId, npcType } = props;
  const npcRows = [];
  const classes = useStyles();
  preferences.forEach((npcPrefs) => {
    const npcImage =
      npcPrefs.type === "Angler"
        ? iconAngler
        : npcPrefs.type === "Arms Dealer"
        ? iconArms
        : npcPrefs.type === "Clothier"
        ? iconCloth
        : npcPrefs.type === "Cyborg"
        ? iconCyborg
        : npcPrefs.type === "Demolitionist"
        ? iconDemol
        : npcPrefs.type === "Dryad"
        ? iconDryad
        : npcPrefs.type === "Dye Trader"
        ? iconDye
        : npcPrefs.type === "Goblin Tinkerer"
        ? iconGoblin
        : npcPrefs.type === "Golfer"
        ? iconGolfer
        : npcPrefs.type === "Guide"
        ? iconGuide
        : npcPrefs.type === "Mechanic"
        ? iconMech
        : npcPrefs.type === "Merchant"
        ? iconMerch
        : npcPrefs.type === "Nurse"
        ? iconNurse
        : npcPrefs.type === "Painter"
        ? iconPainter
        : npcPrefs.type === "Party Girl"
        ? iconParty
        : npcPrefs.type === "Pirate"
        ? iconPirate
        : npcPrefs.type === "Princess"
        ? iconPrincess
        : npcPrefs.type === "Santa Claus"
        ? iconSanta
        : npcPrefs.type === "Steampunker"
        ? iconSteam
        : npcPrefs.type === "Stylist"
        ? iconStyl
        : npcPrefs.type === "Tavernkeep"
        ? iconTavern
        : npcPrefs.type === "Tax Collector"
        ? iconTruf
        : npcPrefs.type === "Truffle"
        ? iconTax
        : npcPrefs.type === "Witch Doctor"
        ? iconWitch
        : npcPrefs.type === "Wizard"
        ? iconWiz
        : npcPrefs.type === "Zoologist"
        ? iconZool
        : ErrorOutlineIcon;
    const menuItemText = npcPrefs.type + ": (" + npcCount[npcPrefs.type] + ")";
    npcRows.push(
      <MenuItem value={npcPrefs.type} key={npcPrefs.type}>
        <img src={npcImage} alt="" className={classes.npcIcon}></img>
        {menuItemText}
      </MenuItem>
    );
  });
  const currNPCPref = preferences.find((npc) => npc.type === npcType);
  const notes = currNPCPref.notes;
  const vendor = currNPCPref.vendor ? (
    <AttachMoneyIcon className={classes.shopIcon} />
  ) : (
    <MoneyOffIcon className={classes.shopIcon} />
  );
  const npcSelectId = "npc-select: " + npcId;
  return (
    <div className={classes.root}>
      <FormControl variant="filled" className={classes.form}>
        <InputLabel htmlFor={npcSelectId}>NPC</InputLabel>
        <Tooltip title="Select NPC">
          <Select
            className={classes.backgroundBubble}
            value={npcType}
            onChange={(newNPCType) =>
              props.npcChange(npcId, newNPCType.target.value)
            }
            label="NPC"
            id={npcSelectId}
          >
            {npcRows}
          </Select>
        </Tooltip>
      </FormControl>
      <Tooltip title={notes}>{vendor}</Tooltip>
    </div>
  );
}
