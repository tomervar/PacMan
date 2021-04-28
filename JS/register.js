function validateEmail($email){
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}

function validateFullName($fullname){
    var fullNameReg = /^[a-z][a-z\s]*$/;
    return fullNameReg.test( $fullname );
}

function registerToLogin(){
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

        $("#reg_div").hide();
        $("#login_div").show();
        return;
    }
    else{
        return false;
    }
    
}

function resetRegisterForm(){
    $("#reg_user_input").val('');
    $("#reg_password_input").val('');
    $("#reg_repassword_input").val('');
    $("#reg_email_input").val('');
    $("#reg_fullName_input").val('');
    $("#reg_date_input").val('');

}