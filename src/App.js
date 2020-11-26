import React from "react";
import { nanoid } from "nanoid";
import { Button, TextField, Typography, Paper } from "@material-ui/core";
import "./App.scss";
import Towns from "./components/Towns.js";
import PriceCalc from "./components/PriceCalc.js";

import sample from "./components/data/json/sample.json";
import prefrences from "./components/data/json/prefrences.json";
import mainBack from "./components/data/images/Background.png";

const styles = {
  paperContainer: {
    background: "url(" + mainBack + ") no-repeat center fixed",
    backgroundSize: "cover",
  },
};

/**
 * This is a Textfield with a linked Button which when clicked creates a new
 * town and pushes the town name inputted into TextField to App class.
 * @param {*} props
 */
function NewTown(props) {
  const [town, setTown] = React.useState("New Town");

  const addTown = () => {
    return props.addTown(town);
  };
  return (
    <div className="Add-town">
      <TextField
        id="new-town-name"
        size="small"
        label="New Town"
        value={town}
        onChange={(e) => setTown(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" size="small" onClick={() => addTown()}>
        Add Town
      </Button>
    </div>
  );
}

/**
 * This App class handles all of the state changes. I might go through this at
 * a later date and maybe try to change this class and maybe handle more of the
 * changes on the component level rather than pushing props up the component list.
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    sample.npcCount.npcAmount = 0;
    prefrences.forEach((npcPrefs) => {
      sample.npcCount[npcPrefs.type] = 0;
    });
    sample.towns.forEach((town) => {
      town.npcs.forEach((npc) => {
        const { price, priceNotes } = PriceCalc(town, npc.npcType);
        npc.price = price;
        npc.priceNotes = priceNotes;
        sample.npcCount.npcAmount += 1;
        sample.npcCount[npc.npcType] += 1;
      });
    });
    this.state = {
      npcCount: sample.npcCount,
      towns: sample.towns,
    };
  }

  /**
   * This adds a new town to the state of towns. It is provided with a name and
   * everything else just goes by the default. It also has to calculate the npc
   * price for the new town.
   * @param {*} townName The name of the town provided by the user. Default: New Town
   */
  addTown(townName) {
    townName = townName ? townName : "New Town";
    const newTowns = [...this.state.towns];
    newTowns.push({
      townId: nanoid(),
      name: townName,
      biome: "Forest",
      pylonStatus: false,
      npcs: [
        { npcId: nanoid(), npcType: "Guide", price: 0, priceNotes: "Error" },
      ],
    });
    const latestTown = newTowns.length - 1;
    newTowns[latestTown].npcs.forEach((npc) => {
      const { price, priceNotes } = PriceCalc(
        newTowns[latestTown],
        npc.npcType
      );
      npc.price = price;
      npc.priceNotes = priceNotes;
    });
    const npcCount = this.state.npcCount;
    const latestNPC = newTowns[latestTown].npcs.length - 1;
    const newNPCType = newTowns[latestTown].npcs[latestNPC].npcType;
    npcCount.npcAmount += 1;
    npcCount[newNPCType] += 1;
    this.setState({ npcCount: npcCount, towns: newTowns });
  }

  /**
   * This adds a npc to the specified town using the townId to identify which town.
   * The npc is the default npc which will be changed by the user. It also has to
   * calculate all of the npcs prices for the current town.
   * @param {*} townId This is the id of the the town the new npc is added to.
   */
  addNPC(townId) {
    const townIndex = this.findTown(townId);
    const newTowns = [...this.state.towns];
    newTowns[townIndex].npcs.push({
      npcId: nanoid(),
      npcType: "Guide",
      price: 0,
      priceNotes: "No notes set",
    });
    newTowns[townIndex].npcs.forEach((npc) => {
      const { price, priceNotes } = PriceCalc(newTowns[townIndex], npc.npcType);
      npc.price = price;
      npc.priceNotes = priceNotes;
    });
    const npcCount = this.state.npcCount;
    npcCount.npcAmount += 1;
    npcCount.Guide += 1;
    this.setState({ npcCount: npcCount, towns: newTowns });
  }

  /**
   * This changes this town's biome to the specified biome by finding the correct town
   * in the towns state. It also has to calculate all of the npcs prices for the
   * current town.
   * @param {*} townId This is the id of the town we are changing
   * @param {*} newBiome This is the biome type that the town will be changing to
   */
  biomeChange(townId, newBiome) {
    const townIndex = this.findTown(townId);
    const newTowns = [...this.state.towns];
    newTowns[townIndex].biome = newBiome;
    newTowns[townIndex].npcs.forEach((npc) => {
      const { price, priceNotes } = PriceCalc(newTowns[townIndex], npc.npcType);
      npc.price = price;
      npc.priceNotes = priceNotes;
    });
    this.setState({ towns: newTowns });
  }

  /**
   * This changes what type of npc a current npc is by finding their town using townId
   * and then finding the specific npc to be changed using npcId and then changing their
   * npcType to their new npc Type using newNPCType. It also has to calculate all of the
   * npcs prices for the current town.
   * @param {*} townId This is the id of the town where the npc is
   * @param {*} npcId This is the id of the npc that is to be changed
   * @param {*} newNPCType This is the new npc type that the npc will be changing to
   */
  npcChange(townId, npcId, newNPCType) {
    const townIndex = this.findTown(townId);
    const npcIndex = this.findNPC(townIndex, npcId);
    const newTowns = [...this.state.towns];
    const oldNPCType = newTowns[townIndex].npcs[npcIndex].npcType;
    newTowns[townIndex].npcs[npcIndex].npcType = newNPCType;
    newTowns[townIndex].npcs.forEach((npc) => {
      const { price, priceNotes } = PriceCalc(newTowns[townIndex], npc.npcType);
      npc.price = price;
      npc.priceNotes = priceNotes;
    });
    const npcCount = this.state.npcCount;
    npcCount[oldNPCType] -= 1;
    npcCount[newNPCType] += 1;
    this.setState({ npcCount: npcCount, towns: newTowns });
  }

  /**
   * This changes pylonStatus to true or false in the town state using townId to identify
   * the town being changed and pylon to tell the state if it is true or false.
   * @param {*} townId This is the id of the town we are changing
   * @param {*} pylon This is a Boolean value to represent if a pylon is placed
   */
  pylonChange(townId, pylon) {
    const townIndex = this.findTown(townId);
    const newTowns = [...this.state.towns];
    newTowns[townIndex].pylonStatus = pylon;
    this.setState({ towns: newTowns });
  }

  /**
   * This deletes the specified town using townId to tell us which town to delete
   * @param {*} townId The id of the town to be deleted
   */
  delTown(townId) {
    const townIndex = this.findTown(townId);
    const newTowns = [...this.state.towns];
    const npcCount = this.state.npcCount;
    newTowns[townIndex].npcs.forEach((npc) => {
      npcCount.npcAmount -= 1;
      npcCount[npc.npcType] -= 1;
    });
    newTowns.splice(townIndex, 1);
    this.setState({ npcCount: npcCount, towns: newTowns });
  }

  /**
   * This deletes the specified npc using townId to tell us which town the npc is in
   * and npcId to tell us which npc to delete in that town. It also has to calculate
   * all of the npcs prices for the current town.
   * @param {*} townId The id of the town which the npc is in
   * @param {*} npcId The id of the npc to be deleted
   */
  delNPC(townId, npcId) {
    const townIndex = this.findTown(townId);
    const npcIndex = this.findNPC(townIndex, npcId);
    const newTowns = [...this.state.towns];
    const oldNPCType = newTowns[townIndex].npcs[npcIndex].npcType;
    newTowns[townIndex].npcs.splice(npcIndex, 1);
    newTowns[townIndex].npcs.forEach((npc) => {
      const { price, priceNotes } = PriceCalc(newTowns[townIndex], npc.npcType);
      npc.price = price;
      npc.priceNotes = priceNotes;
    });
    const npcCount = this.state.npcCount;
    npcCount.npcAmount -= 1;
    npcCount[oldNPCType] -= 1;
    this.setState({ npcCount: npcCount, towns: newTowns });
  }

  /**
   * This finds the required town using its townId and searching the current state.
   * @param {*} townId The id of the town that needs to be found
   */
  findTown(townId) {
    return this.state.towns.findIndex((town) => town.townId === townId);
  }

  /**
   * This finds the required npc using npcId in the specfied town using townIndex by
   * searching the current state.
   * @param {*} townIndex
   * @param {*} npcId
   */
  findNPC(townIndex, npcId) {
    return this.state.towns[townIndex].npcs.findIndex(
      (npc) => npc.npcId === npcId
    );
  }

  /**
   * This renders all of the visible components seen by the user.
   */
  render() {
    return (
      <Paper className="App" style={styles.paperContainer} square>
        <Typography variant="h1" className="App-header">
          Terrarias Terrific Towns
        </Typography>
        <NewTown addTown={(town) => this.addTown(town)}></NewTown>
        <Towns
          delTown={(townId, npcId) => this.delTown(townId, npcId)}
          onBiomeChange={(townId, biome) => this.biomeChange(townId, biome)}
          onNPCChange={(townId, npcId, newNPCType) =>
            this.npcChange(townId, npcId, newNPCType)
          }
          addNPC={(townId) => this.addNPC(townId)}
          delNPC={(townId, npcId) => this.delNPC(townId, npcId)}
          pylonChange={(townId, pylon) => this.pylonChange(townId, pylon)}
          towns={this.state.towns}
          npcCount={this.state.npcCount}
        ></Towns>
      </Paper>
    );
  }
}
