import { ScreenSize, Entity } from '../interfaces'
import { getScreenSize } from '../../../helpers/getScreenSize'
import Matter from 'matter-js'
import { ImageBackground, View } from 'react-native'
import { useAssets } from '../../../contexts/assetsContext'

const WallComponent = (props: any) => {
  const { images } = useAssets()
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

  const xBody = props.body.position.x - widthBody / 2
  const yBody = props.body.position.y - heightBody / 2

  return (
    <View
      style={{
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    >
      <ImageBackground
        source={images.bricks}
        resizeMode="repeat"
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          justifyContent: 'center',
        }}
      />
    </View>
  )
}

class Wall extends Entity {
  constructor(world: Matter.World, x: number, left?: true) {
    super(world)
    this.pos.x = x
    this.width = 50
    this.height = getScreenSize().height * 2
    this.pos.y = 0
    this.background = 'yellow'
    this.renderer = <WallComponent />
    this.body = Matter.Bodies.rectangle(
      this.pos.x,
      this.pos.y,
      this.width,
      this.height,
      { isStatic: true, label: left ? 'WallLeft' : 'WallRight', friction: 1 }
    )
    Matter.World.add(this.world, this.body)
  }

  resetProps(screen: ScreenSize): void {
    this.width = 50
    this.height = screen.height * 2
    this.body.position = {
      x: this.pos.x,
      y: 0,
    }
    Matter.Body.setPosition(this.body, this.pos)
  }
}

export class LeftWall extends Wall {
  constructor(world: Matter.World) {
    super(world, 0, true)
  }
}

export class RightWall extends Wall {
  constructor(world: Matter.World) {
    super(world, getScreenSize().width)
  }
}
