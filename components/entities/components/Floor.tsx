import { Entity } from '../interfaces'
import { getScreenSize } from '../../../helpers/getScreenSize'
import Matter from 'matter-js'
import { View, ImageBackground } from 'react-native'
import { useAssets } from '../../../contexts/assetsContext'
import { SCENE_HEIGHT, SCENE_WIDTH, WALLS_WIDTH } from '../constants'

const FloorComponent = (props: any) => {
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
        backgroundColor: "#000",
        width: widthBody,
        height: heightBody,
      }}
    >
      <ImageBackground
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/su-10-ee191.appspot.com/o/images%2Fasphalt.jpg?alt=media&token=a9e3abb0-7605-4974-b380-44e7ebb57e4a'}}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      />
    </View>
  )
}

export class Floor extends Entity {
  constructor(world: Matter.World) {
    super(world)
    this.resetProps()
    this.background = 'green'
    this.renderer = <FloorComponent />
  }

  resetProps = (): void => {
    this.pos.x = SCENE_WIDTH / 2
    this.pos.y = SCENE_HEIGHT - WALLS_WIDTH / 2
    this.height = WALLS_WIDTH
    this.width = SCENE_WIDTH
    if (!this.body) {
      this.body = Matter.Bodies.rectangle(
        this.pos.x,
        this.pos.y,
        this.width,
        this.height,
        { isSleeping: true, label: 'Floor', restitution: 0.8, friction: 0 }
      )
    }
    Matter.Body.setPosition(this.body, this.pos)
  }

  addToWorld(): void {
    Matter.World.add(this.world, this.body)
  }
}
