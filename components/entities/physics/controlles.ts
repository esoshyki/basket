import Matter from 'matter-js'
import { getEntities } from '..'
import { getScreenSize } from '../../../helpers/getScreenSize'

export const ContolsPhysics = (
  entities: ReturnType<typeof getEntities>,
  { touches, time, dispatch }: any
) => {
  let engine = entities.physics.engine
  Matter.Engine.update(engine, time.delta)

  entities.Statistic.calculateStatistic()

  if (entities.Ball.pos.x < 0 - 20 || entities.Ball.pos.x > getScreenSize().width + 20 || entities.Ball.pos.y < -20 || entities.Ball.pos.y > getScreenSize().height * 2 + 20) {
    entities.Ball.resetProps()
  }

  touches
    .filter((t) => t.type === 'start')
    .forEach((t) => {
      entities.Controls.setTouchStart({
        time: new Date(),
        pos: {
          x: t.event.pageX,
          y: t.event.pageY,
        },
      })
    })

  touches
    .filter((t) => t.type === 'move')
    .forEach((t) => {
      const deltaX = t.delta.pageX
      const deltaY = t.delta.pageY
      Matter.Body.applyForce(entities.Ball.body, entities.Ball.body.position, {
        x: deltaX * 0.00003,
        y: deltaY * 0.00003,
      })
    })

  touches
    .filter((t) => t.type === 'end')
    .forEach((t) => {
      entities.Controls.setTouchEnd({
        time: new Date(),
        pos: {
          x: t.event.pageX,
          y: t.event.pageY,
        },
      })
      entities.Controls.useForce(entities.Ball.body)
    })

  return entities
}
