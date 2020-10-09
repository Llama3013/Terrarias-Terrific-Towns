import React from "react";
import { nanoid } from "nanoid";
import { Button, TextField, Typography, Paper } from "@material-ui/core";
import "./App.scss";
import Towns from "./Components/Towns.js";

import preferences from "./Components/data/json/prefrences.json";
import prices from "./Components/data/json/prices.json";
import sample from "./Components/data/json/sample.json";
import mainBack from "./Components/data/images/biomes/Forest_back_1.png";

class NewTown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "New Town",
    };

    this.handleNewTown = this.handleNewTown.bind(this);
  }

  handleNewTown(e) {
    this.setState({ value: e.target.value });
  }

  createTown() {
    const value = this.state.value;
    this.setState({ value: "New Town" });
    return this.props.createTown(value);
  }

  render() {
    return (
      <div className="Add-town">
        <TextField
          id="new-town-name"
          size="small"
          label="New Town"
          value={this.state.value}
          onChange={this.handleNewTown}
          variant="outlined"
        />
        <Button
          variant="contained"
          size="small"
          onClick={() => this.createTown()}
        >
          Add Town
        </Button>
      </div>
    );
  }
}

const styles = {
  paperContainer: {
    background: "url(" + mainBack + ") no-repeat center fixed",
    backgroundSize: "cover",
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    sample.forEach((town) => {
      town.npcs.forEach((npc) => {
        npc.price = this.priceCalc(town, npc.npcType);
      });
    });
    this.state = {
      towns: sample,
    };
  }

  /**
   * This is probably confusing and probably needs a rework.
   * This checks the current npc's price modifier by checking
   * if they have a preference in their current biome and if they
   * have a preference on what npcs are in the same area as them
   * @param {*} towns This is the state of the towns
   * @param {*} townIndex This is the index of the current town
   * @param {*} npcIndex This is the index of the current npc
   */
  priceCalc(town, npcType) {
    let priceModifier = 1;
    let npcPrefs = preferences.find(
      (preference) => preference.type === npcType
    );
    if (npcPrefs === undefined) {
      console.warn("npcPref for " + npcType + " is " + npcPrefs);
      npcPrefs = {
        type: npcType,
        biome: { loves: "", likes: "", dislikes: "", hates: "" },
        neighbour: {
          loves: [],
          likes: [],
          dislikes: [],
          hates: [],
        },
      };
    }

    //If the npc is in any of these biomes they instantly have a price modifier of 150%
    const townBiome = town.biome;
    if (
      townBiome === "Dungeon" ||
      townBiome === "Corruption" ||
      townBiome === "Crimson"
    ) {
      return prices.despises;
    }

    //Still need to add a checkbox or something for if more than 3 npcs
    //are within 120 blocks (not including the NPC's within 25 tiles)
    //So for now it is going to just check if there are only 2 npcs in the town
    const npcAmount = town.npcs.length;
    if (npcAmount <= 2) {
      priceModifier *= prices.couple;
    } else if (npcAmount >= 3) {
      for (let i = 3; i <= npcAmount; i++) {
        priceModifier *= prices.extra;
      }
    }

    priceModifier *=
      townBiome === npcPrefs.biome.loves
        ? prices.loves
        : townBiome === npcPrefs.biome.likes
        ? prices.likes
        : townBiome === npcPrefs.biome.dislikes
        ? prices.dislikes
        : townBiome === npcPrefs.biome.hates
        ? prices.hates
        : 1;

    town.npcs.forEach((npc) => {
      priceModifier *= npcPrefs.neighbour.loves.includes(npc.npcType)
        ? prices.loves
        : npcPrefs.neighbour.likes.includes(npc.npcType)
        ? prices.likes
        : npcPrefs.neighbour.dislikes.includes(npc.npcType)
        ? prices.dislikes
        : npcPrefs.neighbour.hates.includes(npc.npcType)
        ? prices.hates
        : 1;
    });

    priceModifier = this.roundFive(priceModifier);
    if (priceModifier >= 1.5) {
      return 1.5;
    } else if (priceModifier <= 0.75) {
      console.warn(
        "price modifier is " +
          priceModifier +
          ". This shouldn't be this low, probably calculation issue."
      );
      return 0.75;
    } else {
      return priceModifier;
    }
  }

  /**
   * This rounds the prices to the correct 5% interval
   * @param {*} num
   */
  roundFive(num) {
    return Math.round(num * 20) / 20;
  }

  biomeChange(townId, newBiome) {
    const townIndex = this.findTown(townId);
    const newTowns = [...this.state.towns];
    newTowns[townIndex].biome = newBiome;
    newTowns[townIndex].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newTowns[townIndex], npc.npcType);
    });
    this.setState({ towns: newTowns });
  }

  npcChange(townId, npcId, newNPCType) {
    const townIndex = this.findTown(townId);
    const npcIndex = this.findNPC(townIndex, npcId);
    const newTowns = [...this.state.towns];
    newTowns[townIndex].npcs[npcIndex].npcType = newNPCType;
    newTowns[townIndex].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newTowns[townIndex], npc.npcType);
    });
    this.setState({ towns: newTowns });
  }

  createTown(town) {
    town = town ? town : "New Town";
    const newTowns = [...this.state.towns];
    newTowns.push({
      townId: nanoid(),
      name: town,
      biome: "Forest",
      pylonStatus: false,
      npcs: [{ npcId: nanoid(), npcType: "Guide", price: 0 }],
    });
    const latestTown = newTowns.length - 1;
    newTowns[latestTown].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newTowns[latestTown], npc.npcType);
    });
    this.setState({ towns: newTowns });
  }

  delTown(townId) {
    const townIndex = this.findTown(townId);
    const newTowns = [...this.state.towns];
    newTowns.splice(townIndex, 1);
    this.setState({ towns: newTowns });
  }

  addNPC(townId) {
    const townIndex = this.findTown(townId);
    const newTowns = [...this.state.towns];
    newTowns[townIndex].npcs.push({
      npcId: nanoid(),
      npcType: "Guide",
      price: 0,
    });
    newTowns[townIndex].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newTowns[townIndex], npc.npcType);
    });
    this.setState({ towns: newTowns });
  }

  delNPC(townId, npcId) {
    const townIndex = this.findTown(townId);
    const npcIndex = this.findNPC(townIndex, npcId);
    const newTowns = [...this.state.towns];
    newTowns[townIndex].npcs.splice(npcIndex, 1);
    newTowns[townIndex].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newTowns[townIndex], npc.npcType);
    });
    this.setState({ towns: newTowns });
  }

  findTown(townId) {
    return this.state.towns.findIndex((town) => town.townId === townId);
  }

  findNPC(townIndex, npcId) {
    return this.state.towns[townIndex].npcs.findIndex(
      (npc) => npc.npcId === npcId
    );
  }

  pylonChange(townId, pylon) {
    const townIndex = this.findTown(townId);
    const newTowns = [...this.state.towns];
    newTowns[townIndex].pylonStatus = pylon;
    this.setState({ towns: newTowns });
  }

  render() {
    return (
      <Paper className="App" style={styles.paperContainer} square>
        <Typography variant="h1" className="App-header">
          Terrarias Terrific Towns
        </Typography>
        <NewTown createTown={(town) => this.createTown(town)}></NewTown>
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
        ></Towns>
      </Paper>
    );
  }
}
