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

      if (ballsRolling) {
        console.log("ball's rolling")
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

    checkBallAndFloor()
    checkBallAndWalls()
    checkBallAndHoopVergers()
  })
}
