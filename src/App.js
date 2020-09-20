import React from "react";
import { nanoid } from "nanoid";
import "./App.css";

import preferences from "./data/json/prefrences.json";
import prices from "./data/json/prices.json";
import sample from "./data/json/sample.json";
import biomeList from "./data/json/biome.json";

class NPCType extends React.Component {
  render() {
    const npc = this.props.npc;
    console.log(npc);
    const npcRows = [];
    preferences.forEach((npcPref) => {
      npcRows.push(<option key={npcPref.type}>{npcPref.type}</option>);
    });
    return (
      <div>
        <select
          value={npc.type}
          onChange={(npcType) =>
            this.props.onNPCChange(npc.id, npcType.target.value)
          }
        >
          {npcRows}
        </select>
        <button onClick={() => this.props.delNPC(npc.id)}>Delete NPC</button>
      </div>
    );
  }
}

class Happiness extends React.Component {
  render() {
    const happiness = this.props.happiness;
    return <p>{happiness}</p>;
  }
}

class Biome extends React.Component {
  render() {
    const biomeRows = [];
    biomeList.forEach((biome) => {
      biomeRows.push(
        <option src={biome.image} value={biome.type} key={biome.priority}>
          {biome.type}
        </option>
      );
    });
    return (
      <select
        value={this.props.house.biome}
        onChange={(biome) =>
          this.props.onBiomeChange(this.props.house.id, biome.target.value)
        }
      >
        {biomeRows}
      </select>
    );
  }
}

class HouseRow extends React.Component {
  onNPCChange(npcId, npc) {
    console.log(npcId + " " + npc + " " + this.props.house.id);
    return this.props.onNPCChange(this.props.house.id, npcId, npc);
  }

  delNPC(npcId) {
    return this.props.delNPC(this.props.house.id, npcId);
  }

  render() {
    const house = this.props.house;
    const npcTypeRows = [];
    const npcHappinessRows = [];
    house.npcs.forEach((npc) => {
      npcTypeRows.push(
        <NPCType
          delNPC={(id) => this.delNPC(id)}
          onNPCChange={(npcId, npc) => this.onNPCChange(npcId, npc)}
          key={npc.id}
          npc={npc}
        ></NPCType>
      );
      npcHappinessRows.push(
        <Happiness key={npc.id} happiness={npc.happy}></Happiness>
      );
    });
    return (
      <tr className="House-row">
        <td>{house.name}</td>
        <td>
          <Biome
            onBiomeChange={(houseId, biome) =>
              this.props.onBiomeChange(houseId, biome)
            }
            house={house}
          ></Biome>
        </td>
        <td>{npcTypeRows}</td>
        <td>{npcHappinessRows}</td>
        <td>
          <button onClick={() => this.props.delHouse(house.id)}>
            Delete House
          </button>
          <button onClick={() => this.props.addNPC(house.id)}>Add NPC</button>
        </td>
      </tr>
    );
  }
}

class HouseTable extends React.Component {
  render() {
    const houses = this.props.houses;
    const houseRows = [];
    houses.forEach((house) => {
      houseRows.push(
        <HouseRow
          delHouse={(id) => this.props.delHouse(id)}
          addNPC={(id) => this.props.addNPC(id)}
          delNPC={(houseId, npcId) => this.props.delNPC(houseId, npcId)}
          onNPCChange={(houseId, npcId, npc) =>
            this.props.onNPCChange(houseId, npcId, npc)
          }
          onBiomeChange={(houseId, biome) =>
            this.props.onBiomeChange(houseId, biome)
          }
          house={house}
          key={house.id}
        ></HouseRow>
      );
    });
    return (
      <div className="House-table">
        <table>
          <thead>
            <tr>
              <th> Name </th>
              <th> Biome </th>
              <th> Npc Type </th>
              <th> Happiness Value </th>
              <th> House Options</th>
            </tr>
          </thead>
          <tbody>{houseRows}</tbody>
        </table>
      </div>
    );
  }
}

