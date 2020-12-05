function getSignin(){
  document.getElementById("signinbutton").onclick = function () {
    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    console.log(username, password);

    firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      document.querySelector("#error").innerHTML = errorMessage;
    });
  }

  document.getElementById("signingoogle").onclick = function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "index.html"
    }
});
}

