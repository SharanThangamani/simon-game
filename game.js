
var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red", "blue", "green", "yellow"];
var started=false;
var level=0;

  $(document).on("keydown", function(){
    if(started===false)
    {
      $("#level-title").text("Level "+level);
      nextSequence();
      started=true;
    }
  });

  function nextSequence()
  {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(80).fadeIn(80);
    playSound(randomChosenColor);
  }

  $(".btn").on("click", function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  });

  function checkAnswer(currentLevel)
  {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    }
    else {

      var sound=new Audio("sounds/wrong.mp3");
      sound.play();

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();

    }
  }

  function startOver()
  {
    level=0;
    started=false;
    gamePattern=[];
  }

  function animatePress(currentColor)
  {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
    },100);
  }


  function playSound(name)
  {
    var fileName="sounds/"+name+".mp3";
    var sound=new Audio(fileName);
    sound.play();
  }
