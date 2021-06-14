let homes = [[[181, 120], [181, 150]], [[374, 120], [374, 151]], [[222, 308], [222, 340]], [[203, 471], [203, 501]], [[352, 469], [352, 502]]];
let factory = [[536, 341], [536, 316]];
let shop = [[503, 501], [501, 475]];
let node1 = new Node(103, 150);
let node2 = new Node(103, 341);
let node3 = new Node(426, 350);
let node4 = new Node(426, 501);
let colors = ["red", "green", "blue", "yellow", "purple", "aqua", "lime", "brown", "orange", "magenta"];
/**
Requires gameobject.js to be referenced before this file
**/
class Citizen extends GameObject {
  constructor(x, y, name, id) {
    super(x, y, 10, 20, colors[MathUtil.randomNumber(0, colors.length - 1)]);
    this.homeX = x;
    this.homeY = y;
    this.factoryX = MathUtil.randomNumber(300, 700);
    this.factoryY = MathUtil.randomNumber(300, 700);
    this.name = name;
    this.id = id;
    this.netWorth = MathUtil.randomNumber(40, 500);
    this.destinationX = x;
    this.destinationY = y;
    this.status = "home";
    this.movingOnPath = false;
    this.path;
    this.speed = 3;
    this.behavior = MathUtil.randomNumber(70, 100);
    this.homeToFactory;
    this.factoryToHome;
    this.homeToShops;
    this.shopsToHome;
    this.factoryToShops = [factory[1], factory[0], [node3.x, node3.y], [node4.x, node4.y], shop[0], shop[1]];
    this.shopsToFactory = [shop[1], shop[0], [node4.x, node4.y], [node3.x, node3.y], factory[0], factory[1]];
  }

  //No time for this, do it later for fun
  createPathFromTo(fromX, fromY, toX, toY, nodes) {
    let distX;
    let distY;
    let nextDistX;
    let nextDistY;
    let path = [];
    let currentX = fromX;
    let currentY = fromY;

    while (currentX != toX) {

      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        distX = MathUtil.distanceOfValues(currentX, node.x);
        distY = MathUtil.distanceOfValues(currentY, node.y);
        if (i + 1 == nodes.length) break;
        let nextNode = nodes[i + 1];
        nextDistX = MathUtil.distanceOfValues(currentX, nextNode.x);
        nextDistY = MathUtil.distanceOfValues(currentY, nextNode.y);

        //prioritize X

      }

    }
  }

  goSomewhereNew() {
    if (this.onPath()) return; //don't let players override current path!
    let chance = MathUtil.randomNumber(0, 1);
    switch (this.status.toLowerCase()) {
      case "home":
        if (chance == 0) {
          this.moveOnPath(this.homeToFactory);
          this.status = "factory";
        } else {
          this.moveOnPath(this.homeToShops);
          this.status = "shops";
        }
        break;

        case "factory":
          this.pay(100, 0.35);
          if (chance == 0) {
            this.moveOnPath(this.factoryToHome);
            this.status = "home";
          } else {
            this.moveOnPath(this.factoryToShops);
            this.status = "shops";
          }
          break;

          case "shops":
            this.deduct(10);
            if (chance == 0) {
              this.moveOnPath(this.shopsToHome);
              this.status = "home";
            } else {
              this.moveOnPath(this.shopsToFactory);
              this.status = "factory";
            }
            break;
    }
  }

  //tax should be a floating point value between 0 and 1
  pay(amount, tax) {
    this.netWorth += (amount * (1 - tax));
  }

  deduct(amount) {
    this.netWorth -= amount;
    if (this.netWorth < 0) this.netWorth = 0;
  }

  atDestination() {
    return this.x == this.destinationX && this.y == this.destinationY;
  }

  //path is 2d array containing x,y of where next to move similar to how 'homes' is a 2d array of home x,y
  moveOnPath(path) {
    this.path = path;
    this.movingOnPath = true;
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
      this.xVel = -this.speed;
    }

    if (this.x < this.destinationX) {
      this.xVel = this.speed;
    }

    if (this.y > this.destinationY) {
      this.yVel = -this.speed;
    }

    if (this.y < this.destinationY) {
      this.yVel = this.speed;
    }

    if (distanceX <= this.speed) {
      this.xVel = 0;
      this.x = this.destinationX;
    }

    if (distanceY <= this.speed) {
      this.yVel = 0;
      this.y = this.destinationY;
    }

    if (this.atDestination() && this.onPath()) {
      this.path.shift();
      if (this.path.length == 0) this.movingOnPath = false;
    }
  }

  tick() {
    this.x += this.xVel;
    this.y += this.yVel;

    if (this.behavior <= 40) this.deduct(10);
    if (this.behavior < 0) this.behavior = 0;

  }

}
