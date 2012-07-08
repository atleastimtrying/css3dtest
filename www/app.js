(function() {
  var App;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App = (function() {

    function App() {
      this.mouseMove = __bind(this.mouseMove, this);
      this.startGame = __bind(this.startGame, this);      this.start = document.getElementById("start");
      this.using = document.querySelector("section");
      this.start.addEventListener("click", this.startGame, false);
    }

    App.prototype.startGame = function(event) {
      event.preventDefault();
      this.start.style.display = "none";
      this.usingX = 0;
      this.usingY = 90;
      return window.addEventListener("touchmove", this.mouseMove, true);
    };

    App.prototype.mouseMove = function(event) {
      event.preventDefault();
      this.setX(event.pageX / document.width);
      this.setY(event.pageY / document.height);
      return this.using.style.webkitTransform = "rotateX(" + this.usingY + "deg) rotateY(-" + this.usingX + "deg)";
    };

    App.prototype.randomAngle = function() {
      return Math.floor(Math.random() * 4) * 90;
    };

    App.prototype.setX = function(num) {
      num *= 360;
      return this.usingX = num;
    };

    App.prototype.setY = function(num) {
      num *= 90;
      return this.usingY = num - 45;
    };

    return App;

  })();

  window.addEventListener("load", function() {
    return window.app = new App();
  }, false);

}).call(this);
