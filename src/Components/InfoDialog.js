import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import HelpOutlinedIcon from "@material-ui/icons/HelpOutlined";

export default function InfoDialog(props) {
  const { infoFor, linkInfo } = props;
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  const handleInfoDialogClose = () => {
    setInfoDialogOpen(false);
  };

  const handleInfoDialogOpen = () => {
    setInfoDialogOpen(true);
  };

  const handleMoreInfo = () => {
    window.open(infoContent);
    handleInfoDialogClose();
  };
  let infoContent, infoTitle;
  if (infoFor === "Town") {
    infoTitle = "More Info Biome";
    infoContent =
      linkInfo === "Mushroom"
        ? "https://terraria.gamepedia.com/Glowing_Mushroom_biome#NPC_happiness"
        : linkInfo === "Hallow"
        ? "https://terraria.gamepedia.com/The_Hallow#NPC_happiness"
        : linkInfo === "Jungle"
        ? "https://terraria.gamepedia.com/Jungle#NPC_happiness"
        : linkInfo === "Snow"
        ? "https://terraria.gamepedia.com/Snow_biome#NPC_happiness"
        : linkInfo === "Ocean"
        ? "https://terraria.gamepedia.com/Ocean#NPC_happiness"
        : linkInfo === "Desert"
        ? "https://terraria.gamepedia.com/Desert#NPC_happiness"
        : linkInfo === "Underground"
        ? "https://terraria.gamepedia.com/Underground#NPC_happiness"
        : linkInfo === "Forest"
        ? "https://terraria.gamepedia.com/Forest#NPC_happiness"
        : "https://terraria.gamepedia.com/House#Location";
  } else {
    infoTitle = "More Info NPC";
    infoContent =
      linkInfo === "Angler"
        ? "https://terraria.gamepedia.com/Angler#Living_preferences"
        : linkInfo === "Arms Dealer"
        ? "https://terraria.gamepedia.com/Arms_Dealer#Living_preferences"
        : linkInfo === "Clothier"
        ? "https://terraria.gamepedia.com/Clothier#Living_preferences"
        : linkInfo === "Cyborg"
        ? "https://terraria.gamepedia.com/Cyborg#Living_preferences"
        : linkInfo === "Demolitionist"
        ? "https://terraria.gamepedia.com/Demolitionist#Living_preferences"
        : linkInfo === "Dryad"
        ? "https://terraria.gamepedia.com/Dryad#Living_preferences"
        : linkInfo === "Dye Trader"
        ? "https://terraria.gamepedia.com/Dye_Trader#Living_preferences"
        : linkInfo === "Goblin Tinkerer"
        ? "https://terraria.gamepedia.com/Goblin_Tinkerer#Living_preferences"
        : linkInfo === "Golfer"
        ? "https://terraria.gamepedia.com/Golfer#Living_preferences"
        : linkInfo === "Guide"
        ? "https://terraria.gamepedia.com/Guide#Living_preferences"
        : linkInfo === "Mechanic"
        ? "https://terraria.gamepedia.com/Mechanic#Living_preferences"
        : linkInfo === "Merchant"
        ? "https://terraria.gamepedia.com/Merchant#Living_preferences"
        : linkInfo === "Nurse"
        ? "https://terraria.gamepedia.com/Nurse#Living_preferences"
        : linkInfo === "Painter"
        ? "https://terraria.gamepedia.com/Painter#Living_preferences"
        : linkInfo === "Party Girl"
        ? "https://terraria.gamepedia.com/Party_Girl#Living_preferences"
        : linkInfo === "Pirate"
        ? "https://terraria.gamepedia.com/Pirate#Living_preferences"
        : linkInfo === "Princess"
        ? "https://terraria.gamepedia.com/Princess#Living_preferences"
        : linkInfo === "Santa Claus"
        ? "https://terraria.gamepedia.com/Santa_Claus#Living_preferences"
        : linkInfo === "Steampunker"
        ? "https://terraria.gamepedia.com/Steampunker#Living_preferences"
        : linkInfo === "Stylist"
        ? "https://terraria.gamepedia.com/Stylist#Living_preferences"
        : linkInfo === "Tavernkeep"
        ? "https://terraria.gamepedia.com/Tavernkeep#Living_preferences"
        : linkInfo === "Tax Collector"
        ? "https://terraria.gamepedia.com/Tax_Collector#Living_preferences"
        : linkInfo === "Truffle"
        ? "https://terraria.gamepedia.com/Truffle#Living_preferences"
        : linkInfo === "Witch Doctor"
        ? "https://terraria.gamepedia.com/Witch_Doctor#Living_preferences"
        : linkInfo === "Wizard"
        ? "https://terraria.gamepedia.com/Wizard#Living_preferences"
        : linkInfo === "Zoologist"
        ? "https://terraria.gamepedia.com/Zoologist#Living_preferences"
        : "cannot find link";
  }

  return (
    <div>
      <Tooltip title={infoTitle}>
        <IconButton onClick={handleInfoDialogOpen}>
          <HelpOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={infoDialogOpen}
        onClose={handleInfoDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Would you like to access this third party website?"}
        </DialogTitle>
        <DialogContent>{infoContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleInfoDialogClose} color="secondary">
            Disagree
          </Button>
          <Button onClick={handleMoreInfo} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
