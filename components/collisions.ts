import Matter from 'matter-js'
import { Enteties } from './entities'
import { Splayer } from './entities/components/SoundPlayer'

export const addCollisionListener = (entities: Enteties) => {
  const ball = entities.Ball.body
  const floor = entities.Floor.body
  const leftWall = entities.WallLeft.body
  const rightWall = entities.WallRight.body
  const hoop = entities.Hoop.body
  const hoopVergeLeft = entities.Hoop.verges.leftVerge
  const hoopVergeRight = entities.Hoop.verges.rightVerge

  const splayer = new Splayer()

  const checkBodiesCollide = (
    pairs: Matter.Pair[],
    bodyA: Matter.Body,
    bodyB: Matter.Body,
    bodyC?: Matter.Body
  ) =>
    pairs.some(
      (pair) =>
        pair.bodyA === bodyA &&
        (bodyC
          ? pair.bodyB === bodyB || pair.bodyB === bodyC
          : pair.bodyB === bodyB)
    )

  Matter.Events.on(entities.physics.engine, 'collisionStart', (event) => {
    const { pairs } = event

    const actions = {
      ballKickWall: () => {
        splayer.playSound('ballKick')
      },
      ballKickFloor: () => {
        splayer.playSound('ballKick')
      },
    }

    const checkBallAndFloor = () => {
      const ballAndFloor = pairs.some(
        (pair) =>
          pair.bodyA.label === ball.label && pair.bodyB.label === floor.label
      )

      const ballKickTheFloor = ballAndFloor && ball.velocity.y > 1

      const ballsRolling =
        ballAndFloor && Math.abs(ball.velocity.x) > 1 && ball.velocity.y < 1

      if (ballKickTheFloor) {
        actions.ballKickFloor()
      }
    }

    const checkBallAndWalls = () => {
      const isBallKickWall = event.pairs.some(
        (pair) =>
          pair.bodyA === ball &&
          (pair.bodyB === leftWall || pair.bodyB === rightWall)
      )

      if (isBallKickWall && Math.abs(ball.velocity.x) > 2) {
        actions.ballKickWall()
      }
    }

    const checkBallAndHoopVergers = () => {
      const isKick = pairs.some(
        (pair) =>
          pair.bodyA === ball &&
          (pair.bodyB.label === hoopVergeLeft.label ||
            pair.bodyB.label === hoopVergeRight.label)
      )
      if (isKick && Math.abs(+ball.speed) > 2) {
        const maxVolumeSpeed = 10
        const volumeReduce =
          ball.speed > maxVolumeSpeed ? 1 : (maxVolumeSpeed - ball.speed) / 100

        splayer.playSound('hoop', 1 * volumeReduce)
      }
    }

    const checkBallAndHoop = () => {
      const isCollides = pairs.some(
        (pair) => pair.bodyA === ball && pair.bodyB === hoop
      )
      if (isCollides) {
        if (ball.bounds.max.y > hoop.bounds.max.y) {
          entities.Hoop.setBallEntersFromBottom(true)
        }
      }
    }

    checkBallAndFloor()
    checkBallAndWalls()
    checkBallAndHoopVergers()
    checkBallAndHoop()
  })

  Matter.Events.on(entities.physics.engine, 'collisionActive', (event) => {
    if (
      event.pairs.some((pair) => pair.bodyA === ball && pair.bodyB === hoop)
    ) {
      const isScored = entities.Hoop.ballCollides(ball)
      if (isScored) {
        splayer.playSound('score')
        entities.Statistic.addHit(entities.Ball.distance)
      }
    }
  })

  Matter.Events.on(entities.physics.engine, 'collisionEnd', (event) => {
    if (checkBodiesCollide(event.pairs, ball, hoop)) {
      entities.Hoop.setBallEntersFromBottom(false)
      entities.Hoop.setBallInNet(false)
    }
  })
}
