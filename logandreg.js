var userNameList=["k"];
var emailList =["k@k.com"];
var passwordList =["k"];

var upButton;
var downButton;
var leftButton;
var rightButton;

var upButtonName;
var downButtonName;
var leftButtonName;
var rightButtonName;


$(document).ready(function(){
    $("#login_div").hide();
    $("#reg_div").hide();
    $("#settings_div").hide();
    $("#gameFrame_div").hide();
   
    $("#welcomeLogButton").click(function(){
        // $("div:visible, #login_div").toggle();
        $("#reg_div").hide();
        $("#settings_div").hide();
        $("#gameFrame_div").hide();
        $("#welcome_div").hide();
        $("#login_div").show();

    })

    $("#welcomeRegButton").click(function(){
        // $("div:visible, #reg_div").toggle();
        $("#settings_div").hide();
        $("#gameFrame_div").hide();
        $("#welcome_div").hide();
        $("#login_div").hide();
        $("#reg_div").show();
    })

    $("#login_div_button").click(function(){
        var name = $("#log_user_input").val();
        var pass = $("#log_pass_input").val();
        if(name==""){
            alert("UserName required.");
            return;
        }
        else if(pass==""){
            alert("Password required.");
            return;
        }    
        var pos = userNameList.indexOf(name);
            
        if(pos==-1){
            alert("UserName does not exist.");
            return;
        }    
        else if(passwordList[pos] != pass){
            alert("Password does not match.");
            return;
        }
        alert(name+" you are login Now \nWelcome to our Game.");
        // Switch to Settings Div 

        $("#log_user_input").val("");
        $("#log_pass_input").val("");
        $("#login_div, #settings_div").toggle();

        leftButton = 37;
        upButton = 38;
        rightButton = 39;
        downButton = 40;

        upButtonName = "ArrowUp";
        downButtonName = "ArrowDown";
        leftButtonName = "ArrowLeft";
        rightButtonName = "ArrowRight";

        return;
    })

    function validateEmail($email){
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
    }

    function validateFullName($fullname){
        var fullNameReg = /^[a-z][a-z\s]*$/;
        return fullNameReg.test( $fullname );
    }

    $("#reg_div_button").click(function(){
        var name = $("#reg_user_input").val();
        var pass = $("#reg_password_input").val();
        var repass = $("#reg_repassword_input").val();
        var email = $("#reg_email_input").val();
        var fullName= $("#reg_fullName_input").val();
        var date = $("#reg_date_input").val();

        if(name.length == 0){
            alert("UserName required.");
            return;    
        }
        if(pass.length == 0){
            alert("Password required.");
            return;
        }
        if(repass.length == 0){
            alert("Re-Password required.");
            return;
        }
        if(email.length == 0){
            alert("Email adress required.");
            return;
        }
        if(fullName.length == 0){
            alert("Full Name required.");
            return;
        }
        if(date.length == 0){
            alert("Date Of Birth required.");
            return;
        }
        else if(pass.length<6){
            alert("Password must contains at least 6 characters");
            return;
        }     
        else if(pass.search(/\d/) == -1){
            alert("Password must contains letters and numbers" );
            return; 
        }
        else if(pass.search(/[a-zA-Z]/) == -1){
            alert("Password must contains letters and numbers" );  
            return;
        }
        else if(pass != repass){
            alert("Password and Re-Password doesnt match" );  
            return;
        }

        if(!validateEmail(email)){
            alert("Email adress not valid");
            return;
        }

        if(!validateFullName(fullName)){
            alert("Full Name must contains letters only.");
            return;
        }

        // check userName and emails
        if(userNameList.includes(name)){
            alert("UserName already in use , pick another one.");
            return;
        }
        if(emailList.includes(email)){
            alert("Email adress already in use , pick another one.");
            return;
        }

        var con = confirm("Are you Done?");
        if(con == true){
            alert("Welcome you are registered to our Game\nPlease login to your account");
            // push to end of array
            userNameList.push(name);
            emailList.push(email);
            passwordList.push(pass);

            // clear cells


                
            $("#reg_div, #login_div").toggle();
            return;
        }
        else{
            return false;
        }
    })

    $("#sup").keydown(function(event){
        $(this).val(event.code);
        upButton = event.which;
    });
    $("#sdown").keydown(function(event){
        $(this).val(event.code);
        downButton = event.which;
    });
    $("#sleft").keydown(function(event){
        $(this).val(event.code);
        leftButton = event.which;
    });
    $("#sright").keydown(function(event){
        $(this).val(event.code);
        rightButton = event.which;
    });

    $("#sstart").click(function(){
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

        $("#settings_div, #gameFrame_div").toggle();

        // $("#game_wrapper").show();

        Start();
        return;
    })

    function getRandInt(min,max){
        return Math.floor(Math.random()*(max-min +1)) + min;
    }

    function getRandColor(){
        return Math.floor(Math.random()*16777215).toString(16);
    }

    $("#srandom").click(function(){
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


        $("#settings_div, #gameFrame_div").toggle();
        Start();
        return;


    })

    $("#mlogin").click(function(){

        // need to show in game
        
        if(document.getElementById("login_div").style.display != "none"){
        
        }
        else{
            // $("div:visible,#login_div").toggle();
            $("#settings_div").hide();
            $("#gameFrame_div").hide();
            $("#welcome_div").hide();
            $("#reg_div").hide();
            $("#login_div").show();
            stopGame();
        }
        
        
    })


    $("#mwelcome").click(function(){
        // need to show in game
        
        if(document.getElementById("welcome_div").style.display != "none"){    
        }
        else{
            // $("div:visible,#welcome_div").toggle();
            $("#settings_div").hide();
            $("#gameFrame_div").hide();
            $("#reg_div").hide();
            $("#login_div").hide();
            $("#welcome_div").show();

            stopGame();
        }
        
        
    })

    $("#mregister").click(function(){
        // need to show in game
        
        if(document.getElementById("reg_div").style.display != "none"){ 
        }
        else
        {
            // $("div:visible,#reg_div").toggle();
            $("#settings_div").hide();
            $("#gameFrame_div").hide();
            $("#login_div").hide();
            $("#welcome_div").hide();
            $("#reg_div").show();


            stopGame();
        }
     
    })

    $("#newGameButton").click(function(){
        // stop currect game
        stopGame();
        // switch to settings div
        $("#gameFrame_div,#settings_div").toggle();
    
    })
  
});





    
