import React, { Component } from "react";
import { nanoid } from "nanoid";
import {
  Paper,
  ThemeProvider,
  responsiveFontSizes,
  createMuiTheme,
} from "@material-ui/core";
import clipboard from "clipboard-copy";
import { saveAs } from "file-saver";

import "./App.scss";
import TownAppBar from "./components/TownAppBar.js";
import Towns from "./components/Towns.js";
import PriceCalc from "./components/PriceCalc.js";
import MainBack from "./components/data/images/Background.png";
import sample from "./components/data/json/sample.json";
import prefrences from "./components/data/json/prefrences.json";

const styles = {
  mainBackground: {
    background: "url(" + MainBack + ") no-repeat center fixed",
    backgroundSize: "cover",
  },
};

/**
 * This App class handles all of the state changes. I might go through this at
 * a later date and maybe try to change this class. Also I might handle more of the
 * changes on the component level rather than pushing props up the component list.
 */
export default class App extends Component {
  /**
   * This sets the state to reflect what is inside of sample.json. This may change
   * with import and export system if implemented.
   * @param {*} props
   */
  constructor(props) {
    super(props);
    const { npcCount, towns } = this.loadTowns(
      sample.npcCount,
      sample.settings,
      sample.towns
    );
    this.state = {
      npcCount: npcCount,
      settings: sample.settings,
      towns: towns,
    };
  }

  /**
   * This will load or refresh the current price of the town's npcs
   * @param {*} npcCount This will count the amount of npc's and the amount of npc's
   * of certain type in the towns
   * @param {*} settings This stores the settings in boolean values
   * @param {*} towns This is an array of the towns that will be loaded in
   */
  loadTowns(npcCount, settings, towns) {
    npcCount.npcAmount = 0;
    prefrences.forEach((npcPrefs) => {
      npcCount[npcPrefs.type] = 0;
    });
    towns.forEach((town) => {
      town.npcs.forEach((npc) => {
        npc = this.changePrice(town, npc, settings);
        npcCount.npcAmount += 1;
        npcCount[npc.npcType] += 1;
      });
    });
    return { npcCount, towns };
  }

