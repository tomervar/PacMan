var userNameList=["k"];
var emailList =["k@k.com"];
var passwordList =["k"];


$(document).ready(function(){
    $("#login_div").hide();
    $("#reg_div").hide();
    $("#settings_div").hide();
    $("#gameFrame_div").hide();
    
    $("#welcomeLogButton").click(fromWelcomeToLogin);
  

    $("#welcomeRegButton").click(fromWelcomeToReg);
        
        

    $("#login_div_button").click(loginToSettings);
        

    $("#reg_div_button").click(registerToLogin);
    

    $("#regreset").click(resetRegisterForm);


    $("#sup").keydown(function(event){
        settingsUpHandler(this,event);
    });
    $("#sdown").keydown(function(event){
        settingsDownHandler(this,event);
    });
    $("#sleft").keydown(function(event){
        settingsLeftHandler(this,event);
    });
    $("#sright").keydown(function(event){
        settingsRightHandler(this,event);
    });

    $("#sstart").click(settingsToGame);
        

    $("#sreset").click(settingsReset);
        

    $("#srandom").click(randomSettingsToGame);

    

    $("#newGameButton").click(newGameHandler);

    
  
});












    
