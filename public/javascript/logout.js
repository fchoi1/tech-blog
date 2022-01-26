async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });
  response.ok ? document.location.replace('/') : alert(response.statusText);
}
// add event listener on logout button
document.querySelector('#logout').addEventListener('click', logout);
