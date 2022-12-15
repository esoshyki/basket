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
      entities.Ball.setPosition({
        x: entities.Ball.body.position.x + deltaX,
        y: entities.Ball.body.position.y + deltaY,
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
