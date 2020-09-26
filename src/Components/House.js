import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NPCs from "./NPCs";
import biomeList from "./data/json/biome.json";

function Biome(props) {
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
      value={props.house.biome}
      onChange={(biome) =>
        props.onBiomeChange(props.house.id, biome.target.value)
      }
    >
      {biomeRows}
    </select>
  );
}

export default function House(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
      margin: theme.spacing(1),
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
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
  }));
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };
  const house = props.house;
  const handleAddNPC = () => {
    setExpanded((prev) => {
      return prev ? prev : !prev;
    });
    return props.addNPC(house.id);
  };
  const classes = useStyles();
  const npcRows = [];
  house.npcs.forEach((npc) => {
    npcRows.push(
      <NPCs
        delNPC={(houseId, npcId) => props.delNPC(houseId, npcId)}
        onNPCChange={(houseId, npcId, npc) =>
          props.onNPCChange(houseId, npcId, npc)
        }
        npc={npc}
        houseId={house.id}
        key={npc.id}
      ></NPCs>
    );
  });
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
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
        <Button size="small" onClick={handleAddNPC}>
          Add NPC
        </Button>
        <IconButton
          className={expanded ? classes.expandOpen : classes.expand}
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
