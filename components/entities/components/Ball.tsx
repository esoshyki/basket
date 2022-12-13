import constants from '../constants'
import {
  Entity,
  GameEntityProps,
  InitialProps,
  Position,
  ScreenSize,
} from '../interfaces'
import { getScreenSize } from '../../../helpers/getScreenSize'
import Matter from 'matter-js'
import { View } from 'react-native'

const BallComponent = (props: any) => {
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
    />
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
      restitution: 1,
      density: 0.0005
    })
    this.renderer = <BallComponent />
    Matter.World.add(this.world, this.body)
  }

  resetProps = (screen: ScreenSize): void => {
    this.pos.x = (screen.width - constants.BALL_SIZE) / 2
    this.pos.y = (screen.height - constants.BALL_SIZE) / 2
    Matter.Body.setPosition(this.body, this.pos)
  }
}
