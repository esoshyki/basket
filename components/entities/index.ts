import Matter from "matter-js";
import { createBall } from "./components/Ball";
import { createFloor } from "./components/Floor";

export default () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  world.gravity.x = -0.3;
  world.gravity.y = 0;

  return {
    physics: { engine, world },
    Ball: createBall(world),
    Floor: createFloor(world)
  };
};
