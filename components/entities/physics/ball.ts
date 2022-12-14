import Matter from 'matter-js'
import { getEntities } from '..'

export const BallPhysics = (
  entities: ReturnType<typeof getEntities>,
  { touches, time, dispatch }: any
) => {
  let engine = entities.physics.engine
  Matter.Engine.update(engine, time.delta)
  // If ball touches floor play kick sound
  if (
    Matter.Collision.collides(
      entities.Ball.body,
      entities.Floor.body,
      undefined
    ) ||
    Matter.Collision.collides(
      entities.Floor.body,
      entities.Ball.body,
      undefined
    )
  ) {
    if (Math.abs(entities.Ball.body.velocity.y) > 1) {
      entities.Sound.playSound('ballKick')
    }
  }

  // If ball touches walls play kick sound
  if (
    Matter.Collision.collides(
      entities.Ball.body,
      entities.WallLeft.body,
      undefined
    ) ||
    Matter.Collision.collides(
      entities.Ball.body,
      entities.WallLeft.body,
      undefined
    )
  ) {
    entities.Sound.playSound('ballKick')
  }

  // If ball touches hoop play hoop sound
  if (
    Matter.Collision.collides(
      entities.Ball.body,
      entities.Hoop.verges[0],
      undefined
    ) ||
    Matter.Collision.collides(
      entities.Ball.body,
      entities.Hoop.verges[1],
      undefined
    )
  ) {
    entities.Sound.playSound('hoop')
  }

  // If scores
  if (
    Matter.Collision.collides(entities.Ball.body, entities.Hoop.body, undefined)
  ) {
    if (!entities.Hoop.ballInBasket) {
      entities.Sound.playSound('score');
      entities.Hoop.setBallInBasket(true)
    }

  } else {
    if (entities.Hoop.ballInBasket) {
      entities.Hoop.setBallInBasket(false)
    }
  }

  touches.filter((t) => t.type === 'move').forEach((t) => {})

  return entities
}
