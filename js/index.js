// For changing interest dropdown color after selection
function changeDropdownColor(self) {
   self.style.color = "#000";
}

/*
   Form handling
*/

var submittable = true;

var submitHandler = function submitHandler(e) {
   e.preventDefault();
   if (submittable) {
      var formData = new FormData(e.target);
      var error = document.querySelector(".form__error");
      error.innerHTML = "";

      if (!validateEmail(formData.get("email"))) {
         error.innerHTML = "Please enter a valid email address";
         return;
      } else {
         var user = {
            email: formData.get("email"),
            interest: formData.get("interest")
         };
         sendSubscribeRequest(user);
         submittable = false;
      }
   }
};

document.querySelector("form").addEventListener("submit", submitHandler);

function successfulSubmission() {
   document.querySelector(".form__container").style.display = "none";
   document.querySelector(".form__success-msg").style.display = "block";
}

function unsuccessfulSubmission() {
   console.log("Failed to sign user up!");
}

function sendSubscribeRequest(user) {
   var submitButton = document.getElementById("submit-button");
   submitButton.value = "Submitting...";
   setTimeout(function () {
      var success = true;
      console.log("Email: " + user.email);
      console.log("Interest: " + user.interest);
      success ? successfulSubmission() : unsuccessfulSubmission();
   }, 2000);
}

// Email validator (taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript)
function validateEmail(email) {
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}