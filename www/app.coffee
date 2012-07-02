class App
  constructor: ->
    @start = document.getElementById "start"
    @scoreDisplay = document.getElementById "score"
    @timeDisplay = document.getElementById "time"
    @using = document.getElementById "usingThis"
    @usingAngle = document.getElementById "usingAngle"
    @match = document.getElementById "matchThis"
    @matchAngle = document.getElementById "matchAngle"
    @start.addEventListener "click", @startGame, false

  startGame: (event)=>
    event.preventDefault()
    @start.style.display = "none"
    @usingX = 0
    @usingY = 0
    @matchX = 0
    @matchY = 0
    @score = 0
    @time = 30
    @scoreDisplay.innerHTML = @score
    window.addEventListener "touchmove", @mouseMove, false
    @moveMatch()
    @countDown()

  mouseMove = (event)=>
    event.preventDefault()
    @usingX = @roundToTen event.pageX
    @usingY = @roundToTen event.pageY
    @using.style.webkitTransform = "rotateX(#{usingY}deg) rotateY(-#{usingX}deg)"
    @compare()

  compare: ->
    @usingX = 0 if @usingX is 360 
    @usingY = 0 if @usingY is 360 
    matchChange = @matchX
    matchChange = 270 if @matchX is 90
    matchChange = 90 if @matchX is 270
    @matchX = matchChange
    
    document.getElementById("positions").innerHTML = "#{@matchX}, #{@matchY}<br> #{@usingX},#{@usingY}";
    if @matchX is @usingX and @matchY is @usingY
      @score += 1
      @scoreDisplay.innerHTML = @score
      @moveMatch()

  moveMatch: ->
    @matchX = @randomAngle()
    @matchY = @randomAngle()
    @match.style.webkitTransform = "rotateX(#{matchY}deg) rotateY(#{matchX}deg)"

  randomAngle: -> Math.floor(Math.random()*4) * 90

  roundToTen:(num)->
    num %= 360
    Math.round(num/10)*10

  countDown: ->
    if @time > 0
      setTimeout @countDown, 1000
      @time -= 1
      @timeDisplay.innerHTML = @time
    else
      @endGame()

  endGame: ->
    alert "your score was "+ @score
    window.removeEventListener "touchmove", @mouseMove, false
    @start.style.display = "block"

document.addEventListener("deviceready", ->
  window.app = new App
, false);