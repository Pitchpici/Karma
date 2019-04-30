
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
    var key;

    var obj = {
      donateFood: null,
      value: null,
      pickUp: null,
      menuNumber: null
  };


firebase.auth().onAuthStateChanged(function(user) {

          if (user) {
            // User is signed in.
            userId = firebase.auth().currentUser.uid;
            console.log("This is the user id: " + userId);

            userEmail = firebase.auth().currentUser.email;
            console.log("This is the user email: " + userEmail);


//SUBMIT PAGE


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
          pickUp: pickUp,
          userId: userId
        };


      // var userEmail = "jojoenos@gmail.com";
      // var donationType = $("#donateFood").val().trim();
      // var numPeople = $("#menuNumber").val().trim();
      // var donationValue = $("#value").val().trim();
      // var pickUpTime = $("#pickUp").val().trim();


//MailGun API config
      function donatorEmail(donateFood, menuNumber, value, pickUp) {
          var queryURL = "https://api.mailgun.net/v3/";
          var hdrVal = "Basic " + btoa("key-3cc8d12f860ed426a1731d7c67e56c4a");
          // var userEmail = "jojoenos@gmail.com";

          // var donationType = $("#donateFood").val().trim();


          var text = `<p>Thank you so much for your generous donation.</p>
            <p>Your benevolence is appreciated and you will reap the karmic rewards of that.</p>
            <p>This is to confirm that you have offered this to the community today: </p>
              <ul>
                <li> Donation: ${donateFood} </li>
                <li> Approximate value:  ${value} </li>
                <li> For number of people: ${menuNumber} </li>
                <li> Pick up time: ${pickUp} </li>
              </ul>
            <p>You will receive an email if an organization in need will be able to benefit from this donation. </p>
            <p>Thank you again for your KarmaFoodBank charity!</p>
            <p style="text-align:center"> — KarmaFoodBank </p>`

            $.ajax({
              url: "https://api.mailgun.net/v3/sandboxfdbe5a70fece4951b5aaa822e99fe7cc.mailgun.org",
              method: "POST",
              headers: {"Authorization": hdrVal},
              data: {
                from: "roxanamilea@ymail.com",
                to: userEmail,
                subject: "Hello from KarmaFoodBank",
                html: text

                },

              }).then(function(response){
                 console.log(response);
                 console.log(userEmail);
              });

        }

        donatorEmail(donateFood, menuNumber, value, pickUp);

//empty fields
        $("#donateFood").val("");
        $("#menuNumber").val("");
        $("#value").val("");
        $("#pickUp").val("");
      }

  		database.ref("/donations/" + userId).push(temp);
      //database.ref("/donations").push(temp);

    });

  	   database.ref("/donations").on("value", function(snapshot) {

          console.log("snapshot here: " + JSON.stringify(snapshot.val()));
          console.log("Donate Food value: " + snapshot.val());
          // var donationTable = $("#donationTable");


        snapshot.forEach(function(childSnapshot) {
          console.log("aaa =====>  " + childSnapshot.val()); //this is working now
          console.log("id of childsnapshot " + childSnapshot.val().userId);

          var tempId = childSnapshot.val().userId;
          var key = childSnapshot.key.substr(1);
          console.log("here's the key: " + key);

          var donationRow = $("<tr>");
          var foodType = $("<th>").text(childSnapshot.val().donateFood);
          var menuNumbers = $("<th>").text(childSnapshot.val().menuNumber);
          var time = $("<th>").text(childSnapshot.val().pickUp);
          var checkbox = $("<th>").html(`<p><input type='checkbox' class='filled-in happy' id='${key}'/>
                                        <label for='${key}'></label></p>`);

          donationRow.append(foodType).append(menuNumbers).append(time).append(checkbox);


          database.ref("users/" + tempId).on("value", function(snapshot) {

              snapshot.forEach(function(childSnapshot) {
                  if (childSnapshot.val().user == tempId) {
                    console.log("This is the profile info: " + childSnapshot.val().restaurantAddress);

                    var name = $("<th>").text(childSnapshot.val().restaurant);
                    var address = $("<th>").text(childSnapshot.val().restaurantAddress);

                    donationRow.prepend(address).prepend(name);
                  }

              })
          })

          donationTable.append(donationRow);

        });


    	}, function(errorObject) {
    		console.log("The read failed: " + errorObject.code);
    	});

               } else {
          console.log("No user is signed in");
        }
    });


//DONATE PAGE

    $("#btnHappy").on("click", function(event) {

      event.preventDefault();


         emailArray = [];

         $(".happy").each(function(index, element) {


           if (element.checked) {

             console.log("This is the checked element: " + element);

            $(this).parents("tr").remove();

             key = $(this).attr("id");

             console.log("This is the selected item's key: " + key); //this is the donation unique key

             database.ref(`donations/-${key}`).remove();

//this triggers the bug in the angels table - -----------

                   database.ref("users/" + userId + "/profile").once('value').then(function(snapshot) {

                     var donorEmail = snapshot.val().email;
                     console.log("This is the donor email: " + donorEmail);

                     emailArray.push(donorEmail);
                     console.log(emailArray);

                     return emailArray;
                   });


           }

               console.log('outerspace' + emailArray);
           });// close button happy


      console.log("key" + key);

       database.ref("users/" + key + "/profile").update(obj);

      $("#donation").on("click",function(event) {
          if ($("#filled-in-box").is(":checked")) {



            console.log("Donation ready for pick up!");
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

              console.log("This is the user email?" + userEmail);


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




});
