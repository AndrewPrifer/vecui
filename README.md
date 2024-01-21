# VecUI

Tiny, ergonomic, fun vector library for UI engineers.

## Why?

UIs are made of rectangles. Rectangles are made of 2 vectors. One for describing their origin point, and another for describing their width and height. Treating them as vectors instead of 4 disjointed numbers makes it much easier to reason about them and can trivially cut complex UI code in half (see demo).

VecUI includes utilities to turn your UI into vectors and back again, and comes with a beautiful API that is both easy to read and write.

## Features

- All the Vector2D methods you know and love.
- A beautiful, ergonomic API that doesn't make you repeat yourself.
- Immutable values. Treat your vectors just like any other primitive.
- Utilities for working with UIs.
- Tiny.

## Installation

```bash
yarn add vecui
```

## Usage

TODO

## API

The API consists of functions to create and manipulate vectors and rectangles. All vectors are 2 dimensional. Rectangles are composed of 2 vectors, one for the origin point, and another for the width and height. All values are immutable, functions return new values instead of mutating existing ones.

### Rectangles

#### **rect()**

You can create rectangles using the `rect` function.

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

#### **as()**

Maps the rectangle to an object with the specified names.

```typescript
const r1 = rect(vec(1, 2), vec(3, 4));

r1.as(["x", "y", "width", "height"]); // => { x: 1, y: 2, width: 3, height: 4 }
```

Alternatively, you can also use the `.as.css` shortcut to map the rectangle to an object with the names `top`, `left`, `width`, and `height`.

```typescript
const r1 = rect(vec(1, 2), vec(3, 4));

r1.as.css; // => { top: 1, left: 2, width: 3, height: 4 }
```

#### **equals()**

Checks if the vector equals another vector or specified components.

```typescript
const r1 = rect(vec(1, 2), vec(3, 4));
const r2 = rect(vec(1, 2), vec(3, 4));

r1.equals(r2); // => true
```

### Vectors

#### **vec()**

You can create vectors using the `vec` function.

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
