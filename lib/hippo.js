var Hippo = function (game) {
  this.game = game;
  this.xpos = 400;
  this.ypos = 0;
  this.radius = 100;
};

Hippo.prototype.eat = function () {
  this.game.eatBalls()
}

Hippo.prototype.draw = function (ctx) {
  ctx.fillStyle = this.game.SHIPCOLOR;
  ctx.beginPath();

  ctx.arc(
    400,
    0,
    100,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};
