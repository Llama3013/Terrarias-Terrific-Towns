import { Fade, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import Town from "./Town";

const styles = makeStyles(() => ({
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(345px, 1fr))",
    background: "no-repeat center",
  },
}));

/**
 * This renders a grid of all of the towns and maps them to their own town
 * @param {*} props
 */
export default function Towns(props) {
  const { townData } = props;
  const { npcCount, settings, towns } = townData;

  const classes = styles();
  return (
    <Paper className={classes.cardContainer} style={{ padding: "12px" }}>
      {towns.map((town) => (
        <Fade in={true} key={town.townId}>
          <Town
            delTown={(townId) => props.delTown(townId)}
            biomeChange={(townId, biome) => props.biomeChange(townId, biome)}
            addNPC={(townId) => props.addNPC(townId)}
            delNPC={(townId, npcId) => props.delNPC(townId, npcId)}
            npcChange={(townId, npcId, newNPCType) =>
              props.npcChange(townId, npcId, newNPCType)
            }
            pylonChange={(houseId, pylon) => props.pylonChange(houseId, pylon)}
            multiBiomeSwitch={(townId, npcId, multiBiome) =>
              props.multiBiomeSwitch(townId, npcId, multiBiome)
            }
            multiBiomeChange={(townId, npcId, biome) =>
              props.multiBiomeChange(townId, npcId, biome)
            }
            town={town}
            npcCount={npcCount}
            settings={settings}
            key={town.townId}
          ></Town>
        </Fade>
      ))}
    </Paper>
  );
}
