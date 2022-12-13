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

const WallComponent = (props: any) => {
  const background = props.background
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
        position: 'absolute',
        left: props.pos.x,
        top: props.pos.y,
        backgroundColor: background,
        width: props.width,
        height: props.height,
      }}
    />
  )
}

class Wall extends Entity {
  constructor(world: Matter.World, x: number, left?: true) {
    super(world)
    this.pos.x = x
    this.pos.y = 0
    ;(this.width = 10), (this.height = getScreenSize().height)
    this.background = 'yellow'
    this.renderer = <WallComponent />
    this.body = Matter.Bodies.rectangle(
      this.pos.x,
      this.pos.y,
      this.width,
      this.height,
      { isStatic: true, label: left ? 'WallLeft' : 'WallRight' }
    )
    Matter.World.add(this.world, this.body)
  }

  resetProps(screen: ScreenSize): void {
    this.width = 10
    this.height = screen.height
    this.body.position = this.pos;
    Matter.Body.setPosition(this.body, this.pos);
  }
}

export class LeftWall extends Wall {
  constructor(world: Matter.World) {
    super(world, 0, true)
  }
}

export class RightWall extends Wall {
  constructor(world: Matter.World) {
    super(world, getScreenSize().width - 10)
  }
}
