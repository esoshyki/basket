import Matter from "matter-js";
import { getInitialBallPosition } from "./components/Ball";

export const Physics = (entities: any, { touches, time, dispatch } : any) => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta)

  touches.filter(t => t.type === 'press').forEach(t => {
    Matter.Body.setPosition(entities.Ball.body, getInitialBallPosition())
  });

  return entities
}
