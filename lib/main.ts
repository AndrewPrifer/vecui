/**
 * An immutable 2D Vector that supports various operations.
 * @public
 */
class Vec {
  /**
   * Create a vector with the given components.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The vector.
   */
  public constructor(public readonly x: number, public readonly y: number) {}

  /**
   * Create a new vector with the given x component.
   * @param x - The component of the x-axis.
   * @returns A new vector with the given x component.
   */
  public setX(x: number): Vec {
    return new Vec(x, this.y);
  }

  /**
   * Create a new vector with the given y component.
   * @param y - The component of the y-axis.
   * @returns A new vector with the given y component.
   */
  public setY(y: number): Vec {
    return new Vec(this.x, y);
  }

  /**
   * Add another vector to the vector.
   * @param other - The vector to be added.
   * @returns The resulting vector of the addition.
   */
  public add(other: Vec): Vec;
  /**
   * Add another vector to the vector.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The resulting vector of the addition.
   */
  public add(x: number, y?: number): Vec;
  public add(vecOrX: Vec | number, y?: number): Vec {
    const other = vecOrX instanceof Vec ? vecOrX : vec(vecOrX, y);
    return new Vec(this.x + other.x, this.y + other.y);
  }

  /**
   * Subtract another vector from the vector.
   * @param other - The vector to be added.
   * @returns The resulting vector of the subtraction.
   */
  public sub(other: Vec): Vec;
  /**
   * Subtract another vector from the vector.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The resulting vector of the subtraction.
   */
  public sub(x: number, y?: number): Vec;
  public sub(vecOrX: Vec | number, y?: number): Vec {
    const other = vecOrX instanceof Vec ? vecOrX : vec(vecOrX, y);
    return new Vec(this.x - other.x, this.y - other.y);
  }

  /**
   * Divide the vector by a scalar.
   * @param scalar - The scalar the vector will be divided by.
   * @returns The resulting vector of the division.
   */
  public div(scalar: number): Vec;
  /**
   * Divide the vector by another vector.
   * @param other - The other vector used for dividing.
   * @returns The resulting vector of the division.
   */
  public div(other: Vec): Vec;
  /**
   * Divide the vector by another vector.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The resulting vector of the division.
   */
  public div(x: number, y: number): Vec;
  public div(vecOrX: Vec | number, y?: number): Vec {
    const other = vecOrX instanceof Vec ? vecOrX : vec(vecOrX, y);
    return new Vec(this.x / other.x, this.y / other.y);
  }

  /**
   * Calculate the dot product of the vector and another vector.
   * @param other - The other vector used for calculating the dot product.
   * @returns The dot product.
   */
  public dot(other: Vec): number;
  /**
   * Calculate the dot product of the vector and another vector.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The dot product.
   */
  public dot(x: number, y: number): number;
  public dot(vecOrX: Vec | number, y?: number): number {
    const other = vecOrX instanceof Vec ? vecOrX : vec(vecOrX, y);
    return this.x * other.x + this.y * other.y;
  }

  /**
   * Calculate the cross product of the vector and another vector. The cross product of two vectors `a` and `b` is defined as `a.x * b.y - a.y * b.x`.
   * @param other - The other vector used for calculating the cross product.
   * @returns The cross product.
   */
  public cross(other: Vec): number;
  /**
   * Calculate the cross product of the vector and another vector. The cross product of two vectors `a` and `b` is defined as `a.x * b.y - a.y * b.x`.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The cross product.
   */
  public cross(x: number, y?: number): number;
  public cross(vecOrX: Vec | number, y?: number): number {
    const other = vecOrX instanceof Vec ? vecOrX : vec(vecOrX, y);
    return this.x * other.y - other.x * this.y;
  }

  /**
   * Calculate the element-wise (Hadamard) product of the vector and another vector.
   * @param other - The other vector used for calculating the Hadamard product.
   * @returns The Hadamard product.
   */
  public mul(other: Vec): Vec;
  /**
   * Calculate the element-wise (Hadamard) product of the vector and another vector.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The Hadamard product.
   */
  public mul(x: number, y: number): Vec;
  /**
   * Multiply the vector by a scalar.
   * @param scalar - The scalar the vector will be multiplied by.
   * @returns The resulting vector of the multiplication.
   */
  public mul(scalar: number): Vec;
  public mul(vecOrX: Vec | number, y?: number): Vec {
    const other = vecOrX instanceof Vec ? vecOrX : vec(vecOrX, y);
    return new Vec(this.x * other.x, this.y * other.y);
  }

