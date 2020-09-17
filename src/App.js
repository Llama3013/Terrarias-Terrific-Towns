import React from "react";
import "./App.css";

class NPCs extends React.Component {
  render() {
    const npc = this.props.npcs;
    const type = npc.type;
    return <p>{type}</p>;
  }
}

class HouseRow extends React.Component {
  render() {
    const house = this.props.house;
    const npcRows = [];
    house.npcs.forEach((npc) => {
      npcRows.push(
        <NPCs key={npc.id} npcs={npc}></NPCs>
      );
    });
    return (
      <tr>
        <td>{house.id}</td>
        <td>{house.name}</td>
        <td>{house.biome}</td>
        <td>
          {npcRows}
        </td>
      </tr>
    );
  }
}

class HouseTable extends React.Component {
  render() {
    const houseRows = [];
    this.props.houses.forEach((house) => {
      houseRows.push(
        <HouseRow
          house={house}
          key={house.id}
        ></HouseRow>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th> Id </th>
            <th> Name </th>
            <th> Biome </th>
            <th> Npc Type </th>
          </tr>
        </thead>
        <tbody>
          {houseRows}
        </tbody>
      </table>
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

export default App;
