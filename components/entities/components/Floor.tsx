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
        top: props.pos.y,
        backgroundColor: background,
        width: props.width,
        height: props.height,
      }}
    />
  );
};

function Floor(props: GameEntityProps): any {
  const initalFloor = Matter.Bodies.rectangle(
    props.pos.x,
    props.pos.y + constants.BALL_SIZE,
    props.width,
    props.height,
    { label: "Floor", isStatic: true }
  );
  Matter.World.add(props.world, initalFloor);
  return {
    body: initalFloor,
    ...props,
    renderer: <FloorComponent />,
  };
}


export const createFloor = (world: Matter.World) => {

  const { height, width } = getScreenSize()



  return Floor({
    world,
    background: "green",
    pos: {
      x: 0,
      y: height - 30,
    },
    width: width,
    height: 20,
  });
};