  /**
   * Calculate the length of the vector using the L2 norm.
   * @returns The length.
   */
  public len(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  /**
   * Normalize the vector using the L2 norm.
   * @returns The normalized vector.
   */
  public norm(): Vec {
    const length = this.len();
    return new Vec(this.x / length, this.y / length);
  }

  /**
   * Rotate the vector by the given radians counterclockwise.
   * @param radians - The radians the vector will be rotated by.
   * @returns The rotated vector.
   */
  public rotRad(radians: number): Vec {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return new Vec(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
  }

  /**
   * Rotate the vector by the given degrees counterclockwise.
   * @param degrees - The degrees the vector will be rotated by.
   * @returns The rotated vector.
   */
  public rotDeg(degrees: number): Vec {
    return this.rotRad((degrees * Math.PI) / 180);
  }

  public isInRect(rect: InputRect): boolean {
    return (
      rect.x <= this.x &&
      rect.x + rect.width >= this.x &&
      rect.y <= this.y &&
      rect.y + rect.height >= this.y
    );
  }

  /**
   * Check if the vector is equal to another vector.
   * @param other - The other vector.
   * @returns Whether the vectors are equal.
   */
  public equals(other: Vec): boolean;
  /**
   * Check if the vector is equal to another vector.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns Whether the vectors are equal.
   */
  public equals(x: number, y: number): boolean;
  public equals(vecOrX: Vec | number, y?: number): boolean {
    const other = vecOrX instanceof Vec ? vecOrX : vec(vecOrX, y);
    return this.x === other.x && this.y === other.y;
  }
}

export type InputRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Create a vector with the given components.
 * @param x The component of the x-axis.
 * @param y The component of the y-axis.
 * @returns The vector.
 */
export function vec(x: number, y?: number): Vec;
/**
 * Create a vector with the given components.
 * @param components The components of the vector.
 * @returns The vector.
 */
export function vec([x, y]: [number, number]): Vec;
export function vec({ x, y }: { x: number; y: number }): Vec;
export function vec(
  xOrArrayOrObject: number | [number, number] | { x: number; y: number },
  y?: number
): Vec {
  if (Array.isArray(xOrArrayOrObject)) {
    return new Vec(xOrArrayOrObject[0], xOrArrayOrObject[1]);
  }
  if (typeof xOrArrayOrObject === "number") {
    return new Vec(xOrArrayOrObject, y ?? xOrArrayOrObject);
  }
  return new Vec(xOrArrayOrObject.x, xOrArrayOrObject.y);
}

// export type Rect = {
//   o: Vec;
//   d: Vec;
//   as: (<
//     X extends string,
//     Y extends string,
//     Width extends string,
//     Height extends string
//   >(
//     x: X,
//     y: Y,
//     width: Width,
//     height: Height
//   ) => Record<X | Y | Width | Height, number>) & {
//     css: Record<"left" | "top" | "width" | "height", number>;
//   };
//   equals: (other: Rect) => boolean;
// };

// Rect as a class
class Rect {
  public constructor(public readonly o: Vec, public readonly d: Vec) {}

  public get as() {
    const as = <
      X extends string,
      Y extends string,
      Width extends string,
      Height extends string
    >(
      x: X,
      y: Y,
      width: Width,
      height: Height
    ) =>
      ({
        [x]: this.o.x,
        [y]: this.o.y,
        [width]: this.d.x,
        [height]: this.d.y,
      } as Record<X | Y | Width | Height, number>);

    as.css = {
      left: this.o.x,
      top: this.o.y,
      width: this.d.x,
      height: this.d.y,
    };

    return as;
  }

  public equals(other: Rect) {
    return other.o.equals(this.o) && other.d.equals(this.d);
  }
}

export function rect(origin: Vec, dim: Vec): Rect;
export function rect(rect: InputRect): Rect;
export function rect(rectOrOrigin: InputRect | Vec, dim?: Vec): Rect {
  if (rectOrOrigin instanceof Vec) {
    return new Rect(rectOrOrigin, dim!);
  }
  return new Rect(
    vec(rectOrOrigin.x, rectOrOrigin.y),
    vec(rectOrOrigin.width, rectOrOrigin.height)
  );
}

export type { Vec };
