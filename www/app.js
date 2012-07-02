(function() {
  var App;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  App = (function() {
    var mouseMove;
    function App() {
      this.startGame = __bind(this.startGame, this);      this.start = document.getElementById("start");
      this.scoreDisplay = document.getElementById("score");
      this.timeDisplay = document.getElementById("time");
      this.using = document.getElementById("usingThis");
      this.usingAngle = document.getElementById("usingAngle");
      this.match = document.getElementById("matchThis");
      this.matchAngle = document.getElementById("matchAngle");
      this.start.addEventListener("click", this.startGame, false);
    }
    App.prototype.startGame = function(event) {
      event.preventDefault();
      this.start.style.display = "none";
      this.usingX = 0;
      this.usingY = 0;
      this.matchX = 0;
      this.matchY = 0;
      this.score = 0;
      this.time = 30;
      this.scoreDisplay.innerHTML = this.score;
      window.addEventListener("touchmove", this.mouseMove, false);
      this.moveMatch();
      return this.countDown();
    };
    mouseMove = __bind(function(event) {
      event.preventDefault();
      this.usingX = this.roundToTen(event.pageX);
      this.usingY = this.roundToTen(event.pageY);
      this.using.style.webkitTransform = "rotateX(" + usingY + "deg) rotateY(-" + usingX + "deg)";
      return this.compare();
    }, App);
    App.prototype.compare = function() {
      var matchChange;
      if (this.usingX === 360) {
        this.usingX = 0;
      }
      if (this.usingY === 360) {
        this.usingY = 0;
      }
      matchChange = this.matchX;
      if (this.matchX === 90) {
        matchChange = 270;
      }
      if (this.matchX === 270) {
        matchChange = 90;
      }
      this.matchX = matchChange;
      document.getElementById("positions").innerHTML = "" + this.matchX + ", " + this.matchY + "<br> " + this.usingX + "," + this.usingY;
      if (this.matchX === this.usingX && this.matchY === this.usingY) {
        this.score += 1;
        this.scoreDisplay.innerHTML = this.score;
        return this.moveMatch();
      }
    };
    App.prototype.moveMatch = function() {
      this.matchX = this.randomAngle();
      this.matchY = this.randomAngle();
      return this.match.style.webkitTransform = "rotateX(" + matchY + "deg) rotateY(" + matchX + "deg)";
    };
    App.prototype.randomAngle = function() {
      return Math.floor(Math.random() * 4) * 90;
    };
    App.prototype.roundToTen = function(num) {
      num %= 360;
      return Math.round(num / 10) * 10;
    };
    App.prototype.countDown = function() {
      if (this.time > 0) {
        setTimeout(this.countDown, 1000);
        this.time -= 1;
        return this.timeDisplay.innerHTML = this.time;
      } else {
        return this.endGame();
      }
    };
    App.prototype.endGame = function() {
      alert("your score was " + this.score);
      window.removeEventListener("touchmove", this.mouseMove, false);
      return this.start.style.display = "block";
    };
    return App;
  }).call(this);
  document.addEventListener("deviceready", function() {
    return window.app = new App;
  }, false);
}).call(this);
