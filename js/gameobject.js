class GameObject {
  constructor(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
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
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

}
