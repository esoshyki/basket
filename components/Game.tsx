import { useEffect, useState } from "react";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import { Physics } from "./entities/physics";

export default function Game() {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRunning(true);
  }, []);
  
  return (
    <GameEngine
      entities={entities()}
      running={running}
      systems={[Physics]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    ></GameEngine>
  );
}
