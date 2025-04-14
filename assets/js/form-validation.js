document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // error
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // success
    const formSuccess = document.getElementById('formSuccess');

    // real-time validation
    nameInput.addEventListener('input', () => validateName(nameInput, nameError));
    emailInput.addEventListener('input', () => validateEmail(emailInput, emailError));
    messageInput.addEventListener('input', () => validateMessage(messageInput, messageError));

    // Add form submit event listener
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // validate all fields
      const isNameValid = validateName(nameInput, nameError);
      const isEmailValid = validateEmail(emailInput, emailError);
      const isMessageValid = validateMessage(messageInput, messageError);

      if (isNameValid && isEmailValid && isMessageValid) {
        submitForm();
      }
    });
  }
});


function validateName(input, errorElement) {
  errorElement.textContent = '';

  const value = input.value.trim();

  if (value === '') {
    errorElement.textContent = 'Por favor, digite seu nome.';
    input.classList.add('error');
    return false;
  }

  if (value.length < 3) {
    errorElement.textContent = 'O nome deve ter pelo menos 3 caracteres.';
    input.classList.add('error');
    return false;
  }

  const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;

  if (!nameRegex.test(value)) {
    errorElement.textContent = 'O nome deve conter apenas letras.';
    input.classList.add('error');
    return false;
  }

  input.classList.remove('error');
  return true;
}

function validateEmail(input, errorElement) {
  errorElement.textContent = '';

  const value = input.value.trim();

  if (value === '') {
    errorElement.textContent = 'Por favor, digite seu e-mail.';
    input.classList.add('error');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    errorElement.textContent = 'Por favor, digite um e-mail válido.';
    input.classList.add('error');
    return false;
  }

  input.classList.remove('error');
  return true;
}

function validateMessage(input, errorElement) {
  errorElement.textContent = '';

  const value = input.value.trim();

  if (value === '') {
    errorElement.textContent = 'Por favor, digite sua mensagem.';
    input.classList.add('error');
    return false;
  }

  if (value.length < 10) {
    errorElement.textContent = 'A mensagem deve ter pelo menos 10 caracteres.';
    input.classList.add('error');
    return false;
  }

  input.classList.remove('error');
  return true;
}

function submitForm() {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitButton = document.querySelector('.btn-submit');

  // loading
  submitButton.textContent = 'Enviando...';
  submitButton.disabled = true;

  setTimeout(() => {
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';

    formSuccess.classList.add('fade-in');

    contactForm.reset();

    submitButton.textContent = 'Enviar Mensagem';
    submitButton.disabled = false;

    console.log('Form submitted successfully');
  }, 1500);
}