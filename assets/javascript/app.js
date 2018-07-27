$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyBR4mFvJiYUIQDIVoDzKCWZyxyeJ-C5rCw",
    authDomain: "fir-project-ca268.firebaseapp.com",
    databaseURL: "https://fir-project-ca268.firebaseio.com",
    projectId: "fir-project-ca268",
    storageBucket: "",
    messagingSenderId: "60944439745"
  };

  firebase.initializeApp(config);


  if (firebase.auth().currentUser != null) {
    goToHome();
  }

  else {
  
    var uiConfig = {
       signInSuccessUrl: 'https://joycurthblisso.github.io/GroupProject-1/setuppage.html',
       signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
       ],
       tosUrl: '<your-tos-url>'
      };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    
    ui.start('#firebaseui-auth-container', uiConfig);
  };


  function goToHome() {
    
    location.href = "https://joycurthblisso.github.io/GroupProject-1/Angels.html"
   
  };
});
