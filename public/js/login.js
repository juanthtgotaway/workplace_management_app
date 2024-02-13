const loginBtn = document.getElementById('loginBtn');
const signUpBtn = document.getElementById('signUpBtn');


const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#user-login').value.trim();
    const password = document.querySelector('#pass-login').value.trim();

    console.log(username + password);
    if (username && password) {
        const response = await fetch('api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password 
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to log in.');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#Fname-sign-up').value.trim();
    const lastName = document.querySelector('#Lname-sign-up').value.trim();
    const username = document.querySelector('#user-sign-up').value.trim();
    const password = document.querySelector('#pass-sign-up').value.trim();

    console.log(firstName, lastName ,username , password);

    if (firstName && lastName && username && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                username: username,
                password: password,
                is_manager: false
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
}

console.log('js recieved');
console.log(loginBtn)

loginBtn.addEventListener('click', loginFormHandler);
signUpBtn.addEventListener('click', signupFormHandler);
