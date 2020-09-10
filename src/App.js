import React from "react";
import "./App.css";

class HouseList extends React.Component {
  render() {
    return (
      this.props.listOfHouses.map(listOfHouses => (
        <tr key={listOfHouses.houseId}>
          <td>{listOfHouses.houseId}</td>
          <td>{listOfHouses.name}</td>
          <td>{listOfHouses.biome}</td>
          {listOfHouses.house.map(house => (
            <tr key={house.npcId}>
              <td>{house.npcType}</td>
            </tr>
          ))}
        </tr>
      ))
    )
  }
}

class HouseTable extends React.Component {
  render() {
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
          <HouseList listOfHouses={this.props.listOfHouses}></HouseList>
        </tbody>
      </table>
    );
  }
}

class Generate extends React.Component {
  newButton() {
    return (
      <button className="generate" onClick={() => this.props.onClick()}>generate</button>
    )
  }

  render() {
    return <div>{this.newButton()}</div>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfHouses: [
        {
          houseId: Number,
          name: String,
          biome: String,
          house: [
            {
              npcId: Number,
              npcType: String,
            },
          ],
        },
      ],
    };
  }

  handleClick() {
    this.setState({ listOfHouses: [{ houseId: 0, name: "House 1", biome: "Forest", house: [{ npcId: 0, npcType: "Guide" }, { npcId: 1, npcType: "Zoo" }] }, { houseId: 1, name: "House 2", biome: "Desert", house: [{ npcId: 0, npcType: "Golfer" }, { npcId: 1, npcType: "Wizard" }] }] });
  }

  render() {
    console.log(this.state.listOfHouses);
    return (
      <div className="App">
        <header className="App-header">
          <p>Terraria House Project</p>
        </header>
        <Generate onClick={() => this.handleClick()}></Generate>
        <HouseTable listOfHouses={this.state.listOfHouses}></HouseTable>
      </div>
    );
  }
}

export default App;
