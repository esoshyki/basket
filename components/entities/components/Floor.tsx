import constants from "../constants";
import { GameEntityProps, Position } from "../interfaces";
import { getScreenSize } from "../../../helpers/getScreenSize";
import Matter from "matter-js";
import { View } from "react-native";

const FloorComponent = (props: any) => {

  const background = props.background;



  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: "solid",
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: background,
        width: props.width / 2,
        height: props.height,
      }}
    />
  );
};

function Floor(props: GameEntityProps): any {
  const initialBall = Matter.Bodies.rectangle(
    props.pos.x,
    props.pos.y,
    props.width,
    props.height,
    { label: "Floor", isStatic: true, restitution: 1 }
  );
  Matter.World.add(props.world, initialBall);
  return {
    body: initialBall,
    ...props,
    renderer: <FloorComponent />,
  };
}


export const createFloor = (world: Matter.World) => {

  const { height } = getScreenSize()

  return Floor({
    world,
    background: "green",
    pos: {
      x: 0,
      y: 0
    },
    width: 20,
    height: height,
  });
};
