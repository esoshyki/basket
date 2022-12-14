import {
  InitialProps,
  GameEntityProps,
  ScreenSize,
  Entity,
  IEntity,
  Position,
} from '../interfaces'
import { getScreenSize } from '../../../helpers/getScreenSize'
import Matter from 'matter-js'
import { View } from 'react-native'

const CeilingComponent = (props: any) => {
  const background = props.background
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

  const xBody = props.body.position.x - widthBody / 2
  const yBody = props.body.position.y - heightBody / 2

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
      }}
    />
  )
}

export class Ceiling extends Entity {
  constructor(world: Matter.World) {
    super(world)
    this.pos.x = getScreenSize().width / 2
    this.height = 10
    this.width = getScreenSize().width
    this.pos.y = -getScreenSize().height + 10

    this.background = 'yellow'
    this.renderer = <CeilingComponent />
    this.body = Matter.Bodies.rectangle(
      this.pos.x,
      this.pos.y,
      this.width,
      this.height,
      { isStatic: true, label: 'Celining', friction: 1 }
    )
    Matter.World.add(this.world, this.body)
  }

  resetProps(screen: ScreenSize): void {
    this.pos.x = screen.width / 2
    this.height = 10
    this.width = screen.width
    this.pos.y = -screen.height + this.width
    Matter.Body.setPosition(this.body, this.pos)
  }
}
