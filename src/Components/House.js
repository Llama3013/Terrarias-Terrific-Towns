import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import preferences from "./data/json/prefrences.json";
import biomeList from "./data/json/biome.json";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  title: {
    fontSize: 14,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  pos: {
    marginBottom: 12,
  },
}));

class NPCType extends React.Component {
  render() {
    const npc = this.props.npc;
    const npcRows = [];
    preferences.forEach((npcPref) => {
      npcRows.push(<option key={npcPref.type}>{npcPref.type}</option>);
    });
    return (
      <select
        value={npc.type}
        onChange={(npcType) =>
          this.props.onNPCChange(npc.id, npcType.target.value)
        }
      >
        {npcRows}
      </select>
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
    const classes = useStyles;
    const npc = this.props.npc;
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            <NPCType
              delNPC={(npcId) => this.delNPC(npcId)}
              onNPCChange={(npcId, npc) => this.onNPCChange(npcId, npc)}
              key={npc.id}
              npc={npc}
            ></NPCType>
          </Typography>
          <Typography variant="h5" component="h2">
            <Price key={npc.id} price={npc.price}></Price>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => this.props.delNPC(npc.id)}>
            Delete NPC
          </Button>
        </CardActions>
      </Card>
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

function HouseRow(props) {
  const classes = useStyles;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const house = props.house;
  const npcRows = [];
  house.npcs.forEach((npc) => {
    npcRows.push(
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
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {house.name}
        </Typography>
        <Typography variant="h5" component="h2">
          <Biome
            onBiomeChange={(houseId, biome) =>
              props.onBiomeChange(houseId, biome)
            }
            house={house}
          ></Biome>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.delHouse(house.id)}>
          Delete House
        </Button>
        <Button size="small" onClick={() => props.addNPC(props.house.id)}>
          Add NPC
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {npcRows}
      </Collapse>
    </Card>
  );
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
    });
    return <div className="House-table">{houseRows}</div>;
  }
}

export default HouseTable;
