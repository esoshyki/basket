import { BALL_SIZE, SCENE_HEIGHT, SCENE_WIDTH } from '../constants'
import { Position, ScreenSize } from '../interfaces'
import { getScreenSize } from '../../../helpers/getScreenSize'
import Matter from 'matter-js'
import { View, ImageBackground } from 'react-native'
import { Entity } from './Enitity'
import { useAssets } from '../../../contexts/assetsContext'

const BallComponent = (props: Ball) => {
  const { images } = useAssets()
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

  const max = Math.max(props.width, props.height);

  const xBody = props.body.position.x - widthBody / 2
  const yBody = props.body.position.y - heightBody / 2

  const background = props.background
  const rotate =180 * props.body.angle / Math.PI;


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
        transform: [{ rotate: `${rotate}deg`}],
        width: props.width,
        height: props.height,
        borderRadius: max / 2,
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
    this.renderer = <BallComponent {...this} />
    this.distance = 0
  }

  resetProps = (): void => {
    this.pos.x = 200 + Math.abs(Math.random() * (SCENE_WIDTH - 200))
    this.pos.y = 200 + Math.abs(Math.random() * (SCENE_HEIGHT - 200))
    this.width = BALL_SIZE
    this.height = BALL_SIZE
    if (!this.body) {
      this.body = Matter.Bodies.circle(this.pos.x, this.pos.y, BALL_SIZE / 2, {
        label: 'Ball',
        restitution: 0.8,
        density: 0.0005,
        frictionStatic: 0,
        friction: 0.8,
      })
    }
    Matter.Body.setPosition(this.body, this.pos)
  }

  setDistance = (n: number) => {
    this.distance = n
  }

  calculateThrowingPath = (timeDelta: number) => {

    this.setDistance(this.distance + this.body.speed * timeDelta * 0.0235 / BALL_SIZE)
  }

  stop() {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 })
  }
}
