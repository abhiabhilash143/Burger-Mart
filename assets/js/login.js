var firebaseConfig = {
    apiKey: "AIzaSyBDg07gkBvbrAQzbq-cmiEEssqqq-4MAjg",
    authDomain: "burgermart-b2279.firebaseapp.com",
    databaseURL: "https://burgermart-b2279.firebaseio.com",
    projectId: "burgermart-b2279",
    storageBucket: "burgermart-b2279.appspot.com",
    messagingSenderId: "210285341318",
    appId: "1:210285341318:web:c356f24fc41bdd7713bf07"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function onClickOnInput(event) {
    $(event).parent().find('.wrap-userIcon').addClass("userIcon-blue");
}

function onBlurOfInput(event) {
    $(event).parent().find('.wrap-userIcon').removeClass("userIcon-blue");
}

function showSignup(){
    $("#forgotPassword").css('display','none');
    $("#loginButton").css('display','none');
    $("#signupButton").css('display','block');
    $("#signupText").css('display','none');
}

function loginToApp() {
    debugger;
    let userEmail = $("#userEmail").val();
    let password = $("#password").val()
    if(userEmail.trim() == ""){
        $("#userEmail").parent().find('.error-icon-div').css('display','block');
        return;
    } else {
        $("#userEmail").parent().find('.error-icon-div').css('display','none');
    }
    if(password.trim() == ""){
        $("#password").parent().find('.error-icon-div').css('display','block');
        return;
    } else {
        $("#password").parent().find('.error-icon-div').css('display','none');
    }
    $("#loginButton").prop('disabled', true);
    $("#loginButton").find('button').html('<i class="fa fa-refresh fa-spin" style="font-size:18px"></i>');

    firebase.auth().signInWithEmailAndPassword(userEmail, password)
   .then(function(firebaseUser) {
       debugger;
       let userName = userEmail.split("@")[0];
        let acceportalURL = document.createElement("a");
        acceportalURL.href = "index.html?user="+userName
        acceportalURL.target = "_self";
        acceportalURL.click();
       // Success 
   })
  .catch(function(error) {
      debugger;
      alert(error.message);
      $("#loginButton").prop('disabled', false);
      $("#loginButton").find('button').html('Login');
       // Error Handling
  });
   
}


function signup(){
    let userEmail = $("#userEmail").val();
    let password = $("#password").val()
    if(userEmail.trim() == ""){
        $("#userEmail").parent().find('.error-icon-div').css('display','block');
        return;
    } else {
        $("#userEmail").parent().find('.error-icon-div').css('display','none');
    }
    if(password.trim() == ""){
        $("#password").parent().find('.error-icon-div').css('display','block');
        return;
    } else {
        $("#password").parent().find('.error-icon-div').css('display','none');
    }
    $("#signupButton").prop('disabled', true);
    $("#signupButton").find('button').html('<i class="fa fa-refresh fa-spin" style="font-size:18px"></i>');
     firebase.auth().createUserWithEmailAndPassword(userEmail, password)
     .then((user)=> {
       debugger;
       let userName = userEmail.split("@")[0];
       let acceportalURL = document.createElement("a");
       acceportalURL.href = "index.html?user="+userName
       acceportalURL.target = "_self";
       acceportalURL.click();
      }).catch(function (error) {
        // Handle Errors here.
        debugger;
        $("#signupButton").prop('disabled', true);
        $("#signupButton").find('button').html('Sign Up');
        alert(error.message);
        // ...
    });
}
