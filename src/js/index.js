const form = document.querySelector('form');
const popupLogin = document.querySelector('#popup-login');
const showPopupLogin = document.querySelector('#show-popup-login');
const closePopupLogin = document.querySelector('#close-popup-login');

const inputEmail = document.querySelector('#input-email');
const inputPassword = document.querySelector('#input-password');
const inputCheckbox = document.querySelector('#input-checkbox1');

// Variables
const errors = {
	email: {
		EMPTY: 'E-mail cannot be empty.',
		VALID: 'E-mail is not valid.',
	},
	password: {
		EMPTY: 'Password cannot be empty.',
	},
	agreement: {
		DEFAULT: 'You must agree to terms & conditions.',
	},
};

// Input status
const setError = (input, message) => {
	const parent = input.parentElement;
	const errorInfo = parent.querySelector('.error-info');
	parent.classList.remove('success');
	parent.classList.add('fail');
	errorInfo.innerText = message;
	return false;
};

const setSuccess = input => {
	const parent = input.parentElement;
	parent.classList.remove('fail');
	parent.classList.add('success');
	return true;
};

// --- Validations ---
// Validation helpers
const isEmailValid = email => {
	const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	return regex.test(String(email).toLowerCase());
};

const isEmpty = value => {
	return value === '';
};

// Validations: e-mail (required, regex); password (required); checkbox (required)
const checkEmail = () => {
	const emailValue = inputEmail.value.trim();

	if (!emailValue && isEmpty(emailValue))
		return isEmpty(emailValue)
			? setError(inputEmail, errors.email.EMPTY)
			: setSuccess(inputEmail);

	if (!isEmpty(emailValue) && !isEmailValid(emailValue))
		return !isEmailValid(emailValue)
			? setError(inputEmail, errors.email.VALID)
			: setSuccess(inputEmail);

	return setSuccess(inputEmail);
};

const checkPassword = () => {
	const passwordValue = inputPassword.value.trim();
	return isEmpty(passwordValue)
		? setError(inputPassword, errors.password.EMPTY)
		: setSuccess(inputPassword);
};

const checkCheckbox = () => {
	const checkboxChecked = inputCheckbox.checked;
	return checkboxChecked
		   ? setSuccess(inputCheckbox)
		: setError(inputCheckbox, errors.agreement.DEFAULT);
};

// Functions container
const checkInputs = () => {
	const checkEmailBool = checkEmail();
	const checkPasswordBool = checkPassword();
	const checkCheckboxBool = checkCheckbox();

	const credentialsAreValid =
		checkEmailBool && checkPasswordBool && checkCheckboxBool;
};

// --- Actions ---
// Popup
const handleShowPopupLogin = () => {
	popupLogin.classList.add('show');
};

const handleClosePopupLogin = () => {
	popupLogin.classList.remove('show');
};

// Form
const handleFormSubmit = e => {
	e.preventDefault();
	checkInputs();
};

// Event listeners
showPopupLogin.addEventListener('click', handleShowPopupLogin);
closePopupLogin.addEventListener('click', handleClosePopupLogin);
form.addEventListener('submit', handleFormSubmit);