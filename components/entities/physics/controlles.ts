import Matter from 'matter-js'
import { getEntities } from '..'
import { getScreenSize } from '../../../helpers/getScreenSize'
import { SCENE_HEIGHT, SCENE_WIDTH, WALLS_WIDTH } from '../constants'

export const ContolsPhysics = (
  entities: ReturnType<typeof getEntities>,
  { touches, time, dispatch }: any
) => {
  let engine = entities.physics.engine
  Matter.Engine.update(engine, time.delta)

  entities.Statistic.calculateStatistic()

  if (
    entities.Ball.body.position.x < 0 - WALLS_WIDTH ||
    entities.Ball.body.position.x > SCENE_WIDTH + WALLS_WIDTH ||
    entities.Ball.body.position.y < 0 - WALLS_WIDTH ||
    entities.Ball.body.position.y > SCENE_HEIGHT + WALLS_WIDTH
  ) {
    entities.Ball.resetProps()
    Matter.Body.setVelocity(entities.Ball.body, { x: 0, y: 0 })
  }

  touches
    .filter((t) => t.type === 'start')
    .forEach((t) => {
      entities.Ball.setDistance(0)
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
      entities.Ball.setDistance(0)
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

  entities.Ball.calculateThrowingPath(time.delta)

  entities.Scene.camera.followTheBall()

  

  return entities
}
