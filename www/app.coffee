class App
  constructor: ->
    @start = document.getElementById "start"
    @using = document.querySelector "section"
    @start.addEventListener "click", @startGame, false

  startGame: (event)=>
    event.preventDefault()
    @start.style.display = "none"
    @usingX = 0
    @usingY = 0
    window.addEventListener "mousemove", @mouseMove, false

  mouseMove: (event)=>
    event.preventDefault()
    @setX event.pageX/10
    @setY event.pageY/5
    @using.style.webkitTransform = "rotateX(#{@usingY}deg) rotateY(-#{@usingX}deg)"

  randomAngle: -> Math.floor(Math.random()*4) * 90

  setX:(num)->
    num %= 360
    @usingX = num if -30 < num < 30

  setY:(num)->
    num %= 360
    @usingY = num if -180 < num < 180

window.addEventListener "load", ->
  window.app = new App()
, false