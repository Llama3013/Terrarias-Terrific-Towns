import React from "react";
import { nanoid } from "nanoid";
import {
  Button,
  TextField,
  Typography,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { create } from "jss";
import "./App.scss";
import Houses from "./Components/Houses.js";

import preferences from "./Components/data/json/prefrences.json";
import prices from "./Components/data/json/prices.json";
import sample from "./Components/data/json/sample.json";

const jss = create({
  ...jssPreset(),
  insertionPoint: "jss-insertion-point",
});

class NewHouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "New House",
    };

    this.handleNewHouse = this.handleNewHouse.bind(this);
  }

  handleNewHouse(e) {
    this.setState({ value: e.target.value });
  }

  createHouse() {
    const value = this.state.value;
    this.setState({ value: "New House" });
    return this.props.createHouse(value);
  }

  render() {
    return (
      <div className="Add-house">
        <TextField
          id="new-house-name"
          size="small"
          label="New House"
          value={this.state.value}
          onChange={this.handleNewHouse}
          variant="outlined"
        />
        <Button
          variant="contained"
          size="small"
          onClick={() => this.createHouse()}
        >
          Add House
        </Button>
      </div>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    sample.forEach((house) => {
      house.npcs.forEach((npc) => {
        npc.price = this.priceCalc(house, npc.npcType);
      });
    });
    this.state = {
      houses: sample,
    };
  }

  /**
   * This is probably confusing and probably needs a rework.
   * This checks the current npc's price modifier by checking
   * if they have a preference in their current biome and if they
   * have a preference on what npcs are in the same area as them
   * @param {*} houses This is the state of the houses
   * @param {*} houseIndex This is the index of the current house
   * @param {*} npcIndex This is the index of the current npc
   */
  priceCalc(house, npcType) {
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
    const houseBiome = house.biome;
    if (
      houseBiome === "Dungeon" ||
      houseBiome === "Corruption" ||
      houseBiome === "Crimson"
    ) {
      return prices.despises;
    }

    //Still need to add a checkbox or something for if more than 3 npcs
    //are within 120 blocks (not including the NPC's within 25 tiles)
    //So for now it is going to just check if there are only 2 npcs in the house
    const npcAmount = house.npcs.length;
    if (npcAmount <= 2) {
      priceModifier *= prices.couple;
    } else if (npcAmount >= 3) {
      for (let i = 3; i <= npcAmount; i++) {
        priceModifier *= prices.extra;
      }
    }

    priceModifier *=
      houseBiome === npcPrefs.biome.loves
        ? prices.loves
        : houseBiome === npcPrefs.biome.likes
        ? prices.likes
        : houseBiome === npcPrefs.biome.dislikes
        ? prices.dislikes
        : houseBiome === npcPrefs.biome.hates
        ? prices.hates
        : 1;

    house.npcs.forEach((npc) => {
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
      console.log(
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

  biomeChange(houseId, newBiome) {
    const houseIndex = this.state.houses.findIndex(
      (house) => house.houseId === houseId
    );
    const newHouses = [...this.state.houses];
    newHouses[houseIndex].biome = newBiome;
    newHouses[houseIndex].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newHouses[houseIndex], npc.npcType);
    });
    this.setState({ houses: newHouses });
  }

  npcChange(houseId, npcId, newNPCType) {
    const houseIndex = this.findHouse(houseId);
    const npcIndex = this.findNPC(houseIndex, npcId);
    const newHouses = [...this.state.houses];
    newHouses[houseIndex].npcs[npcIndex].npcType = newNPCType;
    newHouses[houseIndex].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newHouses[houseIndex], npc.npcType);
    });
    this.setState({ houses: newHouses });
  }

  createHouse(house) {
    house = house ? house : "New House";
    const newHouses = [...this.state.houses];
    newHouses.push({
      houseId: nanoid(),
      name: house,
      biome: "Forest",
      npcs: [{ npcId: nanoid(), npcType: "Guide", price: 0 }],
    });
    const latestHouse = newHouses.length - 1;
    newHouses[latestHouse].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newHouses[latestHouse], npc.npcType);
    });
    this.setState({ houses: newHouses });
  }

  delHouse(houseId) {
    const houseIndex = this.findHouse(houseId);
    const newHouses = [...this.state.houses];
    newHouses.splice(houseIndex, 1);
    this.setState({ houses: newHouses });
  }

  addNPC(houseId) {
    const houseIndex = this.findHouse(houseId);
    const newHouses = [...this.state.houses];
    newHouses[houseIndex].npcs.push({
      npcId: nanoid(),
      npcType: "Guide",
      price: 0,
    });
    newHouses[houseIndex].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newHouses[houseIndex], npc.npcType);
    });
    this.setState({ houses: newHouses });
  }

  delNPC(houseId, npcId) {
    const houseIndex = this.findHouse(houseId);
    const npcIndex = this.findNPC(houseIndex, npcId);
    const newHouses = [...this.state.houses];
    newHouses[houseIndex].npcs.splice(npcIndex, 1);
    newHouses[houseIndex].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newHouses[houseIndex], npc.npcType);
    });
    this.setState({ houses: newHouses });
  }

  findHouse(houseId) {
    return this.state.houses.findIndex((house) => house.houseId === houseId);
  }

  findNPC(houseIndex, npcId) {
    return this.state.houses[houseIndex].npcs.findIndex(
      (npc) => npc.npcId === npcId
    );
  }

  muiTheme = createMuiTheme({});

  render() {
    return (
      <StylesProvider jss={jss}>
        <MuiThemeProvider theme={this.muiTheme}>
          <div className="App">
            <Typography variant="h1" className="App-header">
              Terraria House Project
            </Typography>
            <NewHouse
              createHouse={(house) => this.createHouse(house)}
            ></NewHouse>
            <Houses
              delHouse={(houseId, npcId) => this.delHouse(houseId, npcId)}
              onBiomeChange={(houseId, biome) =>
                this.biomeChange(houseId, biome)
              }
              onNPCChange={(houseId, npcId, newNPCType) =>
                this.npcChange(houseId, npcId, newNPCType)
              }
              addNPC={(houseId) => this.addNPC(houseId)}
              delNPC={(houseId, npcId) => this.delNPC(houseId, npcId)}
              houses={this.state.houses}
            ></Houses>
          </div>
        </MuiThemeProvider>
      </StylesProvider>
    );
  }
}
