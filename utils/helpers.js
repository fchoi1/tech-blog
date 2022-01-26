module.exports = {
  displayTitle: (page) => {
      console.log('test function')
    return page == 'homepage'
      ? '<a href="/">Tech Blog</a>'
      : '<a href="/dashboard">Your dashboard</a>';
  }
};

