
$(document).ready(function() {
	

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
