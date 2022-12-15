import constants from '../constants'
import { Entity, ScreenSize } from '../interfaces'
import { getScreenSize } from '../../../helpers/getScreenSize'
import Matter from 'matter-js'
import { View, ImageBackground } from 'react-native'
import { useAssets } from '../../../contexts/assetsContext'

const FloorComponent = (props: any) => {
  const { images } = useAssets()
  const background = props.background
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
        backgroundColor: background,
        width: widthBody,
        height: heightBody,
      }}
    >
      <ImageBackground
        source={images.floor}
        resizeMode="repeat"
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
    const { width, height } = getScreenSize()
    const max = Math.max(width, height)
    super(world)
    this.height = 20
    this.width = max
    this.pos.x = getScreenSize().width / 2
    this.pos.y = getScreenSize().height - 10
    this.background = 'green'
    this.renderer = <FloorComponent />
    this.body = Matter.Bodies.rectangle(
      this.pos.x,
      this.pos.y,
      this.width,
      this.height,
      { isSleeping: true, label: 'Floor', restitution: 0.8, friction: 0 }
    )
  }

  resetProps = (screen: ScreenSize): void => {
    this.pos.x = screen.height / 2
    this.pos.y = screen.height
    this.height = 20
    this.width = screen.width
    Matter.Body.setPosition(this.body, this.pos)
  }

  addToWorld(): void {
    Matter.World.add(this.world, this.body)
  }
}
