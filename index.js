// RADIUM ENGINE by STAGNANT WORKS

/**
 * Base Classes
 * 
 * (ALL IN CARTESIAN COORDINATE SYSTEM unless otherwise noted)
 */
class Position2 {
    constructor(X = 0, Y = 0) {
        this.X = X;
        this.Y = Y;

        return this;
    }
    // Returns the Position2 as if it was in reference to the origin as a vector
    ToVector() {
        return Vector2(this.X, this.Y);
    }
    // Fills its stats with ones from another Position2
    From(Old) {
        this.X = Old.X;
        this.Y = Old.Y;

        return this;
    }
}
class Vector2 {
    constructor(X = 0, Y = 0) {
        this.X = X;
        this.Y = Y;

        return this;
    }
    // Returns the magnitude of the vector
    GetMagnitude() {
        // this is just the pythagorean theorem
        return Math.sqrt(Math.pow(this.X, 2) + Math.pow(this.Y, 2));
    }
    // Returns the direction of the vector
    GetDirection() {
        // basic trig
        return Math.tan(this.Y / this.X);
    }
}

/**
 * The subscription/subscriber method:
 * - Child gives up its ID to the subscription
 * - Subscription will locate child using ID when needed/called
 */

/**
 * Base Geometric
 * 
 * Remember, for our purposes, we're working with cartesian coordinates. The Radium Engine Display/Render Services will handle transformations to make them displayable
 */
class Rectangle {
    constructor(Position, Length, Width) {
        // Position is defined as the top-left corner of the rectangle.
        this.Position = Position;
        // Width : Y property
        // Length : X property
        this.Length = Length;
        this.Width = Width;

        return this;
    }
    GetArea() {
        return this.Length * this.Width;
    }
    GetPerimeter() {
        return (2 * this.Length) + (2 * this.Width);
    }
    // Returns a Position2 of a corner based on which is specified.
    // Format: U=Upper L=Lower L=Left R=Right; Upper/Lower first then Left/Right
    // Ex: UL = Upper Left, LL = Lower Left, ...
    GetCorner(CornerName) {
        let Result = new Position2().From(this.Position);
        if(CornerName[0] == "L") {
            Result.Y -= this.Width;
        } else if(CornerName[1] == "R") {
            Result.X += this.Length;
        }

        return Result;
    }
    // Given another object of class Rectangle, we'll check if they collide.
    // This collision check is INCLUSIVE.
    DoesCollide(Rectangle) {
        if(
            this.GetCorner("UL").X <= Rectangle.GetCorner("LR").X &&
            this.GetCorner("LR").X >= Rectangle.GetCorner("UL").X &&
            this.GetCorner("UL").Y >= Rectangle.GetCorner("LR").Y &&
            this.GetCorner("LR").Y <= Rectangle.GetCorner("UL").Y
        ) return true;

        //Would've already returned by now if true so must be false
        return false;
    }
}