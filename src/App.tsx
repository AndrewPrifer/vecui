import React from "react";
import { vec, rect, UIRect } from "../lib/main";
import { motion } from "framer-motion";
import { useControls } from "leva";

function App() {
  const {
    padding,
    hoverExpand,
    centerRectSize,
    otherRectSize,
    keepAlignedOnHover,
  } = useControls({
    padding: { value: 16, min: 0, max: 100 },
    centerRectSize: {
      value: { x: 200, y: 200 },
      step: 1,
    },
    otherRectSize: {
      value: { x: 150, y: 150 },
      step: 1,
    },
    keepAlignedOnHover: false,
    hoverExpand: {
      value: {
        x: 8,
        y: 8,
      },
      step: 1,
    },
  });

  const hoverExpandVec = vec(hoverExpand);

  let alignedRect: UIRect | null = null;

  const centerRectDim = vec(centerRectSize);
  const centerRect = rect(centerRectDim.div(-2), centerRectDim);

  const otherRect = rect(vec(0), vec(otherRectSize));
  alignedRect = rect(
    centerRect.o
      .add(centerRect.d.x, 0)
      .add(padding, centerRect.d.sub(otherRect.d).div(2).y),
    otherRect.d
  );

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        className="center rect"
        style={{
          ...centerRect.as.css,
        }}
      />
      {alignedRect && (
        <motion.div
          className="other rect"
          initial={false}
          animate={{
            ...alignedRect.as.css,
          }}
          whileHover={{
            ...rect(
              alignedRect.o.sub(
                hoverExpandVec.mul(keepAlignedOnHover ? 0 : 1, 1)
              ),
              alignedRect.d.add(hoverExpandVec.mul(2))
            ).as.css,
          }}
        >
          Hover me!
        </motion.div>
      )}
    </div>
  );
}

export default App;
