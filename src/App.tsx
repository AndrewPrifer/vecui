import React from "react";
import { vec, rect, Rect } from "../lib/main";
import { motion } from "framer-motion";
import { useControls } from "leva";

/*
A simple example of the kind of layout code that can quickly become unrreadable spaghetti. Not with VecUI.

The goal is to have a yellow div centered in the middle of the screen, and a pink div aligned to the right of it.
The pink div should expand on hover by a set amount of pixels regardless of its size. Optionally, it should keep its padding to the yellow div on hover.
*/
function App() {
  // Parameters
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

  // How much the pink div will expand on hover on either direction
  const hoverExpandVec = vec(hoverExpand);

  let alignedRect: Rect | null = null;

  // Create a vector for the dimensions of the yellow div
  const centerRectDim = vec(centerRectSize);
  // Create a rect representing the yellow div and offset it by minus half its dimensions so that it's centered
  const centerRect = rect(centerRectDim.div(-2), centerRectDim);

  // Create a rect for the pink div
  const otherRect = rect(vec(0), vec(otherRectSize));

  // Align it to the right side of the yellow div by
  alignedRect = otherRect.setO(
    centerRect.o
      // offsetting its origin by the width of the yellow div
      .add(centerRect.d.x, 0)
      // adding the padding in the x direction and
      .add(
        padding,
        // centering it vertically
        centerRect.d.sub(otherRect.d).div(2).y
      )
  );

  return (
    <div className="container">
      <div
        className="center rect"
        style={{
          // apply the yellow div's rect
          ...centerRect.as.css,
        }}
      />
      <motion.div
        className="other rect"
        initial={false}
        animate={{
          // apply the pink div's rect
          ...alignedRect.as.css,
        }}
        whileHover={{
          // while hovered, expand the pink div by
          ...rect(
            // negatively offsetting its origin by the hover expand vector (only in the y direction if keepAlignedOnHover is true by zeroing the x component)
            alignedRect.o.sub(
              hoverExpandVec.mul(keepAlignedOnHover ? 0 : 1, 1)
            ),
            // adding the hover expand vector to its dimensions (twice because it's being added to both sides)
            alignedRect.d.add(hoverExpandVec.mul(2))
          ).as.css,
        }}
      >
        Hover me!
      </motion.div>
    </div>
  );
}

export default App;
