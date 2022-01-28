
async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  //prettier-ignore
  const content = document.querySelector('#post-content').value.trim();

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  response.ok
    ? document.location.replace('/dashboard')
    : alert(response.statusText);
}
//prettier-ignore
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
