import { Fade, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Town from "./Town";

const styles = makeStyles((theme) => ({
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(345px, 1fr))",
  },
}));

export default function Towns(props) {
  const { towns } = props;

  const classes = styles();
  return (
    <Grid
      className={classes.cardContainer}
      container
      style={{ padding: "12px" }}
    >
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
            town={town}
            key={town.townId}
          ></Town>
        </Fade>
      ))}
    </Grid>
  );
}
