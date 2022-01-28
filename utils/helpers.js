module.exports = {
  displayTitle: (page) => {
    return page == 'homepage'
      ? '<a href="/">Tech Blog</a>'
      : '<a href="/dashboard">Your dashboard</a>';
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  format_plural: (word, amount) => (amount > 1 ? `${word}s` : word),
  format_text: (content, id) => {
  
   return content.length > 200 ? content.slice(0, 200) + `..... <a class="see-more" href='/posts/${id}'> see more </a>` : content
  }
};
