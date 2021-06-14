class GameObject {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.xVel = 0;
    this.yVel = 0;
  }

  isMoving() {
    return this.xVel > 0 || this.yVel > 0;
  }

  tick() {
    this.x += this.xVel;
    this.y += this.yVel;
  }

  render(ctx) {
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

}
