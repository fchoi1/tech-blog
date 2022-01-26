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
  }
};
