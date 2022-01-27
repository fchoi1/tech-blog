
async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  //prettier-ignore
  const post_url = document.querySelector('input[name="post-url"]').value.trim();

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ title, post_url }),
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
