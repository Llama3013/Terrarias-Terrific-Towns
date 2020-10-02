import { Fade, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import House from "./House";

const styles = makeStyles((theme) => ({
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(345px, 1fr))",
  },
}));

export default function Houses(props) {
  const { houses } = props;

  const classes = styles();
  return (
    <Grid
      className={classes.cardContainer}
      container
      style={{ padding: "12px" }}
    >
      {houses.map((house) => (
        <Fade in={true} key={house.houseId}>
          <House
            delHouse={(houseId) => props.delHouse(houseId)}
            onBiomeChange={(houseId, biome) =>
              props.onBiomeChange(houseId, biome)
            }
            addNPC={(houseId) => props.addNPC(houseId)}
            delNPC={(houseId, npcId) => props.delNPC(houseId, npcId)}
            onNPCChange={(houseId, npcId, newNPCType) =>
              props.onNPCChange(houseId, npcId, newNPCType)
            }
            house={house}
            key={house.houseId}
          ></House>
        </Fade>
      ))}
    </Grid>
  );
}