  /**
   * This will check if the npc is using multiBiome or not and gets the price and
   * priceNotes calculated from PriceCalc. It lastly will return the npc which has
   * been calculated
   * @param {*} town The state of the town that the npc is in.
   * @param {*} npc The state of the current npc.
   */
  changePrice(town, npc, setting) {
    const { multiBiome, solitary } = setting;
    let biome;
    if (npc.multiBiome.biomeSwitch && multiBiome) {
      biome = npc.multiBiome.type;
    } else {
      biome = town.biome;
    }
    const { price, priceNotes } = PriceCalc(town, npc.npcType, biome, solitary);
    npc.price = price;
    npc.priceNotes = priceNotes;
    return npc;
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
        {
          npcId: nanoid(),
          npcType: "Guide",
          price: 0,
          priceNotes: "Error",
          multiBiome: {
            biomeSwitch: false,
            type: "Forest",
          },
        },
      ],
    });
    const latestTown = newTowns.length - 1;
    newTowns[latestTown].npcs.forEach((npc) => {
      npc = this.changePrice(newTowns[latestTown], npc, this.state.settings);
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
      multiBiome: {
        biomeSwitch: false,
        type: "Forest",
      },
    });
    newTowns[townIndex].npcs.forEach((npc) => {
      npc = this.changePrice(newTowns[townIndex], npc, this.state.settings);
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
      npc = this.changePrice(newTowns[townIndex], npc, this.state.settings);
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
      npc = this.changePrice(newTowns[townIndex], npc, this.state.settings);
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
   * Changes the name of a town
   * @param {*} townId The id of the town to be name changed
   * @param {*} townName The name of the town
   */
  setTownName(townId, townName) {
    const townIndex = this.findTown(townId);
    const newTowns = [...this.state.towns];
    newTowns[townIndex].name = townName;
    this.setState({ towns: newTowns });
  }

  /**
   * Changes the notes contents
   * @param {*} townId The id of the town with the notes being changed
   * @param {*} notes The content of the notes
   */
  setNotes(townId, notes) {
    const townIndex = this.findTown(townId);
    const newTowns = [...this.state.towns];
    newTowns[townIndex].notes = notes;
    this.setState({ towns: newTowns });
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
      npc = this.changePrice(newTowns[townIndex], npc, this.state.settings);
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
   * @param {*} townIndex The index of the town the npc that is to be found is in
   * @param {*} npcId The id of the npc that needs to be found
   */
  findNPC(townIndex, npcId) {
    return this.state.towns[townIndex].npcs.findIndex(
      (npc) => npc.npcId === npcId
    );
  }

  /**
   * This function runs when the user clicks on the multi biome switch. Changes whether
   * the npc is in a multiBiome
   * @param {*} townId The id of the town that the npc is in
   * @param {*} npcId The id of the npc that is having multiBiome turned on/off
   * @param {*} biomeSwitch The boolean value of whether the npc is in a multiBiome
   */
  multiBiomeSwitch(townId, npcId, biomeSwitch) {
    const townIndex = this.findTown(townId);
    const npcIndex = this.findNPC(townIndex, npcId);
    const newTowns = [...this.state.towns];
    let npc = newTowns[townIndex].npcs[npcIndex];
    npc.multiBiome.biomeSwitch = biomeSwitch;
    npc = this.changePrice(newTowns[townIndex], npc, this.state.settings);
    this.setState({ towns: newTowns });
  }

  /**
   * This changes what biome this specfic npc is in.
   * @param {*} townId The id of the town that the npc is in
   * @param {*} npcId The id of the npc that is having its biome changed
   * @param {*} biome The new biome the npc will be in
   */
  multiBiomeChange(townId, npcId, biome) {
    const townIndex = this.findTown(townId);
    const npcIndex = this.findNPC(townIndex, npcId);
    const newTowns = [...this.state.towns];
    let npc = newTowns[townIndex].npcs[npcIndex];
    npc.multiBiome.type = biome;
    npc = this.changePrice(newTowns[townIndex], npc, this.state.settings);
    this.setState({ towns: newTowns });
  }

  /**
   * This sets whether the user wants to use the multi biome system in the top-left
   * menu. It also loads the towns again with the new multiBiomeSetting to
   * recalculate the npc prices.
   * @param {*} multiBiome Boolean value of whether the multi biome setting is on
   */
  multiBiomeSetting(multiBiome) {
    const { npcCount, settings } = this.state;
    const oldTowns = this.state.towns;
    settings.multiBiome = multiBiome;
    const { towns } = this.loadTowns(npcCount, settings, oldTowns);
    this.setState({ settings: settings, towns: towns });
  }

  /**
   * This sets whether the user wants to show notes (that the user can edit) at
   * the end of every town.
   * @param {*} notes Boolean value of whether the notes setting is on
   */
  notesSetting(notes) {
    const { settings } = this.state;
    settings.notes = notes;
    this.setState({ settings: settings });
  }

  /**
   * This sets whether the user wants to assume the towns are isolated from each other
   * @param {*} solitary Boolean value of whether the solitary setting is on
   */
  solitarySetting(solitary) {
    const { settings } = this.state;
    settings.solitary = solitary;
    const { npcCount } = this.state;
    const { towns } = this.loadTowns(npcCount, settings, this.state.towns);
    this.setState({ settings: settings, towns: towns });
  }

  /**
   * Imports users towns data from the TownAppBar using a json file
   * @param {*} townsData towns state in json format
   */
  importTownsState(townsData) {
    const townsState = JSON.parse(townsData);
    const { npcCount, towns } = this.loadTowns(
      this.state.npcCount,
      townsState.settings,
      townsState.towns
    );
    this.setState({
      npcCount: npcCount,
      settings: townsState.settings,
      towns: towns,
    });
  }

  /**
   * Exports the user's town data by saving the it to the user's clipboard
   */
  exportClipboard() {
    const exportValue =
      '{ "settings": ' +
      JSON.stringify(this.state.settings) +
      ',"towns":' +
      JSON.stringify(this.state.towns) +
      "}";
    clipboard(exportValue);
  }

  /**
   * Exports the user's town data by saving as a file and let the user download it
   */
  exportFile() {
    const exportValue =
      '{ "settings": ' +
      JSON.stringify(this.state.settings) +
      ',"towns":' +
      JSON.stringify(this.state.towns) +
      "}";
    var blob = new Blob([exportValue], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "Terrarias-Terrific-Towns-data.json");
  }

  /**
   * This renders all of the visible components seen by the user.
   */
  render() {
    return (
      <ThemeProvider theme={detailedTheme}>
        <Paper className="App" style={styles.mainBackground} square>
          <TownAppBar
            addTown={(town) => this.addTown(town)}
            multiBiomeSetting={(multiBiome) =>
              this.multiBiomeSetting(multiBiome)
            }
            notesSetting={(notes) => this.notesSetting(notes)}
            solitarySetting={(solitary) => this.solitarySetting(solitary)}
            importTownsState={(townsState) => this.importTownsState(townsState)}
            exportClipboard={() => this.exportClipboard()}
            exportFile={() => this.exportFile()}
            settings={this.state.settings}
          ></TownAppBar>
          <Towns
            delTown={(townId, npcId) => this.delTown(townId, npcId)}
            setTownName={(townId, townName) =>
              this.setTownName(townId, townName)
            }
            setNotes={(townId, notes) => this.setNotes(townId, notes)}
            biomeChange={(townId, biome) => this.biomeChange(townId, biome)}
            npcChange={(townId, npcId, newNPCType) =>
              this.npcChange(townId, npcId, newNPCType)
            }
            addNPC={(townId) => this.addNPC(townId)}
            delNPC={(townId, npcId) => this.delNPC(townId, npcId)}
            pylonChange={(townId, pylon) => this.pylonChange(townId, pylon)}
            multiBiomeSwitch={(townId, npcId, on) =>
              this.multiBiomeSwitch(townId, npcId, on)
            }
            multiBiomeChange={(townId, npcId, biome) =>
              this.multiBiomeChange(townId, npcId, biome)
            }
            townData={this.state}
          ></Towns>
        </Paper>
      </ThemeProvider>
    );
  }
}

//This is the dark theme for the theme provider. This might change if I add a theme switch.
export const detailedTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
    },
  })
);
