// For changing interest dropdown color after selection
function changeColor(self) {
   self.style.color = "black";
}

/*
   Form handling
*/

var submitHandler = function submitHandler(e) {
   e.preventDefault();
   var formData = new FormData(e.target);
   var error = document.querySelector(".form__error");
   error.innerHTML = "";
   var submitButton = document.querySelector(".form__button");

   if (!validateEmail(formData.get("email"))) {
      error.innerHTML = "Please enter a valid email address";
      return;
   } else {
      submitButton.value = "Submitting...";
      setTimeout(function () {
         console.log(formData.get("email"));
         console.log(formData.get("interest"));
         successfulSubmission();
      }, 2000);
   }

   // Remove original event listener, ignore next attempts
   ignoreNextSubmit();
};

// Used to ignore successive form submissions in submitHandler
function ignoreNextSubmit() {
   var form = document.querySelector("form");
   form.removeEventListener("submit", submitHandler);
   form.addEventListener("submit", function (e) {
      return e.preventDefault();
   });
}

document.querySelector("form").addEventListener("submit", submitHandler);

function successfulSubmission() {
   document.querySelector(".form__container").style.display = "none";
   document.querySelector(".form__success-msg").style.display = "block";
}

// Email validator taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}