// For changing interest dropdown color after selection
var changeDropdownColor = function changeDropdownColor(self) {
   self.style.color = "#000";
};

var removeErrorNotification = function removeErrorNotification() {
   var errorMsg = document.querySelector(".form__error");
   errorMsg.innerHTML = "";
};

// Form handling
var state = {
   submittable: true
};

var submitHandler = function submitHandler(event) {
   event.preventDefault();
   if (state.submittable) {
      var formData = new FormData(event.target);
      var error = document.querySelector(".form__error");
      var email = formData.get("email");
      var interest = formData.get("interest");
      error.innerHTML = "";

      if (!validateEmail(email)) {
         // Design currently restricts submission based off validity of email only so interest field is optional
         error.innerHTML = "Please enter a valid email address";
      } else {
         var user = {
            email: email,
            interest: interest
         };
         state.submittable = false;
         sendSubscribeRequest(user);
      }
   }
};

var successfulSubmission = function successfulSubmission() {
   document.querySelector(".form__container").style.display = "none";
   document.querySelector(".form__success-msg").style.display = "block";
};

var unsuccessfulSubmission = function unsuccessfulSubmission() {
   // Failed submission procedure
};

var sendSubscribeRequest = function sendSubscribeRequest(user) {
   var submitButton = document.getElementById("submit-button");
   submitButton.innerHTML = "Submitting...";
   console.log("Email: " + user.email);
   console.log("Interest: " + user.interest);

   // Simulated response returned as promise
   var response = new Promise(function (resolve, reject) {
      setTimeout(function () {
         var request = {
            status: 'success',
            data: 'some-data'
         };
         if (request.status === 'success') {
            resolve(request.data);
         } else {
            var errormsg = "some-error";
            reject(errormsg);
         }
      }, 2000);
   });

   response.then(function (result) {
      successfulSubmission();
   }).catch(function (err) {
      console.log(err);
      unsuccessfulSubmission();
   });
};

// Email validator (taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript)
var validateEmail = function validateEmail(email) {
   var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return EMAIL_REGEX.test(String(email).toLowerCase());
};