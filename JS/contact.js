const contactForm = document.querySelector ('.contactform');
const firstName = document.querySelector ('#firstName');
const firstNameError = document.querySelector ('#firstNameError');
const email = document.querySelector ('#email');
const emailError = document.querySelector ('#emailError');
const subject = document.querySelector ('#subject');
const subjectError = document.querySelector ('#subjectError');
const message = document.querySelector ('#message');
const messageError = document.querySelector ('#messageError');
const button = document.querySelector ('#submit');

function validateForm (event) {
  event.preventDefault ();

  if (checkLength (firstName.value, 4)) {
    firstNameError.style.display = 'none';
  } else {
    firstNameError.style.display = 'block';
    console.log ('The name must be at least 5 characters.');
  }

  if (validateEmail (email.value)) {
    emailError.style.display = 'none';
  } else {
    emailError.style.display = 'block';
    console.log ('The e-mail is not valid.');
  }

  if (checkLength (subject.value, 14)) {
    subjectError.style.display = 'none';
  } else {
    subjectError.style.display = 'block';
    console.log ('The subject must be at least 15 characters.');
  }

  if (checkLength (message.value, 24)) {
    messageError.style.display = 'none';
  } else {
    messageError.style.display = 'block';
    console.log ('The message must be at least 25 characters.');
  }

  if (
    checkLength (firstName.value, 4) &&
    validateEmail (email.value) &&
    checkLength (subject.value, 14) &&
    checkLength (message.value, 24)
  ) {
    contactForm.innerHTML += `<div class="message-sent"><h3>Your message has been sent!</h3></div>`;
    console.log ('Form was successfully sent.');
  }
}

button.addEventListener ('click', validateForm);

function checkLength (value, len) {
  if (value.trim ().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail (email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test (email);
  return patternMatches;
}
