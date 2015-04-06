var Hippo = function (game, ypos) {
  this.game = game;
  this.xpos = this.game.DIM_X/2;
  this.ypos = ypos;
  this.radius = 100;
  this.points = 0;
};

Hippo.prototype.eat = function () {
  this.game.eatBalls(this)
}

Hippo.prototype.draw = function (ctx) {
  ctx.fillStyle = this.game.SHIPCOLOR;
  ctx.beginPath();

  ctx.arc(
    this.xpos,
    this.ypos,
    100,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};
