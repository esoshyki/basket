import Matter from "matter-js";
import { Ball } from "./components/Ball";
import { Floor } from "./components/Floor";
import { LeftWall, RightWall } from "./components/Wall";

export const getEntities = () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 0.25;

  return {
    physics: { engine, world },
    Ball: new Ball(world),
    Floor: new Floor(world),
    WallLeft: new LeftWall(world),
    WallRight: new RightWall(world)
  };
};
