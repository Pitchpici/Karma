
$(document).ready(function() {

function donatorAcceptedEmail(donationType, receiver, pickUpTime, contactName) {
	var queryURL = "https://api.mailgun.net/v3/";
	var hdrVal = "Basic " + btoa("api:key-ef72536d6301ae8ec42279773af8eaf9");
	var text = `<p>This is to confirm that your donation has been accepted by: </p> <p> <p>Donation: </p> <p>Receiver:  </p> <p> Pickup window & time: </p> <p> Contact Name: </p> <p>Thank you again for your generosity! </p> <p style="text-align:center;"> — KarmaFoodBank </p>`

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
		   console.log(response);
		});
	}


	$(".submit").click(function() {
	
		var donationType = $("#donateFood").val().trim();
		var receiver = $("#menuNumber").val().trim();
		var pickUpTime = $("#value").val().trim();
		var contactName =

		donatorAcceptedEmail(donationType, receiver, pickUpTime, contactName) 

	})
});
