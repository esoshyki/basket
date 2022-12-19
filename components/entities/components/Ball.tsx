import { BALL_SIZE, SCENE_HEIGHT, SCENE_WIDTH } from '../constants'
import { Position, ScreenSize } from '../interfaces'
import { getScreenSize } from '../../../helpers/getScreenSize'
import Matter from 'matter-js'
import { View, ImageBackground } from 'react-native'
import { Entity } from './Enitity'
import { useAssets } from '../../../contexts/assetsContext'

const BallComponent = (props: any) => {
  const { images } = useAssets()
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

  const xBody = props.body.position.x - widthBody / 2
  const yBody = props.body.position.y - heightBody / 2

  const background = props.background

  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: '#fff',
        borderStyle: 'solid',
        position: 'absolute',
        left: xBody,
        top: yBody,
        backgroundColor: background,
        width: widthBody,
        height: heightBody,
        borderRadius: widthBody / 2,
      }}
    >
      <ImageBackground
        source={images.ball}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      />
    </View>
  )
}

export class Ball extends Entity {
  distance: number
  constructor(world: Matter.World) {
    super(world)
    this.resetProps()
    this.background = 'red'
    this.renderer = <BallComponent />
    this.distance = 0
  }

  resetProps = (): void => {
    this.pos.x = 200 + Math.abs(Math.random() * (SCENE_WIDTH - 200))
    this.pos.y = 200 + Math.abs(Math.random() * (SCENE_HEIGHT - 200))
    this.width = BALL_SIZE
    this.height = BALL_SIZE
    if (!this.body) {
      this.body = Matter.Bodies.circle(this.pos.x, this.pos.y, 10, {
        label: 'Ball',
        restitution: 0.8,
        density: 0.0005,
        friction: 0.8,
        frictionAir: 0,
      })
    }
    Matter.Body.setPosition(this.body, this.pos)
  }

  setDistance = (n: number) => {
    this.distance = n
  }

  calculateThrowingPath = (timeDelta: number) => {

    this.setDistance(this.distance + this.body.angularSpeed * timeDelta * 0.235 / BALL_SIZE)
  }

  stop() {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 })
  }
}
