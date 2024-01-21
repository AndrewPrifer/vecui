/**
 * An immutable 2D Vector that supports various operations.
 * @public
 */
class Vector {
  /**
   * Create a vector with the given components.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The vector.
   */
  public constructor(public readonly x: number, public readonly y: number) {}

  /**
   * Add another vector to the vector.
   * @param other - The vector to be added.
   * @returns The resulting vector of the addition.
   */
  public add(other: Vector): Vector;
  /**
   * Add another vector to the vector.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The resulting vector of the addition.
   */
  public add(x: number, y?: number): Vector;
  public add(vecOrX: Vector | number, y?: number): Vector {
    const other = vecOrX instanceof Vector ? vecOrX : vec(vecOrX, y);
    return new Vector(this.x + other.x, this.y + other.y);
  }

  /**
   * Subtract another vector from the vector.
   * @param other - The vector to be added.
   * @returns The resulting vector of the subtraction.
   */
  public sub(other: Vector): Vector;
  /**
   * Subtract another vector from the vector.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The resulting vector of the subtraction.
   */
  public sub(x: number, y?: number): Vector;
  public sub(vecOrX: Vector | number, y?: number): Vector {
    const other = vecOrX instanceof Vector ? vecOrX : vec(vecOrX, y);
    return new Vector(this.x - other.x, this.y - other.y);
  }

  /**
   * Divide the vector by a scalar.
   * @param scalar - The scalar the vector will be divided by.
   * @returns The resulting vector of the division.
   */
  public div(scalar: number): Vector;
  /**
   * Divide the vector by another vector.
   * @param other - The other vector used for dividing.
   * @returns The resulting vector of the division.
   */
  public div(other: Vector): Vector;
  /**
   * Divide the vector by another vector.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The resulting vector of the division.
   */
  public div(x: number, y: number): Vector;
  public div(vecOrX: Vector | number, y?: number): Vector {
    const other = vecOrX instanceof Vector ? vecOrX : vec(vecOrX, y);
    return new Vector(this.x / other.x, this.y / other.y);
  }

  /**
   * Calculate the dot product of the vector and another vector.
   * @param other - The other vector used for calculating the dot product.
   * @returns The dot product.
   */
  public dot(other: Vector): number;
  /**
   * Calculate the dot product of the vector and another vector.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The dot product.
   */
  public dot(x: number, y: number): number;
  public dot(vecOrX: Vector | number, y?: number): number {
    const other = vecOrX instanceof Vector ? vecOrX : vec(vecOrX, y);
    return this.x * other.x + this.y * other.y;
  }

  /**
   * Calculate the cross product of the vector and another vector. The cross product of two vectors `a` and `b` is defined as `a.x * b.y - a.y * b.x`.
   * @param other - The other vector used for calculating the cross product.
   * @returns The cross product.
   */
  public cross(other: Vector): number;
  /**
   * Calculate the cross product of the vector and another vector. The cross product of two vectors `a` and `b` is defined as `a.x * b.y - a.y * b.x`.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The cross product.
   */
  public cross(x: number, y?: number): number;
  public cross(vecOrX: Vector | number, y?: number): number {
    const other = vecOrX instanceof Vector ? vecOrX : vec(vecOrX, y);
    return this.x * other.y - other.x * this.y;
  }

  /**
   * Calculate the element-wise (Hadamard) product of the vector and another vector.
   * @param other - The other vector used for calculating the Hadamard product.
   * @returns The Hadamard product.
   */
  public mul(other: Vector): Vector;
  /**
   * Calculate the element-wise (Hadamard) product of the vector and another vector.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns The Hadamard product.
   */
  public mul(x: number, y: number): Vector;
  /**
   * Multiply the vector by a scalar.
   * @param scalar - The scalar the vector will be multiplied by.
   * @returns The resulting vector of the multiplication.
   */
  public mul(scalar: number): Vector;
  public mul(vecOrX: Vector | number, y?: number): Vector {
    const other = vecOrX instanceof Vector ? vecOrX : vec(vecOrX, y);
    return new Vector(this.x * other.x, this.y * other.y);
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
  public norm(): Vector {
    const length = this.len();
    return new Vector(this.x / length, this.y / length);
  }

  /**
   * Rotate the vector by the given radians counterclockwise.
   * @param radians - The radians the vector will be rotated by.
   * @returns The rotated vector.
   */
  public rotRad(radians: number): Vector {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return new Vector(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
  }

  /**
   * Rotate the vector by the given degrees counterclockwise.
   * @param degrees - The degrees the vector will be rotated by.
   * @returns The rotated vector.
   */
  public rotDeg(degrees: number): Vector {
    return this.rotRad((degrees * Math.PI) / 180);
  }

  public isInRect(rect: Rect): boolean {
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
  public equals(other: Vector): boolean;
  /**
   * Check if the vector is equal to another vector.
   * @param x - The component of the x-axis.
   * @param y - The component of the y-axis.
   * @returns Whether the vectors are equal.
   */
  public equals(x: number, y: number): boolean;
  public equals(vecOrX: Vector | number, y?: number): boolean {
    const other = vecOrX instanceof Vector ? vecOrX : vec(vecOrX, y);
    return this.x === other.x && this.y === other.y;
  }
}

export type Rect = {
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
export function vec(x: number, y?: number): Vector;
/**
 * Create a vector with the given components.
 * @param components The components of the vector.
 * @returns The vector.
 */
export function vec([x, y]: [number, number]): Vector;
export function vec({ x, y }: { x: number; y: number }): Vector;
export function vec(
  xOrArrayOrObject: number | [number, number] | { x: number; y: number },
  y?: number
): Vector {
  if (Array.isArray(xOrArrayOrObject)) {
    return new Vector(xOrArrayOrObject[0], xOrArrayOrObject[1]);
  }
  if (typeof xOrArrayOrObject === "number") {
    return new Vector(xOrArrayOrObject, y ?? xOrArrayOrObject);
  }
  return new Vector(xOrArrayOrObject.x, xOrArrayOrObject.y);
}

export type UIRect = {
  o: Vector;
  d: Vector;
  as: (<
    X extends string,
    Y extends string,
    Width extends string,
    Height extends string
  >([x, y, width, height]: [X, Y, Width, Height]) => Record<
    X | Y | Width | Height,
    number
  >) & {
    css: Record<"left" | "top" | "width" | "height", number>;
  };
  equals: (other: UIRect) => boolean;
};

export function rect(origin: Vector, dim: Vector): UIRect;
export function rect(rect: Rect): UIRect;
export function rect(rectOrOrigin: Rect | Vector, dim?: Vector): UIRect {
  const enhanced = {
    o: rectOrOrigin instanceof Vector ? rectOrOrigin : vec(rectOrOrigin),
    d:
      rectOrOrigin instanceof Vector
        ? vec(dim!)
        : vec(rectOrOrigin.width, rectOrOrigin.height),
  };

  const as = <
    X extends string,
    Y extends string,
    Width extends string,
    Height extends string
  >([x, y, width, height]: [X, Y, Width, Height]) =>
    ({
      [x]: enhanced.o.x,
      [y]: enhanced.o.y,
      [width]: enhanced.d.x,
      [height]: enhanced.d.y,
    } as Record<X | Y | Width | Height, number>);

  as.css = {
    left: enhanced.o.x,
    top: enhanced.o.y,
    width: enhanced.d.x,
    height: enhanced.d.y,
  };

  const equals = (other: UIRect) =>
    other.o.equals(enhanced.o) && other.d.equals(enhanced.d);

  return {
    ...enhanced,
    as,
    equals,
  };
}

export type { Vector };
