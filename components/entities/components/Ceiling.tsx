import { Entity } from '../interfaces'
import Matter from 'matter-js'
import { ImageBackground, View } from 'react-native'
import { SCENE_WIDTH, WALLS_WIDTH } from '../constants'
import BricksPng from '../../../assets/bricks.png'

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
    >
      <ImageBackground source={BricksPng} resizeMode="repeat" style={{
        flex: 1,
        width: '100%',
        height: '100%'
      }}/>
    </View>
  )
}

export class Ceiling extends Entity {
  constructor(world: Matter.World) {
    super(world)
    this.resetProps()
    this.background = 'yellow'
    this.renderer = <CeilingComponent />
  }

  resetProps(): void {
    this.pos.x = SCENE_WIDTH / 2
    this.height = WALLS_WIDTH
    this.width = SCENE_WIDTH
    this.pos.y = WALLS_WIDTH / 2
    if (!this.body) {
      this.body = Matter.Bodies.rectangle(
        this.pos.x,
        this.pos.y,
        this.width,
        this.height,
        { isStatic: true, label: 'Celining', friction: 1 }
      )
    }
    Matter.Body.setPosition(this.body, this.pos)
  }
}
