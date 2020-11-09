import * as THREE from "three";
import React from "react";
import { useThree } from "react-three-fiber";
import { useControl } from "react-three-gui";
import font from "../utils/fonts/Voice_in_my_head.otf"
import { Text } from "drei";

const ProjectTitle = ({ title }) => {
  const { viewport } = useThree();
  const fontSize = useControl("fontSize", { type: "number", value: 100, min: 1, max: 100 })
  const maxWidth = useControl("maxWidth", { type: "number", value: 2000, min: 1, max: 80 })
  const lineHeight = useControl("lineHeight", { type: "number", value: -0.05, min: 0.1, max: 10 })
  const letterSpacing = useControl("spacing", { type: "number", value: 0, min: -0.5, max: 1 })
  const textAlign = useControl("textAlign", {
    type: "center",
    items: ["left", "right", "center", "justify"],
    value: "center",
  })

  return (
    <>
      <pointLight key="light" position={[0, 0, 400]} power={50}/>
      <Text
        position={[ -viewport.width/2 * 0.9, viewport.height * 1.3, 0]}
        fontSize={fontSize}
        maxWidth={maxWidth}
        lineHeight={lineHeight}
        letterSpacing={letterSpacing}
        textAlign={textAlign}
        font={font}
        anchorX="left"
      >
        {title}
        <meshStandardMaterial
          attach="material"
          color="gray"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </Text>
    </>
  )
}

export default ProjectTitle;
