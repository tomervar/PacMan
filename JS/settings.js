var upButton;
var downButton;
var leftButton;
var rightButton;

var upButtonName;
var downButtonName;
var leftButtonName;
var rightButtonName;


function settingsToGame(){
    let numOfBalls = Number($("#sballs").val());
        let gameTime = Number($("#stime").val());
        let numOfGhosts = Number($("#sghost").val());
        let ball5Color = $("#s5color").val();
        let ball15Color = $("#s15color").val();
        let ball25Color = $("#s25color").val();
        if(numOfBalls === "" || !Number.isInteger(numOfBalls) || numOfBalls < 50 || numOfBalls > 90){
            alert("Number Of Game Balls is not Valid \nPlease Enter a Integer between 50-90");
            return;
        }
        if(gameTime === "" || gameTime < 60 ){
            alert("Game Time is not Valid \nPlease Enter a Number that Bigger then 60");
            return;
        }
        if(numOfGhosts === "" || !Number.isInteger(numOfGhosts) || numOfGhosts < 1 || numOfGhosts > 4){
            alert("Number of Ghosts is not Valid \nPlease Enter a Integer Between 1-4");
            return;
        }
        if(upButton === ""){
            alert("Up Button is not Valid \nPlease press on a key in the right field");
            return;
        }
        if(downButton === ""){
            alert("Down Button is not Valid \nPlease press on a key in the right field");
            return;
        }
        if(leftButton === ""){
            alert("Left Button is not Valid \nPlease press on a key in the right field");
            return;
        }
        if(rightButton === ""){
            alert("Right Button is not Valid \nPlease press on a key in the right field");
            return;
        }
        NUMBER_OF_BALLS = numOfBalls;
        GAME_TIME = gameTime;
        NUM_OF_GHOSTS = numOfGhosts;
        BALL_5_COLOR = ball5Color;
        BALL_15_COLOR = ball15Color;
        BALL_25_COLOR = ball25Color;
        UP_BUTTON_CODE = upButton;
        DOWN_BUTTON_CODE = downButton;
        LEFT_BUTTON_CODE = leftButton;
        RIGHT_BUTTON_CODE = rightButton;
    
        UP_BUTTON_NAME = upButtonName;
        DOWN_BUTTON_NAME = downButtonName;
        LEFT_BUTTON_NAME = leftButtonName;
        RIGHT_BUTTON_NAME = rightButtonName;

        $("#settings_div").hide();
        

        // $("#game_wrapper").show();

        Start();
        
    }

function settingsReset(){
        $("#sballs").val("50");
        $("#stime").val("60");
        $("#sghost").val("4");
        $("#s5color").val("#ff0000");
        $("#s15color").val("#f6b73c");
        $("#s25color").val("#008000");
        $("#sup").val("ArrowUp")
        $("#sdown").val("ArrowDown")
        $("#sleft").val("ArrowLeft")
        $("#sright").val("ArrowRight")


        leftButton = 37;
        upButton = 38;
        rightButton = 39;
        downButton = 40;

        upButtonName = "ArrowUp";
        downButtonName = "ArrowDown";
        leftButtonName = "ArrowLeft";
        rightButtonName = "ArrowRight";
}


function getRandInt(min,max){
    return Math.floor(Math.random()*(max-min +1)) + min;
}

function getRandColor(){
    return Math.floor(Math.random()*16777215).toString(16);
}


function randomSettingsToGame(){
            // random inputs in settings
            NUMBER_OF_BALLS = getRandInt(50,90);
            GAME_TIME = getRandInt(60,1200); // max 20 min in rand 
            NUM_OF_GHOSTS = getRandInt(1,4);
            BALL_5_COLOR = '#'+getRandColor();
            BALL_15_COLOR = '#'+getRandColor();
            BALL_25_COLOR = '#'+getRandColor();
            LEFT_BUTTON_CODE = 37;
            UP_BUTTON_CODE = 38;
            RIGHT_BUTTON_CODE = 39;
            DOWN_BUTTON_CODE = 40;
            
            
    
            UP_BUTTON_NAME = "ArrowUp";
            DOWN_BUTTON_NAME = "ArrowDown";
            LEFT_BUTTON_NAME = "ArrowLeft";
            RIGHT_BUTTON_NAME = "ArrowRight";
    
    
            $("#settings_div").hide();
            $("#gameFrame_div").show();
    
            Start();
            
    
    
}

function settingsUpHandler(key,event){
    $(key).val(event.code);
    upButton = event.which;
    upButtonName = event.code;
}

function settingsDownHandler(key,event){
    $(key).val(event.code);
    downButton = event.which;
    downButtonName = event.code;
}

function settingsLeftHandler(key,event){
    $(key).val(event.code);
    leftButton = event.which;
    leftButtonName = event.code;
}

function settingsRightHandler(key,event){
    $(key).val(event.code);
    rightButton = event.which;
    rightButtonName = event.code;
}
