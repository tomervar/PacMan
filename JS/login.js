


function loginToSettings(){
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
    // $("#login_div, #settings_div").toggle();

    $("#login_div").hide();
    $("#settings_div").show();

    leftButton = 37;
    upButton = 38;
    rightButton = 39;
    downButton = 40;

    upButtonName = "ArrowUp";
    downButtonName = "ArrowDown";
    leftButtonName = "ArrowLeft";
    rightButtonName = "ArrowRight";
    USER_NAME = name;


    return;

}