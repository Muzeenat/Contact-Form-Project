// Grap the form and input elements
// Description: This script handles form validation and submission for a contact form.
let form = document.querySelector(".contactForm");
let firstNameInput = document.querySelector(".firstName");
let lastNameInput = document.querySelector(".lastName");
let emailInput = document.querySelector(".emailAddress");
let queryTypeInput = document.querySelectorAll(".query");
let messageInput = document.querySelector(".messageContent");
let consentInput = document.querySelector(".consent");
let submitButton = document.querySelector("button");

//  Grap all error message elements
let errFirstName = document.querySelector(".error-fn");
let errLastName = document.querySelector(".error-ln");
let errEmail = document.querySelector(".error-em");
let errQueryType = document.querySelector(".error-qt");
let errMessage = document.querySelector(".error-msg");
let errConsent = document.querySelector(".error-checkbox");

// Grap success message element/toaster
let successToaster = document.querySelector(".success");
// Show or hide the success toaster
let toggleToast = (show) => {
  if (show) {
    successToaster.classList.remove("hidden");
    setTimeout(() => {
      successToaster.classList.add("hidden");
    }, 3000); // Hide after 3 seconds
  } else {
    successToaster.classList.add("hidden");
  }
};

// Function to validate the form inputs. to shwow/ hide error messages

let showError = (errMsg, see, inputBorder) => {
  if (see) {
    errMsg.classList.remove("hidden");
    inputBorder.style.borderColor = "var(--Red)"; // Change border color to red
  } else {
    errMsg.classList.add("hidden");
    inputBorder.style.borderColor = "var(--Grey500)"; // Reset border color
  }
};

//
queryTypeInput.forEach((eachRadio) => {
  eachRadio.addEventListener("change", () => {
    queryTypeInput.forEach((eachDiv) => {
      let wrapper = eachDiv.parentElement;
      if (eachDiv.checked) {
        wrapper.style.backgroundColor = "var(--Green200)";
      } else {
        wrapper.style.backgroundColor = "";
      }
    });
    // hide the error message when a radio button is selected
    errQueryType.classList.add("hidden");
  });
});

// Event listener

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from disappaering after submission

  let isValid = true; // Flag to track if the form is valid

  //  Validate first name
  if (firstNameInput.value.trim() === "") {
    showError(errFirstName, true, firstNameInput);
    isValid = false;
  } else {
    showError(errFirstName, false, firstNameInput);
  }

  //  Validate last name
  if (lastNameInput.value.trim() === "") {
    showError(errLastName, true, lastNameInput);
    isValid = false;
  } else {
    showError(errLastName, false, lastNameInput);
  }

  //  Validate email
  if (emailInput.value.trim() === "") {
    showError(errEmail, true, emailInput);
    isValid = false;
  } else {
    showError(errEmail, false, emailInput);
  }

  //  Validate query type
  // let checked = document.querySelector("input.query:checked");

  // Validating Query Type (at least one radio checked before submission)
  // let queryTypeValue = checked ? checked.value : "";

  // Show or hide error message based on the query type value
  // if (!queryTypeValue) {
  //   showError(errQueryType, true);
  //   isValid = false;
  // } else {
  //   showError(errQueryType, false);
  // }

  let checkedRadio = document.querySelector("input.query:checked");
  if (!checkedRadio) {
    errQueryType.classList.remove("hidden");
    isValid = false;
  }

  // Validating Message
  if (messageInput.value.trim() === "") {
    showError(errMessage, true, messageInput);
    isValid = false;
  } else {
    showError(errMessage, false, messageInput);
  }

  // Validating Consent Checkbox
  if (!consentInput.checked) {
    showError(errConsent, true, consentInput);
    isValid = false;
  } else {
    showError(errConsent, false, consentInput);
  }
  // If the form is valid, submit it
  if (isValid) {
    let formData = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      queryType: checkedRadio.value,
      message: messageInput.value.trim(),
      consent: consentInput.checked,

      // =====================DIFFERENT OPTION===================================
      // console.log(firstNameInput.value);
      // console.log(lastNameInput.value);
      // console.log(emailInput.value);
      // console.log(queryTypeValue);
      // console.log(messageInput.value);
      // console.log(consentInput.checked);
    };

    console.log("Form submitted successfully:", formData);
    toggleToast(true);

    form.reset();

    queryTypeInput.forEach((eachRadio) => {
      eachRadio.parentElement.style.backgroundColor = "";
    });
  }
});