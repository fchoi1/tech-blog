async function editPostFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  //ignore-prettier
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title }),
    headers: { 'Content-Type': 'application/json' }
  });
  response.ok
    ? document.location.replace('/dashboard')
    : alert(response.statusText);
}
//ignore-prettier
document.querySelector('.edit-post-form').addEventListener('submit', editPostFormHandler);
