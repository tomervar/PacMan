function openLogin(){
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
}

function openWelcome(){
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
            
            
}

function openRegister(){
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
         
}