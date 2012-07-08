class App
  constructor: ->
    @start = document.getElementById "start"
    @using = document.querySelector "section"
    @start.addEventListener "click", @startGame, false

  startGame: (event)=>
    event.preventDefault()
    @start.style.display = "none"
    @usingX = 0
    @usingY = 90
    window.addEventListener "touchmove", @mouseMove, true

  mouseMove: (event)=>
    event.preventDefault()
    @setX event.pageX/document.width
    @setY event.pageY/document.height
    @using.style.webkitTransform = "rotateX(#{@usingY}deg) rotateY(-#{@usingX}deg)"

  randomAngle: -> Math.floor(Math.random()*4) * 90

  setX:(num)->
    num *= 360
    @usingX = num

  setY:(num)->
    num *= 90
    @usingY = num - 45

window.addEventListener "load", ->
  window.app = new App()
, false