async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    // Check response and redirect if sucess
    response.ok
      ? document.location.replace('/dashboard')
      : alert(response.statusText);
  }
}

async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    // Check response
    response.ok
      ? document.location.replace('/dashboard')
      : alert(response.statusText);
  }
}

if (document.querySelector('.login-form')) {
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
} else {
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
}