import React from "react";
import "./App.css";

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
    let x, y;
    for (x = 0; x < houses.length; x++) {
      for (y = 0; y < houses[x].npcs.length; y++) {
        houses[x].npcs[y].happy = happiness(houses, x, y);
      }
    }
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Terraria House Project</p>
        </header>
        <HouseTable houses={this.props.houses}></HouseTable>
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
function happiness(houses, houseIndex, npcIndex) {
  let happinessValue = 1;
  const currentNPCType = houses[houseIndex].npcs[npcIndex].type;
  const npcPrefs = preferences.find(
    (preference) => preference.type === currentNPCType
  );
  const houseBiome = houses[houseIndex].biome;
  if (houseBiome === npcPrefs.biome.loves) {
    happinessValue *= prices.loves;
  } else if (houseBiome === npcPrefs.biome.likes) {
    happinessValue *= prices.likes;
  } else if (houseBiome === npcPrefs.biome.dislikes) {
    happinessValue *= prices.dislikes;
  } else if (houseBiome === npcPrefs.biome.hates) {
    happinessValue *= prices.hates;
  }
  let i = 0;
  for (i = 0; i < houses[houseIndex].npcs.length; i++) {
    if (npcPrefs.neighbour.loves.includes(houses[houseIndex].npcs[i].type)) {
      happinessValue *= prices.loves;
    } else if (
      npcPrefs.neighbour.likes.includes(houses[houseIndex].npcs[i].type)
    ) {
      happinessValue *= prices.likes;
    } else if (
      npcPrefs.neighbour.dislikes.includes(houses[houseIndex].npcs[i].type)
    ) {
      happinessValue *= prices.dislikes;
    } else if (
      npcPrefs.neighbour.hates.includes(houses[houseIndex].npcs[i].type)
    ) {
      happinessValue *= prices.hates;
    }
  }
  //Need to add tick boxes for Two or more other NPCs within 25 tiles (for each additional NPC)
  //and another for No more than one other NPC within 25 tiles and no more than three other NPCs
  //(not counting the NPCs within 25 tiles) within 120 tiles
  return happinessValue;
}

//Need to move this somewhere cleaner
const prices = {
  loves: 0.9,
  likes: 0.95,
  dislikes: 1.05,
  hate: 1.1,
  extra: 1.04,
  couple: 0.9,
};

//Need to move this somewhere cleaner
const preferences = [
  {
    type: "Guide",
    biome: { likes: "Forest", dislikes: "Ocean" },
    neighbour: {
      loves: [],
      likes: ["Clothier", "Zoo"],
      dislikes: ["Steampunker"],
      hates: ["Painter"],
    },
  },
  {
    type: "Zoo",
    biome: { likes: "Forest", dislikes: "Desert" },
    neighbour: {
      loves: ["Witch"],
      likes: ["Golfer"],
      dislikes: ["Angler"],
      hates: ["Arms"],
    },
  },
  {
    type: "Golfer",
    biome: { likes: "Forest", dislikes: "Underground" },
    neighbour: {
      loves: ["Angler"],
      likes: ["Painter", "Zoo"],
      dislikes: ["Pirate"],
      hates: ["Merchant"],
    },
  },
  {
    type: "Wizard",
    biome: { likes: "Hallow", dislikes: "Ocean" },
    neighbour: {
      loves: ["Golfer"],
      likes: ["Merchant"],
      dislikes: ["Witch"],
      hates: ["Cyborg"],
    },
  },
];

export default App;
