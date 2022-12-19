import { TouchEvent } from 'react'
import Svg, { Circle, Rect, G, Path } from 'react-native-svg'

export default function ResetIcon({ onTouch }: { onTouch: any }) {
  return (
    <Svg
      width="21px"
      height="21px"
      viewBox="0 0 21 21"
      onTouchStart={onTouch}
      style={{
        position: 'absolute',
        zIndex: 5,
        top: 50,
        right: 50,

      }}
    >
      <G
        fill="none"
        fillRule="evenodd"
        stroke="yellow"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="matrix(0 1 1 0 2.5 2.5)"
      >
        <Path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8" />
        <Path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)" />
      </G>
    </Svg>
  )
}
