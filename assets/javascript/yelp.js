$(document).ready(function() {
  var yelpObject;

  $("#yelp").on("click", function() {
    yelpInfo();
  });

  function yelpInfo() {
  
    var restaurant = $("#restaurant").val();
    var zipCode = $("#zipCode").val();
    var queryURLSearchYelp = 'https://api.yelp.com/v3/businesses/search';
    var apiKeyYelp = 'Bearer zTJpqez7KoUP_Bzx4wKMATc6I8FFHexDEaczh9IZCqtlhEL1_TT4bzfVK-j5o0Ur01YoaXkzhmxMtv3uMmwm587ofMKFUCxEfF0iGPlso_fvkObv21lMj9m1Iu5xWnYx'


    $.ajax({
      url: "https://cors-anywhere.herokuapp.com/" + queryURLSearchYelp,
      "crossDomain": true,
      method: "GET",
      data: {
        location: zipCode,
                  term: restaurant,
                  limit: 5
      },
      headers: {
        "Authorization": apiKeyYelp
      }

    }).then(function(response) {
      yelpObject = response;

      $("#yelpInfo").html("");
      $.each(response.businesses, function(index, item) {
    
        var organizationYelpAddress = item.location.address1 + ", " + item.location.city + ", " +
            item.location.city + " " + item.location.state + " " + item.location.zip_code;


        var organizationYelpList = $('<div>' + item.name + ' Location: ' + item.location.address1 + ' '
           + item.location.city + " " + item.location.state + " " + item.location.zip_code +
           '<button type="button" class="selectName" data-name="'+ item.name + '" data-address="' + organizationYelpAddress +
           '"">Submit</button></div>');


        $("#yelpInfo").append(organizationYelpList);
      });
    });
  };

  $(document).on("click", ".selectName", function(event) {

    var selectedDonor = $(this);

    event.preventDefault();

    var user = firebase.auth().currentUser.uid;
    var email = firebase.auth().currentUser.email;
 
    var profile = {
      user: user,
      email: email,
      restaurant: selectedDonor.data('name'),
      restaurantAddress: selectedDonor.data('address')
    };

  
    firebase.database().ref("/users/" + user + "/profile").set(profile).then(function(){
        location.href="Donate.html";
    });;


  });

});
