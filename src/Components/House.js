import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core/";
import { ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import NPCs from "./NPCs";
import Biome from "./Biome";

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

export default function House(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };
  const handleCheckedClick = () => {
    setChecked((prev) => !prev);
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
        <div>
          <TextField
            size="small"
            id="house-name"
            label="House Name"
            defaultValue={house.name}
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckedClick}
                name="link-checked"
                color="primary"
              />
            }
            label="Linked house"
          />
        </div>
        <div>
          <Biome
            onBiomeChange={(houseId, biome) =>
              props.onBiomeChange(houseId, biome)
            }
            biome={house.biome}
            id={house.id}
          ></Biome>
        </div>
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
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <CardContent>
          {npcRows}
          <TextField
            size="medium"
            id="notes"
            label="notes"
            variant="outlined"
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
