/* eslint-disable @stylistic/js/indent */
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (max, obj) => (obj.likes > max.likes ? obj : max),
    blogs[0]
  );
};

const mostBlogs = (blogs) => {
  return blogs.reduce(
    (max, obj) => (obj.blogs > max.blogs ? obj : max),
    blogs[0]
  );
};

const mostLikes = (blogs) => {
  const emptyList = blogs.length === 0;
  return emptyList
    ? undefined
    : blogs.reduce((max, obj) => (obj.likes > max.likes ? obj : max), blogs[0])
        .author;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
