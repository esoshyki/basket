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

const FloorComponent = (props: any) => {
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

export class Floor extends Entity {
  constructor(world: Matter.World) {
    const { width, height } = getScreenSize();
    const max = Math.max(width, height);
    super(world)
    this.height = 20
    this.width = max * 3
    this.pos.x = 0
    this.pos.y = getScreenSize().height - 20
    this.background = 'green'
    this.renderer = <FloorComponent />
    this.body = Matter.Bodies.rectangle(
      this.pos.x,
      this.pos.y,
      this.width,
      this.height,
      { isSleeping: true, label: 'Floor', restitution: 1 }
    )
    console.log('floor width', this.width);
    Matter.World.add(this.world, this.body)
  }

  resetProps = (screen: ScreenSize): void => {
    this.pos.x = 0
    this.pos.y = screen.height - 20
    this.height = 20
    this.width = screen.width
    Matter.Body.setPosition(this.body, this.pos)
  }
}
