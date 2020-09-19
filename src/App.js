import React from "react";
import "./App.css";
import preferences from "./data/prefrences.json";
import prices from "./data/prices.json";
import sample from "./data/sample.json";

class NPCType extends React.Component {
  render() {
    const npc = this.props.npc;
    return <p>{npc}</p>;
  }
}

class Happiness extends React.Component {
  render() {
    const happiness = this.props.happiness;
    return <p>{happiness}</p>;
  }
}

class HouseRow extends React.Component {
  render() {
    const house = this.props.house;
    const npcTypeRows = [];
    const npcHappinessRows = [];
    house.npcs.forEach((npc) => {
      npcTypeRows.push(<NPCType key={npc.id} npc={npc.type}></NPCType>);
      npcHappinessRows.push(
        <Happiness key={npc.id} happiness={npc.happy}></Happiness>
      );
    });
    return (
      <tr>
        <td>{house.id}</td>
        <td>{house.name}</td>
        <td>{house.biome}</td>
        <td>{npcTypeRows}</td>
        <td>{npcHappinessRows}</td>
      </tr>
    );
  }
}

class HouseTable extends React.Component {
  render() {
    const houses = this.props.houses;
    const houseRows = [];
    houses.forEach((house) => {
      houseRows.push(<HouseRow house={house} key={house.id}></HouseRow>);
    });
    return (
      <div className="House-table">
        <table>
          <thead>
            <tr>
              <th> Id </th>
              <th> Name </th>
              <th> Biome </th>
              <th> Npc Type </th>
              <th> Happiness Value </th>
            </tr>
          </thead>
          <tbody>{houseRows}</tbody>
        </table>
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
    })
    this.state = {
      houses: sample,
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Terraria House Project</p>
        </header>
        <HouseTable houses={this.state.houses}></HouseTable>
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

  //Still need to add a checkbox or something for if more than 3 npcs
  //are within 120 blocks (not including the NPC's within 120 tiles)
  //So for now it is going to just check if there are only 2 npcs in the house
  const npcAmount = house.npcs.length;
  if (npcAmount === 2) {
    happinessValue *= prices.couple;
  } else if (npcAmount >= 3) {
    for (let i = 3; i <= npcAmount; i++) {
      happinessValue *= prices.extra;
    }
  }

  const houseBiome = house.biome;
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
