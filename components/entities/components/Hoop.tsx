import constants from '../constants'
import { Entity, ScreenSize } from '../interfaces'
import { getScreenSize } from '../../../helpers/getScreenSize'
import Matter from 'matter-js'
import { View, ImageBackground } from 'react-native'
import hoopImage from '../../../assets/hoop.png'

const HoopComponent = (props: any) => {
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
        source={hoopImage}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      />
    </View>
  )
}

interface IHoop {
  verges: Matter.Body[]
  ballInBasket: boolean
  setBallInBasket: (v: boolean) => void
}

export class Hoop extends Entity implements IHoop {
  verges: Matter.Body[]
  ballInBasket: boolean
  constructor(world: Matter.World) {
    const { width, height } = getScreenSize()
    const max = Math.max(width, height)
    super(world)
    this.height = 40
    this.width = 40
    this.pos.x = 50
    this.pos.y = getScreenSize().height - 250
    this.background = 'green'
    this.renderer = <HoopComponent />
    this.body = Matter.Bodies.rectangle(
      this.pos.x,
      this.pos.y,
      this.width,
      this.height,
      { isSensor: true, isStatic: true, label: 'Hoop' }
    )
    this.ballInBasket = false;
    this.verges = [
      Matter.Bodies.circle(
        this.pos.x - this.width / 2 + 2,
        this.pos.y - this.height / 2 - 2,
        2,
        { isStatic: true, friction: 1 }
      ),
      Matter.Bodies.circle(
        this.pos.x + this.width / 2 + 2,
        this.pos.y - this.height / 2 - 2,
        2,
        { isStatic: true, friction: 1 }
      ),
    ]
    Matter.World.add(world, this.verges[0])
    Matter.World.add(world, this.verges[1])
    Matter.World.add(this.world, this.body)
  }

  resetProps = (screen: ScreenSize): void => {
    this.height = 40
    this.width = 40
    this.pos.x = 50
    this.pos.y = screen.height - 150
    Matter.Body.setPosition(this.body, this.pos)
  }

  setBallInBasket (v: boolean) {
    this.ballInBasket = v;
  }
}
