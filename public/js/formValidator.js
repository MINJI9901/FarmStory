// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            }
    
            form.classList.add('was-validated')
        }, false)
    })
})()


// ******************************************************** SIGN-UP VALIDATOR ********************************************************
const signUpForm = document.querySelector('#sign-up-pop-up').querySelector('FORM');
const username = signUpForm.querySelector('.username');
const password = signUpForm.querySelector('.password');
const reenteredPassword = signUpForm.querySelector('.re-enter-password');
let isValid = null;

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

signUpForm.addEventListener('submit', ev => {
    if (username.classList.contains('is-valid') && password.classList.contains('is-valid') && reenteredPassword.classList.contains('is-valid')) {
        isValid = true;
    }
    if (!isValid) {
        ev.preventDefault();
        ev.stopPropagation();
        if (!username.value) {
            username.classList.add('is-invalid');
            username.classList.remove('is-valid');
        }
        if (!password.value) {
            password.classList.add('is-invalid');
            password.classList.remove('is-valid');
        }
        if (!reenteredPassword.value) {
            reenteredPassword.classList.add('is-invalid');
            reenteredPassword.classList.remove('is-valid');
        }
    }
})

username.addEventListener('keyup', () => {
    fetch('http://localhost:3000/signup/fake', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.value })
    })
        .then(res => res.json())
        .then(data => {
            if (data) {
                username.classList.add('is-valid');
                username.classList.remove('is-invalid');
            } else {
                username.classList.add('is-invalid');
                username.classList.remove('is-valid');
            }
        })
        .catch(err => console.log(err))
})

password.addEventListener('keyup', () => {
    if (passwordRegex.test(password.value)) {
        password.classList.add('is-valid');
        password.classList.remove('is-invalid');
    } else {
        password.classList.add('is-invalid');
        password.classList.remove('is-valid');
    }
})

reenteredPassword.addEventListener('keyup', () => {
    if (reenteredPassword.value !== password.value) {
        reenteredPassword.classList.add('is-invalid');
        reenteredPassword.classList.remove('is-valid');
    } else {
        reenteredPassword.classList.add('is-valid');
        reenteredPassword.classList.remove('is-invalid');
    }
})
