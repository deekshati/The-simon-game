var buttonColours=["red","green","blue","yellow"];
gamePattern=[];
userClickedPattern=[];
var level=0;
var started=false;

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenColour);
    animatePress(userChosenColour);

})


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started=true;
    }
})




    
function playSound(name){
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio=new Audio("sounds/" + name + ".mp3")
    audio.play();

}


function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed")
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
    else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game Over, Press Any Key To Restart");
        startOver();
    
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+ level);
   var randomNumber=Math.floor(Math.random() * 4);
   var randomChosenColour=buttonColours[randomNumber];
   //console.log(randomNumber)
   gamePattern.push(randomChosenColour);
   //console.log(randomNumber,randomChosenColour);
   //console.log(gamePattern);
  
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}