import React from "react";

import preferences from "./data/json/prefrences.json";
import biomeList from "./data/json/biome.json";

class NPCType extends React.Component {
  render() {
    const npc = this.props.npc;
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

class Price extends React.Component {
  render() {
    const price = this.props.price;
    return <p>{price}</p>;
  }
}

class NPCRow extends React.Component {
  onNPCChange(npcId, npc) {
    return this.props.onNPCChange(this.props.houseId, npcId, npc);
  }

  delNPC(npcId) {
    return this.props.delNPC(this.props.houseId, npcId);
  }

  render() {
    const npc = this.props.npc;
    return (
      <tr>
        <td></td>
        <td></td>
        <td>
          <NPCType
            delNPC={(npcId) => this.delNPC(npcId)}
            onNPCChange={(npcId, npc) => this.onNPCChange(npcId, npc)}
            key={npc.id}
            npc={npc}
          ></NPCType>
        </td>
        <td>
          <Price key={npc.id} price={npc.price}></Price>
        </td>
        <td></td>
      </tr>
    );
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
  render() {
    const house = this.props.house;
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
        <td></td>
        <td></td>
        <td>
          <button onClick={() => this.props.delHouse(house.id)}>
            Delete House
          </button>
          <button onClick={() => this.props.addNPC(this.props.house.id)}>
            Add NPC
          </button>
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
          onBiomeChange={(houseId, biome) =>
            this.props.onBiomeChange(houseId, biome)
          }
          addNPC={(id) => this.props.addNPC(id)}
          house={house}
          key={house.id}
        ></HouseRow>
      );
      house.npcs.forEach((npc) => {
        houseRows.push(
          <NPCRow
            delNPC={(houseId, npcId) => this.props.delNPC(houseId, npcId)}
            onNPCChange={(houseId, npcId, npc) =>
              this.props.onNPCChange(houseId, npcId, npc)
            }
            npc={npc}
            houseId={house.id}
            key={npc.id}
          ></NPCRow>
        );
      });
    });
    return (
      <div className="House-table">
        <table>
          <thead>
            <tr>
              <th> Name </th>
              <th> Biome </th>
              <th> Npc </th>
              <th> Price </th>
              <th> Options</th>
            </tr>
          </thead>
          <tbody>{houseRows}</tbody>
        </table>
      </div>
    );
  }
}

export default HouseTable;
