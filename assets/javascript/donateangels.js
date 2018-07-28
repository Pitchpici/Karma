
$(document).ready(function() {


    $('.parallax').parallax();

   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB6HgirbuLDHC1IAV_mDq4083z1vrfKMhQ",
    authDomain: "karma-85e36.firebaseapp.com",
    databaseURL: "https://karma-85e36.firebaseio.com",
    projectId: "karma-85e36",
    storageBucket: "karma-85e36.appspot.com",
    messagingSenderId: "142741192713"
  };
  firebase.initializeApp(config);

    var database = firebase.database();
    var donationTable = $("#donationTable");

    var userId;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          userId = firebase.auth().currentUser.uid;
          console.log("This is the user id: " + userId);



  	// var email = "clarkwmcd@gmail.com";


    $("#submitBtn").on("click", function(event) {

      event.preventDefault();

      console.log("submit working");

      if (($("#donateFood").val() == "") || ($("#menuNumber").val() == "") || ($("#value").val() == "") || ($("#pickUp").val() == "")) {

        $('#modal1').modal(); 
        $('#modal1').modal('open'); 

      } else {

        var donateFood = $("#donateFood").val().trim();
        var menuNumber = $("#menuNumber").val().trim();
        var value = $("#value").val().trim();
        var pickUp = $("#pickUp").val().trim();

        var temp = {
          donateFood: donateFood,
          menuNumber: menuNumber,
          value: value,
          pickUp: pickUp
        };


      var userEmail = "jojoenos@gmail.com";
      var donationType = $("#donateFood").val().trim();
      var numPeople = $("#menuNumber").val().trim();
      var donationValue = $("#value").val().trim();
      var pickUpTime = $("#pickUp").val().trim();

      function donatorEmail() {
        var queryURL = "https://api.mailgun.net/v3/";
        var hdrVal = "Basic " + btoa("api:key-ef72536d6301ae8ec42279773af8eaf9");
        var userEmail = "jojoenos@gmail.com";
      
        var donationType = $("#donateFood").val().trim();
      
      
        var text = `<p>Thank you so much for your generous donation.</p> <p>Your benevolence is appreciated and you will reap the karmic rewards of that. </p>  <p>This is to confirm that you have offered this to the community today: <ul> </p> <p> <li> Donation: `+ donationType +` </li> </p> <p> <li> Approximate value:  `+ donationValue + `</li> </p> <li> For number of people: `+ numPeople +` </li> <p> <li> Pick up time: `+ pickUpTime +` </li> </ul> </p>  <p>You will receive an email if an organization in need will be able to benefit from this donation. </p> <p>Thank you again for your KarmaFoodBank charity! </p> <p style='text-align:center'>— KarmaFoodBank </p>`

          $.ajax({
            url: "https://us-central1-empower-hope.cloudfunctions.net/api/mailgun-api/sandboxc502a7a2dae748469de9804c3742317f.mailgun.org/messages",
            method: "POST",
            headers: {"Authorization": hdrVal},
            data: {
              from: "jojoenos@gmail.com",
              to: userEmail,
              subject: "Hello from KarmaFoodBank",
              html: text

              },

            }).then(function(response){
               console.log(response);
               console.log(userEmail);
            });

        }

        donatorEmail(); 

        $("#donateFood").val("");
        $("#menuNumber").val("");
        $("#value").val("");
        $("#pickUp").val("");

      }


  		database.ref("/users/" + userId + "/profile").update(temp);


    });




    $("#btnHappy").on("click", function(event) {

      event.preventDefault();

      $("#donation").on("click",function(event) {
          if ($("#filled-in-box").is(":checked")) {
            
            
            function receiverEmail() {
              var queryURL = "https://api.mailgun.net/v3/";
              var hdrVal = "Basic " + btoa("api:key-ef72536d6301ae8ec42279773af8eaf9");
              var donationType = $("#donateFood").text();
              var pickUpTime = $("#pickUpTime").text();
              var numOfItems = $("#number").text();
            
              var userEmail = "jojoenos@gmail.com";

              var text = `<p>This is to confirm that you have agreed to pick up this donation today: </p> <ul> <p> <li> Donation: `+ donationType +` </li> </p> <p> <li> Number of items: `+ numOfItems +` </li> </p> <p> <li> Pick up time: `+ pickUpTime +` </li> </p> <p>Thank you so much for your KarmaFoodBank charity! </p> <p style="text-align:center;">— KarmaFoodBank </p>`

              $.ajax({
                url: "https://us-central1-empower-hope.cloudfunctions.net/api/mailgun-api/sandboxc502a7a2dae748469de9804c3742317f.mailgun.org/messages",
                method: "POST",
                headers: {"Authorization": hdrVal},
                data: {
                  from: "jojoenos@gmail.com",
                  to: "jojoenos@gmail.com", //userEmail
                  subject: "Hello from KarmaFoodBank",
                  html: text
                  },

                }).then(function(response){
                   console.log(response);
                   console.log("Email", userEmail);
                });
              }

            receiverEmail(); 

            function donatorAcceptedEmail() {
              var queryURL = "https://api.mailgun.net/v3/";
              var hdrVal = "Basic " + btoa("api:key-ef72536d6301ae8ec42279773af8eaf9");
              var donationType = $("#donateFood").text();
              var pickUpTime = $("#pickUpTime").text();
              var numOfItems = $("#number").text();
              var text = `<p>This is to confirm that your donation has been accepted. </p> <ul> <p> <li> Donation: `+ donationType +` </li> </p> <p> <li> Number of items: `+ numOfItems +` </li> </p><p> <li> Pickup time:  `+ pickUpTime +` </li> </p> <p>Thank you again for your generosity! </p> <p style="text-align:center;"> — KarmaFoodBank </p>`
              var userEmail = firebase.auth().currentUser.email;

        
              $.ajax({
                url: "https://us-central1-empower-hope.cloudfunctions.net/api/mailgun-api/sandboxc502a7a2dae748469de9804c3742317f.mailgun.org/messages",
                method: "POST",
                headers: {"Authorization": hdrVal},
                data: {
                  from: "jojoenos@gmail.com",
                  to: "jojoenos@gmail.com",
                  subject: "Hello from KarmaFoodBank",
                  html: text

                  },

                }).then(function(response){
                });
              }

            donatorAcceptedEmail()

          } else {
            var checkCheckBox = "Please select at least one checkbox." 
          
            $("#filled-in-box").validate({
              rules: {
                check: {
                  required: true,
                }
              },
              messages: {
                check: {
                  required: "Select at least one checkbox."
                }
              },
              errorElement : 'p',
              errorPlacement: function(error,element) {
                var placement = $(element).data("error");
                if (placement) {
                  $(placement).append(error)
                } else {
                  error.insertAfter(element);
                }
              }
            });


          };

        });
     });


  	   database.ref("users/" + userId + "/profile").on("value", function(snapshot) {

        console.log("snapshot here" + snapshot.val();

        console.log(snapshot.val().restaurant);
    
        var restaurant = snapshot.val().restaurant;
    		var restaurantAddress = snapshot.val().restaurantAddress;
    		var donateFood = snapshot.val().donateFood;
    		var menuNumber = snapshot.val().menuNumber;
    		var value = snapshot.val().value;
    		var pickUp = snapshot.val().pickUp;
        var userId = snapshot.val().user;

    		var donationTable = $("#donationTable");
    		donationTable.append("<tr><th>"+ restaurant +"</th><th>" + restaurantAddress +"</th><th>"+ donateFood +"</th><th>"+ menuNumber + "</th><th>"+ pickUp + "</th><th><p><input type='checkbox' class='filled-in happy' id='"+ userId +"'/><label for='"+ userId + "'></label></p></tr>");

    	}, function(errorObject) {
    		console.log("The read failed: " + errorObject.code);
    	});

               } else {
          console.log("No user is signed in");
        }
    });    



});


