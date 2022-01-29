function newPostHandler(event) {
  document.location.replace('/dashboard/new-post');
}
//prettier-ignore
document.querySelector('.new-post-btn').addEventListener('click', newPostHandler);
