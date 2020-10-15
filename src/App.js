import React from "react";
import { nanoid } from "nanoid";
import { Button, TextField, Typography, Paper } from "@material-ui/core";
import "./App.scss";
import Towns from "./Components/Towns.js";
import PriceCalc from "./Components/PriceCalc.js";

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
        const { price, priceNotes } = PriceCalc(town, npc.npcType);
        npc.price = price;
        npc.priceNotes = priceNotes;
      });
    });
    this.state = {
      towns: sample,
    };
  }

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

  npcChange(townId, npcId, newNPCType) {
    const townIndex = this.findTown(townId);
    const npcIndex = this.findNPC(townIndex, npcId);
    const newTowns = [...this.state.towns];
    newTowns[townIndex].npcs[npcIndex].npcType = newNPCType;
    newTowns[townIndex].npcs.forEach((npc) => {
      const { price, priceNotes } = PriceCalc(newTowns[townIndex], npc.npcType);
      npc.price = price;
      npc.priceNotes = priceNotes;
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
      priceNotes: "Error",
    });
    newTowns[townIndex].npcs.forEach((npc) => {
      const { price, priceNotes } = PriceCalc(newTowns[townIndex], npc.npcType);
      npc.price = price;
      npc.priceNotes = priceNotes;
    });
    this.setState({ towns: newTowns });
  }

  delNPC(townId, npcId) {
    const townIndex = this.findTown(townId);
    const npcIndex = this.findNPC(townIndex, npcId);
    const newTowns = [...this.state.towns];
    newTowns[townIndex].npcs.splice(npcIndex, 1);
    newTowns[townIndex].npcs.forEach((npc) => {
      const { price, priceNotes } = PriceCalc(newTowns[townIndex], npc.npcType);
      npc.price = price;
      npc.priceNotes = priceNotes;
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
