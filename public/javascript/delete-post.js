
async function deleteFormHandler(event) {
  event.preventDefault();
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  response.ok
    ? document.location.replace('/dashboard')
    : alert(response.statusText);
}

//ignore-prettier
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