class NewHouse extends React.Component {
  render() {
    return (
      <div className="Add-house">
        <input type="text" placeholder="New House"></input>
        <button onClick={() => this.props.newHouse()}>Add House</button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    sample.forEach((house) => {
      house.npcs.forEach((npc) => {
        npc.happy = happiness(house, npc);
      });
    });
    this.state = {
      houses: sample,
    };
  }

  biomeChange(houseId, newBiome) {
    const houseIndex = this.state.houses.findIndex((ids) => ids.id === houseId);
    const newHouses = this.state.houses;
    newHouses[houseIndex].biome = newBiome;
    newHouses[houseIndex].npcs.forEach((npc) => {
      npc.happy = happiness(newHouses[houseIndex], npc);
    });
    this.setState({ houses: newHouses });
  }

  npcChange(houseId, npcId, npcType) {
    const newHouses = this.state.houses;
    const houseIndex = this.state.houses.findIndex((ids) => ids.id === houseId);
    const npcIndex = this.state.houses[houseIndex].npcs.findIndex(
      (ids) => ids.id === npcId
    );
    newHouses[houseIndex].npcs[npcIndex].type = npcType;
    newHouses[houseIndex].npcs.forEach((npc) => {
      npc.happy = happiness(newHouses[houseIndex], npc);
    });
    this.setState({ houses: newHouses });
  }

  newHouse() {
    const newHouses = this.state.houses;
    newHouses.push({
      id: nanoid(),
      name: "House 1",
      biome: "Forest",
      npcs: [
        { id: nanoid(), type: "Guide", happy: 0 },
        { id: nanoid(), type: "Zoologist", happy: 0 },
      ],
    });
    const latestHouse = newHouses.length - 1;
    newHouses[latestHouse].npcs.forEach((npc) => {
      npc.happy = happiness(newHouses[latestHouse], npc);
    });
    this.setState({ houses: newHouses });
  }

  delHouse(id) {
    const newHouses = this.state.houses;
    const houseIndex = this.state.houses.findIndex((ids) => ids.id === id);
    newHouses.splice(houseIndex, 1);
    this.setState({ houses: newHouses });
  }

  addNPC(id) {
    const newHouses = this.state.houses;
    const houseIndex = this.state.houses.findIndex((ids) => ids.id === id);
    newHouses[houseIndex].npcs.push({
      id: nanoid(),
      type: "Guide",
      happy: 0,
    });
    newHouses[houseIndex].npcs.forEach((npc) => {
      npc.happy = happiness(newHouses[houseIndex], npc);
    });
    this.setState({ houses: newHouses });
  }

  delNPC(houseId, npcId) {
    console.log(houseId + " " + npcId);
    const newHouses = this.state.houses;
    const houseIndex = this.state.houses.findIndex((ids) => ids.id === houseId);
    const npcIndex = this.state.houses[houseIndex].npcs.findIndex(
      (ids) => ids.id === npcId
    );
    newHouses[houseIndex].npcs.splice(npcIndex, 1);
    this.setState({ houses: newHouses });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Terraria House Project</p>
        </header>
        <NewHouse newHouse={() => this.newHouse()}></NewHouse>
        <HouseTable
          delHouse={(houseId, npcId) => this.delHouse(houseId, npcId)}
          onBiomeChange={(houseId, biome) => this.biomeChange(houseId, biome)}
          onNPCChange={(houseId, npcId, npc) =>
            this.npcChange(houseId, npcId, npc)
          }
          addNPC={(id) => this.addNPC(id)}
          delNPC={(houseId, npcId) => this.delNPC(houseId, npcId)}
          houses={this.state.houses}
        ></HouseTable>
      </div>
    );
  }
}

/**
 * This is probably confusing and probably needs a rework.
 * This checks the current npc's happiness value by checking
 * if they have a preference in their current biome and if they
 * have a preference on what npcs are in the same area as them
 * @param {*} houses This is the state of the houses
 * @param {*} houseIndex This is the index of the current house
 * @param {*} npcIndex This is the index of the current npc
 */
function happiness(house, npc) {
  let happinessValue = 1;
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
  //are within 120 blocks (not including the NPC's within 120 tiles)
  //So for now it is going to just check if there are only 2 npcs in the house
  const npcAmount = house.npcs.length;
  if (npcAmount <= 2) {
    happinessValue *= prices.couple;
  } else if (npcAmount >= 3) {
    for (let i = 3; i <= npcAmount; i++) {
      happinessValue *= prices.extra;
    }
  }

  happinessValue *=
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
    happinessValue *= npcPrefs.neighbour.loves.includes(npc.type)
      ? prices.loves
      : npcPrefs.neighbour.likes.includes(npc.type)
      ? prices.likes
      : npcPrefs.neighbour.dislikes.includes(npc.type)
      ? prices.dislikes
      : npcPrefs.neighbour.hates.includes(npc.type)
      ? prices.hates
      : 1;
  });

  return happinessValue;
}

export default App;
