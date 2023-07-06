buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userPattern = [];
let level = 0;
let blue = new Audio("sounds/blue.mp3");
let green = new Audio('sounds/green.mp3');
let red = new Audio('sounds/red.mp3');
let yellow = new Audio('sounds/yellow.mp3');
let wrong = new Audio('sounds/wrong.mp3');

function nextSequence() {
    userPattern = [];
    level ++;
    $("h1").text("Level " + level);
    let randNum = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randNum];
    $("#" + randomChosenColor).fadeIn(150).fadeOut(150).fadeIn(150);
    gamePattern.push(randomChosenColor);
    console.log(randomChosenColor);
    playAudio(randomChosenColor);
    return randomChosenColor;
}

function playAudio(randomChosenColor) {
    console.log("color is "  + randomChosenColor);
    switch (randomChosenColor)
    {
        case "blue":
            blue.play();
            break;
        case "green":
            green.play();
            break;
        case "red":
            red.play();
            break;
        case "yellow":
            yellow.play();
            break;
    }
}

function animatePress(currColor) {
    $("." + currColor).addClass('pressed').delay(150).queue(function(next){
        $(this).removeClass('pressed');
    next();
  })
}

function checkPattern(currLevel) {
        if (gamePattern[currLevel] == userPattern[currLevel]){
            if (gamePattern.length == userPattern.length) {
                setTimeout(function() {
                    nextSequence();}, 1000);
            }
        }
        else{
            $("h1").text("Game Over, Press Any Key to Restart")
            $("body").addClass("game-over");
            wrong.play();
            setTimeout(function() {
                $("body").removeClass("game-over");
            },200);
            restart();

        }
}

function restart () {
    gamePattern = [];
    level = 0;
}

$("body").keypress(function() {
    if (level == 0) {
        $("#" +nextSequence()).fadeIn(150).fadeOut(100).fadeIn(100);
    }
})

$(".btn").click(function () {
    userChosenColor = this.id;
    animatePress(userChosenColor)
    playAudio(userChosenColor);
    userPattern.push(userChosenColor);
    checkPattern(userPattern.length-1);
});






