import { Grid } from "@material-ui/core";
import React from "react";
import House from "./House";

export default function Houses(props) {
  const houses = props.houses;
  return (
    <Grid container style={{ padding: "12px" }}>
      {houses.map((house) => (
        <Grid item xs={12} sm={8} md={6} lg={5} xl={4} className="House-table" key={house.id}>
          <House
            delHouse={(id) => props.delHouse(id)}
            onBiomeChange={(houseId, biome) =>
              props.onBiomeChange(houseId, biome)
            }
            addNPC={(id) => props.addNPC(id)}
            delNPC={(houseId, npcId) => props.delNPC(houseId, npcId)}
            onNPCChange={(houseId, npcId, npc) =>
              props.onNPCChange(houseId, npcId, npc)
            }
            house={house}
            key={house.id}
          ></House>
        </Grid>
      ))}
    </Grid>
  );
}
