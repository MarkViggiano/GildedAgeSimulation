/**
Requires gameobject.js to be referenced before this file
**/
class Citizen extends GameObject {
  constructor(name, id) {
    super(0, 0, 100, 100);
    this.name = name;
    this.id = id;
    this.netWorth = MathUtil.randomNumber(20, 100);
    this.destinationX = MathUtil.randomNumber(300, 700);
    this.destinationY = MathUtil.randomNumber(300, 700);
    this.status = "At Home";
  }

  //tax should be a floating point value between 0 and 1
  pay(amount, tax) {
    this.netWorth += (amount * (1 - tax));
  }

  deduct(amount) {
    this.netWorth -= amount;
  }

  atDestination() {
    return this.x == this.destinationX && this.y == this.destinationY;
  }

  move() {
    if (this.atDestination()) return;

    this.xVel = 0;
    this.yVel = 0;

    if (this.x > this.destinationX) {
      this.xVel = -5;
    }

    if (this.x < this.destinationX) {
      this.xVel = 5;
    }

    if (this.y > this.destinationY) {
      this.yVel = -5;
    }

    if (this.y < this.destinationY) {
      this.yVel = 5;
    }

  }

  render(ctx) {
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

}
