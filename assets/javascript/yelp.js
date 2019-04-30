$(document).ready(function() {
  var yelpObject;

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

          //Create Results Table
          var restaurantTable = $("<table>").addClass("striped responsive-table centered");
          var tableHead = $("<thead><th>Name</th><th>Address</th><th>Options</th></thead>");
          restaurantTable.append(tableHead);

          var restaurantBody = $("<tbody>");
          $.each(response.businesses, function(index, item) {
            var restaurantRow = $("<tr>");

            var organizationYelpAddress = item.location.address1 + ", " + item.location.city + ", " +
                item.location.city + " " + item.location.state + " " + item.location.zip_code;

            var organizationYelpList = $(`<td> ${item.name}</td> <td> ${organizationYelpAddress}</td> <td> <button class="selectName" >Select</button></td>`);

            restaurantRow.append(organizationYelpList);
            restaurantBody.append(restaurantRow);
          });

            restaurantTable.append(restaurantBody);
            $("#yelpInfo").append(restaurantTable);
        });
      };

  $(document).on("click", ".selectName", function(event) {
    event.preventDefault();

    var selectedDonorName = $(this).closest("tr").find("td:nth-child(1)").text();
    var selectedDonorAddress = $(this).closest("tr").find("td:nth-child(2)").text();

    var user = firebase.auth().currentUser.uid;
    var email = firebase.auth().currentUser.email;
    console.log(`this is the user ID: ${user}`);

    var profile = {
      user: user,
      email: email,
      restaurant: selectedDonorName,
      restaurantAddress: selectedDonorAddress
    };


    firebase.database().ref("/users/" + user).set(profile).then(function(){
        location.href="Donate.html";
    });;

  });

  $("#yelp").on("click", function() {
    yelpInfo();
  });

});
