import React from "react";
import { nanoid } from "nanoid";
import { Button, TextField, Typography } from "@material-ui/core";
import "./App.scss";
import Houses from "./Components/Houses.js";

import preferences from "./Components/data/json/prefrences.json";
import prices from "./Components/data/json/prices.json";
import sample from "./Components/data/json/sample.json";

class NewHouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };

    this.handleNewHouse = this.handleNewHouse.bind(this);
  }

  handleNewHouse(e) {
    this.setState({ value: e.target.value });
  }

  createHouse() {
    const value = this.state.value;
    this.setState({ value: "" });
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
        <Button variant="contained" size="small" onClick={() => this.createHouse()}>
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
        npc.price = this.priceCalc(house, npc);
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
  priceCalc(house, npc) {
    let priceModifier = 1;
    const currentNPCType = npc.type;
    let npcPrefs = preferences.find(
      (preference) => preference.type === currentNPCType
    );
    if (npcPrefs === undefined) {
      console.warn("npcPref for " + currentNPCType + " is " + npcPrefs);
      npcPrefs = {
        type: currentNPCType,
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
      priceModifier *= npcPrefs.neighbour.loves.includes(npc.type)
        ? prices.loves
        : npcPrefs.neighbour.likes.includes(npc.type)
        ? prices.likes
        : npcPrefs.neighbour.dislikes.includes(npc.type)
        ? prices.dislikes
        : npcPrefs.neighbour.hates.includes(npc.type)
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
    const houseIndex = this.state.houses.findIndex((ids) => ids.id === houseId);
    const newHouses = [...this.state.houses];
    newHouses[houseIndex].biome = newBiome;
    newHouses[houseIndex].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newHouses[houseIndex], npc);
    });
    this.setState({ houses: newHouses });
  }

  npcChange(houseId, npcId, npcType) {
    const houseIndex = this.state.houses.findIndex((ids) => ids.id === houseId);
    const npcIndex = this.state.houses[houseIndex].npcs.findIndex(
      (ids) => ids.id === npcId
    );
    const newHouses = [...this.state.houses];
    newHouses[houseIndex].npcs[npcIndex].type = npcType;
    newHouses[houseIndex].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newHouses[houseIndex], npc);
    });
    this.setState({ houses: newHouses });
  }

  createHouse(house) {
    house = house ? house : "New House";
    const newHouses = [...this.state.houses];
    newHouses.push({
      id: nanoid(),
      name: house,
      biome: "Forest",
      npcs: [{ id: nanoid(), type: "Guide", price: 0 }],
    });
    const latestHouse = newHouses.length - 1;
    newHouses[latestHouse].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newHouses[latestHouse], npc);
    });
    this.setState({ houses: newHouses });
  }

  delHouse(id) {
    const houseIndex = this.state.houses.findIndex((ids) => ids.id === id);
    const newHouses = [...this.state.houses];
    newHouses.splice(houseIndex, 1);
    this.setState({ houses: newHouses });
  }

  addNPC(id) {
    const houseIndex = this.state.houses.findIndex((ids) => ids.id === id);
    const newHouses = [...this.state.houses];
    newHouses[houseIndex].npcs.push({
      id: nanoid(),
      type: "Guide",
      price: 0,
    });
    newHouses[houseIndex].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newHouses[houseIndex], npc);
    });
    this.setState({ houses: newHouses });
  }

  delNPC(houseId, npcId) {
    const houseIndex = this.state.houses.findIndex((ids) => ids.id === houseId);
    const npcIndex = this.state.houses[houseIndex].npcs.findIndex(
      (ids) => ids.id === npcId
    );
    const newHouses = [...this.state.houses];
    newHouses[houseIndex].npcs.splice(npcIndex, 1);
    newHouses[houseIndex].npcs.forEach((npc) => {
      npc.price = this.priceCalc(newHouses[houseIndex], npc);
    });
    this.setState({ houses: newHouses });
  }

  render() {
    return (
      <div className="App">
        <Typography variant="h1" className="App-header">
          Terraria House Project
        </Typography>
        <NewHouse createHouse={(house) => this.createHouse(house)}></NewHouse>
        <Houses
          delHouse={(houseId, npcId) => this.delHouse(houseId, npcId)}
          onBiomeChange={(houseId, biome) => this.biomeChange(houseId, biome)}
          onNPCChange={(houseId, npcId, npc) =>
            this.npcChange(houseId, npcId, npc)
          }
          addNPC={(id) => this.addNPC(id)}
          delNPC={(houseId, npcId) => this.delNPC(houseId, npcId)}
          houses={this.state.houses}
        ></Houses>
      </div>
    );
  }
}
