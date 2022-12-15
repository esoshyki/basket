import Matter from "matter-js";
import { getEntities } from "..";
import { getScreenSize } from "../../../helpers/getScreenSize";

export const ContolsPhysics = (entities: ReturnType<typeof getEntities>, { touches, time, dispatch } : any) => {

  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta)

  touches.filter(t => t.type === 'start').forEach(t => {
    console.log(engine.gravity.y);
    entities.Controls.setTouchStart({
      time: new Date(),
      pos: {
        x: t.event.pageX,
        y: t.event.pageY
      }
    })
  });

  touches.filter(t => t.type === 'end').forEach(t => {
    entities.Controls.setTouchEnd({
      time: new Date(),
      pos: {
        x: t.event.pageX,
        y: t.event.pageY
      }
    })
    entities.Controls.useForce(entities.Ball.body)
  });


  return entities
}
