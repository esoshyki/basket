import constants from '../constants'
import { ScreenSize } from '../interfaces'
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
        borderWidth: 1,
        borderColor: '#000',
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
  constructor(world: Matter.World) {
    super(world)
    this.pos.x = (getScreenSize().width - constants.BALL_SIZE) / 2
    this.pos.y = (getScreenSize().height - constants.BALL_SIZE) / 2
    this.width = 10
    this.height = 10
    this.background = 'red'
    this.body = Matter.Bodies.circle(this.pos.x, this.pos.y, 10, {
      label: 'Ball',
      restitution: 0.8,
      density: 0.0005,
      friction: 0.8,
      frictionAir: 0,
    })
    this.renderer = <BallComponent />

  }

  resetProps = (screen: ScreenSize): void => {
    this.pos.x = (screen.width - constants.BALL_SIZE) / 2
    this.pos.y = (screen.height - constants.BALL_SIZE) / 2
    Matter.Body.setPosition(this.body, this.pos)
  }

  stop() {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0})
  }
}
