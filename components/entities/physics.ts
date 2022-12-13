import Matter from "matter-js";
import { getEntities } from ".";
import { getScreenSize } from "../../helpers/getScreenSize";

export const Physics = (entities: ReturnType<typeof getEntities>, { touches, time, dispatch } : any) => {

  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta)

  touches.filter(t => t.type === 'press').forEach(t => {
    entities.Ball.resetProps(getScreenSize())
  });

  return entities
}
