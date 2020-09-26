import React from "react";
import House from "./House";

export default function Houses(props) {
  const houses = props.houses;
  const houseRows = [];
  houses.forEach((house) => {
    houseRows.push(
      <House
        delHouse={(id) => props.delHouse(id)}
        onBiomeChange={(houseId, biome) => props.onBiomeChange(houseId, biome)}
        addNPC={(id) => props.addNPC(id)}
        delNPC={(houseId, npcId) => props.delNPC(houseId, npcId)}
        onNPCChange={(houseId, npcId, npc) =>
          props.onNPCChange(houseId, npcId, npc)
        }
        house={house}
        key={house.id}
      ></House>
    );
  });
  return <div className="House-table">{houseRows}</div>;
}
