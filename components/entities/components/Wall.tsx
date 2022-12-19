import { ScreenSize, Entity } from '../interfaces'
import { getScreenSize } from '../../../helpers/getScreenSize'
import Matter from 'matter-js'
import { ImageBackground, View } from 'react-native'
import { useAssets } from '../../../contexts/assetsContext'
import { SCENE_HEIGHT, SCENE_WIDTH, WALLS_WIDTH } from '../constants'

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
  left?: true
  constructor(world: Matter.World, x: number, left?: true) {
    super(world)
    this.left = left;
    this.resetProps()
    this.renderer = <WallComponent />
    Matter.World.add(this.world, this.body)
  }

  resetProps(): void {
    this.width = WALLS_WIDTH
    this.height = SCENE_HEIGHT - 2 * WALLS_WIDTH
    this.pos.x = this.left ? WALLS_WIDTH / 2 : SCENE_WIDTH - WALLS_WIDTH / 2;
    this.pos.y = SCENE_HEIGHT / 2;
    if (!this.body) {
      this.body = Matter.Bodies.rectangle(
        this.pos.x,
        this.pos.y,
        this.width,
        this.height,
        { isStatic: true, label: this.left ? 'WallLeft' : 'WallRight', friction: 1 }
      )
    } else {
      this.body.position = {
        x: this.pos.x,
        y: this.pos.y
      }
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
