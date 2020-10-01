import { Fade, Grid } from "@material-ui/core";
import React from "react";
import House from "./House";

export default function Houses(props) {
  const { houses } = props;
  return (
    <Grid container style={{ padding: "12px" }}>
      {houses.map((house) => (
        <Fade in={true} key={house.houseId}>
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={5}
            xl={4}
            className="House-table"
            key={house.houseId}
          >
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
          </Grid>
        </Fade>
      ))}
    </Grid>
  );
}
