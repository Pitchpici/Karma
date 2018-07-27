$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB6HgirbuLDHC1IAV_mDq4083z1vrfKMhQ",
    authDomain: "karma-85e36.firebaseapp.com",
    databaseURL: "https://karma-85e36.firebaseio.com",
    projectId: "karma-85e36",
    storageBucket: "",
    messagingSenderId: "142741192713"
  };
  firebase.initializeApp(config);


  if (firebase.auth().currentUser != null) {
    goToHome();
  }

  else {
  
    var uiConfig = {
       signInSuccessUrl: 'https://pitchpici.github.io/Karma/setuppage.html',
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
    
    location.href = "https://pitchpici.github.io/Karma/Angels.html"
   
  };
});
