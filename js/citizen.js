/**
Requires gameobject.js to be referenced before this file
**/
class Citizen extends GameObject {
  constructor(x, y, name, id) {
    super(x, y, 10, 20);
    this.homeX = x;
    this.homeY = y;
    this.factoryX = MathUtil.randomNumber(300, 700);
    this.factoryY = MathUtil.randomNumber(300, 700);
    this.name = name;
    this.id = id;
    this.netWorth = MathUtil.randomNumber(20, 100);
    this.destinationX = this.factoryX;
    this.destinationY = this.factoryY;
    this.status = "At Home";
    this.movingOnPath = false;
    this.path;
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

  //path is 2d array containing x,y of where next to move similar to how 'homes' is a 2d array of home x,y
  moveOnPath(path) {
    this.movingOnPath = true;
    this.path = path;
  }

  onPath() {
    return this.movingOnPath;
  }

  move() {
    if (this.atDestination() && !this.onPath()) return; //done for optimizations when not moving on a path
    if (this.onPath()) {
      this.destinationX = this.path[0][0];
      this.destinationY = this.path[0][1];
    }

    this.xVel = 0;
    this.yVel = 0;
    let distanceX = MathUtil.distanceOfValues(this.x, this.destinationX);
    let distanceY = MathUtil.distanceOfValues(this.y, this.destinationY);

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

    if (distanceX <= 5) {
      this.xVel = 0;
      this.x = this.destinationX;
    }

    if (distanceY <= 5) {
      this.yVel = 0;
      this.y = this.destinationY;
    }

    if (this.atDestination() && this.onPath()) {
      this.path.shift();
      if (this.path.length == 0) this.movingOnPath = false;
    }
  }

  render(ctx) {
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

}
