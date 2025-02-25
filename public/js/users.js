// ******************************************************** SHOW LOGIN POP-UP ********************************************************

const loginButton = document.querySelector('.login-link');
const loginPopup = document.querySelector('#login-pop-up');

loginButton.addEventListener('click', () => {
    loginPopup.classList.remove('d-none');
    document.body.style.overflow = 'hidden';
})

// ******************************************************** SHOW SIGN-UP POP-UP ********************************************************

const singUpButton = document.querySelector('.sign-up-link');
const signUpPopup = document.querySelector('#sign-up-pop-up');

singUpButton.addEventListener('click', () => {
    signUpPopup.classList.remove('d-none');
    document.body.style.overflow = 'hidden';
})