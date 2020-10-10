import { Fade, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import Town from "./Town";

const styles = makeStyles((theme) => ({
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(345px, 1fr))",
    background: "no-repeat center",
  },
}));

export default function Towns(props) {
  const { towns } = props;

  const classes = styles();
  return (
    <Paper className={classes.cardContainer} style={{ padding: "12px" }}>
      {towns.map((town) => (
        <Fade in={true} key={town.townId}>
          <Town
            delTown={(townId) => props.delTown(townId)}
            onBiomeChange={(townId, biome) =>
              props.onBiomeChange(townId, biome)
            }
            addNPC={(townId) => props.addNPC(townId)}
            delNPC={(townId, npcId) => props.delNPC(townId, npcId)}
            onNPCChange={(townId, npcId, newNPCType) =>
              props.onNPCChange(townId, npcId, newNPCType)
            }
            pylonChange={(houseId, pylon) => props.pylonChange(houseId, pylon)}
            town={town}
            key={town.townId}
          ></Town>
        </Fade>
      ))}
    </Paper>
  );
}
