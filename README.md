# VecUI

Tiny, ergonomic and fun vector library for UI engineers.

## Why?

UIs are made of rectangles. Rectangles are made of 2 vectors. One for describing their origin point, and another for describing their width and height. Treating them as vectors instead of 4 disjointed numbers makes it much easier to reason about them and can trivially cut complex UI code in half (see [demo](https://codesandbox.io/p/devbox/github/AndrewPrifer/vecui/tree/main?file=%2Fsrc%2FApp.tsx%3A55%2C32)).

VecUI includes utilities to turn your UI into vectors and back again, and comes with a beautiful API that is both easy to read and write.

## Features

- All the vector operations you would expect and more.
- A beautiful, ergonomic API that doesn't make you repeat yourself.
- Immutable values. Treat your vectors just like any other primitive.
- Utilities for working with UIs.
- Probably the most fun you'll ever have with vectors.
- <1 KB

## Installation

```bash
yarn add vecui
```

## Usage

The best way to get an intuition for VecUI and see what it looks like is to play with the [demo](https://codesandbox.io/p/devbox/github/AndrewPrifer/vecui/tree/main?file=%2Fsrc%2FApp.tsx%3A55%2C32).

Alternatively, here's an excerpt (the actual demo is not much longer, you should really go play with it).

```typescript
// How much the pink div will expand on hover on either direction
const hoverExpandVec = vec(hoverExpand);

let alignedRect: UIRect | null = null;

// Create a vector for the dimensions of the yellow div
const centerRectDim = vec(centerRectSize);
// Create a rect representing the yellow div and offset it by minus half its dimensions so that it's centered
const centerRect = rect(centerRectDim.div(-2), centerRectDim);

// Create a rect for the pink div
const otherRect = rect(vec(0), vec(otherRectSize));

// Align it to the right side of the yellow div by
alignedRect = rect(
  centerRect.o
    // offsetting its origin by the width of the yellow div
    .add(centerRect.d.x, 0)
    // adding the padding in the x direction and
    .add(
      padding,
      // centering it vertically
      centerRect.d.sub(otherRect.d).div(2).y
    ),
  otherRect.d
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
          // negatively offsetting its origin by the hover expand vector (only in the y direction if keepAlignedOnHover is true)
          alignedRect.o.sub(hoverExpandVec.mul(keepAlignedOnHover ? 0 : 1, 1)),
          // adding the hover expand vector to its dimensions (twice because it's being added to both sides)
          alignedRect.d.add(hoverExpandVec.mul(2))
        ).as.css,
      }}
    >
      Hover me!
    </motion.div>
  </div>
);
```

## API

The API consists of functions to create and manipulate vectors and rectangles. VecUI vectors are 2 dimensional. Rectangles are composed of 2 vectors, one for the origin point, and another for the width and height. All values are immutable, functions return new values instead of mutating existing ones.

### Rectangles

#### **rect()**

Creates a rectangle with the specified origin point and dimensions.

```typescript
const r1 = rect(vec(1, 2), vec(3, 4));
const r3 = rect({ x: 1, y: 2, width: 3, height: 4 });
const r4 = rect(htmlElement.getBoundingClientRect());
```

#### **o**

The origin point of the rectangle.

```typescript
const r1 = rect(vec(1, 2), vec(3, 4));

r1.o; // => vec(1, 2)
```

#### **d**

The dimensions of the rectangle.

```typescript
const r1 = rect(vec(1, 2), vec(3, 4));

r1.d; // => vec(3, 4)
```

#### **setO()**

Returns a new rectangle with the origin point set to the specified vector.

```typescript
const r1 = rect(vec(1, 2), vec(3, 4));

r1.setO(vec(5, 6)); // => rect(vec(5, 6), vec(3, 4))
```

#### **setD()**

Returns a new rectangle with the dimensions set to the specified vector.

```typescript
const r1 = rect(vec(1, 2), vec(3, 4));

r1.setD(vec(5, 6)); // => rect(vec(1, 2), vec(5, 6))
```

#### **as()**

Maps the rectangle to an object with the specified property names.

```typescript
const r1 = rect(vec(1, 2), vec(3, 4));

r1.as("x", "y", "width", "height"); // => { x: 1, y: 2, width: 3, height: 4 }
```

Alternatively, you can also use the `.as.css` shortcut to map the rectangle to an object with the names `top`, `left`, `width`, and `height`.

```typescript
const r1 = rect(vec(1, 2), vec(3, 4));

r1.as.css; // => { top: 1, left: 2, width: 3, height: 4 }
```

#### **equals()**

Checks if this rect equals another rect.

```typescript
const r1 = rect(vec(1, 2), vec(3, 4));
const r2 = rect(vec(1, 2), vec(3, 4));

r1.equals(r2); // => true
```

### Vectors

#### **vec()**

Creates a vector with the specified components.

```typescript
const v1 = vec(1, 2);
const v2 = vec([1, 2]);
const v3 = vec({ x: 1, y: 2 });

// You can also create vectors with a single number.
const v4 = vec(100);
```

#### **x**

The x component of the vector.

```typescript
const v1 = vec(1, 2);

v1.x; // => 1
```

#### **y**

The y component of the vector.

```typescript
const v1 = vec(1, 2);

v1.y; // => 2
```

#### **setX()**

Returns a new vector with the x component set to the specified value.

```typescript
const v1 = vec(1, 2);

v1.setX(3); // => vec(3, 2)
```

#### **setY()**

Returns a new vector with the y component set to the specified value.

```typescript
const v1 = vec(1, 2);

v1.setY(3); // => vec(1, 3)
```

#### **add()**

Adds another vector or components to this vector.

```typescript
const v1 = vec(1, 2);
const v2 = vec(3, 4);

v1.add(v2); // => vec(4, 6)

// You can also directly add scalars to components.
v1.add(3, 4); // => vec(4, 6)
```

#### **sub()**

Subtracts another vector or components from this vector.

```typescript
const v1 = vec(1, 2);
const v2 = vec(3, 4);

v1.sub(v2); // => vec(-2, -2)

// You can also directly subtract scalars from components.
v1.sub(3, 4); // => vec(-2, -2)
```

#### **div()**

Divides this vector by another vector or components.

```typescript
const v1 = vec(1, 2);
const v2 = vec(3, 4);

v1.div(v2); // => vec(0.33, 0.5)

// You can also directly divide components by scalars.
v1.div(3, 4); // => vec(0.33, 0.5)

// Or divide by a single scalar.
v1.div(2); // => vec(0.5, 1)
```

#### **dot()**

Calculates the dot product with another vector or components.

```typescript
const v1 = vec(1, 2);
const v2 = vec(3, 4);

v1.dot(v2); // => 11

// You can also directly calculate the dot product with components.
v1.dot(3, 4); // => 11
```

#### **cross()**

Calculates the cross product with another vector or components.

```typescript
const v1 = vec(1, 2);
const v2 = vec(3, 4);

v1.cross(v2); // => -2

// You can also directly calculate the cross product with components.
v1.cross(3, 4); // => -2
```

#### **mul()**

Element-wise multiplies the vector with another vector, components, or scalar.

```typescript
const v1 = vec(1, 2);
const v2 = vec(3, 4);

v1.mul(v2); // => vec(3, 8)

// You can also directly multiply components by scalars.
v1.mul(3, 4); // => vec(3, 8)

// Or multiply by a single scalar.
v1.mul(2); // => vec(2, 4)
```

#### **len()**

Calculates the length (L2 norm) of the vector.

```typescript
const v1 = vec(3, 4);

v1.len(); // => 5
```

#### **norm()**

Normalizes the vector.

```typescript
const v1 = vec(3, 4);

v1.norm(); // => vec(0.6, 0.8)
```

#### **rotRad()**

Rotates the vector by a specified number of radians.

```typescript
const v1 = vec(1, 0);

v1.rotRad(Math.PI / 2); // => vec(0, 1)
```

#### **rotDeg()**

Rotates the vector by a specified number of degrees.

```typescript
const v1 = vec(1, 0);

v1.rotDeg(90); // => vec(0, 1)
```

#### **isInRect()**

Checks if the vector is within a given rectangle.

```typescript
const v1 = vec(1, 2);

v1.isInRect({ x: 0, y: 0, width: 2, height: 3 }); // => true
```

#### **equals()**

Checks if the vector equals another vector or specified components.

```typescript
const v1 = vec(1, 2);
const v2 = vec(1, 2);

v1.equals(v2); // => true

// You can also directly compare components.
v1.equals(1, 2); // => true
```
