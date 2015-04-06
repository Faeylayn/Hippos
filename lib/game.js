(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Game = Asteroids.Game = function (dimx, dimy, numAsteroids) {
  this.DIM_X = dimx;
  this.DIM_Y = dimy;
  this.numAsteroids = numAsteroids;
  this.asteroids = [];
  this.addAsteroids();
  this.lives = 5;
  this.GameOver = false;

  this.hippo = new Hippo(this, 0)
  this.hippo2 = new Hippo(this, this.DIM_Y)
};

Game.DEFAULT_COLOR = "#FFFFFF"
// Game.DEFAULT_RADIUS = Math.sqrt((((this.DIM_X * this.DIM_Y)/4)/this.numAsteroids)/Math.PI)
Game.DEFAULT_RADIUS = 50
Game.SHIPCOLOR = "#FE2E2E"
Game.SHIPRADIUS = 15

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < this.numAsteroids; i ++) {
    var startPosition = Asteroids.Util.randomPosition(this.DIM_X, this.DIM_Y)
    this.asteroids.push(new Asteroid(startPosition[0], startPosition[1], this, 3, 10))
  };
};

Game.prototype.allObjects = function() {
  var newArray = this.asteroids.slice(0);

  return newArray;
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  var allObjs = this.allObjects()
  this.hippo.draw(ctx)
  this.hippo2.draw(ctx)
  for (var i = 0; i < allObjs.length; i ++) {
    allObjs[i].draw(ctx);
  };
};

Game.prototype.moveObjects = function () {
  var allObjs = this.allObjects()
  for (var i = 0; i < allObjs.length; i ++) {
    allObjs[i].move();
  };
};

Game.prototype.wrap = function (posx, posy, radius) {
  if (posx > this.DIM_X + radius) {
    posx -= this.DIM_X + radius
  }
  if (posy > this.DIM_Y + radius) {
    posy -= this.DIM_Y + radius
  }
  if (posx < 0 - radius) {
    posx += this.DIM_X + radius
  }
  if (posy < 0 - radius) {
    posy += this.DIM_Y + radius
  }
  return [posx, posy]
};


Game.prototype.step = function (ctx) {
  this.moveObjects();
  this.draw(ctx);
  if (this.asteroids.length === 0) {
    $(".game-canvas").prepend("<strong class='you-win'> </strong>")
    $(".you-win").html("YOU ARE A WINNER!")
    // clearInterval(window.interval)
    $(".you-win").append("<button class='new-game'>New Game!</button>")
  }
}

Game.prototype.handleAsteroid = function (index) {
  if (this.asteroids[index].size > 1) {
    var dyingAsteroid = this.asteroids[index];
    this.remove(index);
  } else {
    this.remove(index);
  }
};

Game.prototype.eatBalls = function (hippo) {
  for (var i = 0; i < this.asteroids.length; i++) {
    if (this.asteroids[i].IsCollidedWith(hippo)) {
      this.remove(i)
      hippo.points ++
    }
  }
}

Game.prototype.remove = function (index) {
  var newArr = this.asteroids.slice(0, index)
  var second = this.asteroids.slice(index + 1, this.asteroids.length)
  this.asteroids = newArr.concat(second)
}

}) ()
