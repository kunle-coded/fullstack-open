const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const dummy = listHelper.dummy;
const totalLikes = listHelper.totalLikes;
const favouriteBlog = listHelper.favoriteBlog;
const mostBlogs = listHelper.mostBlogs;
const mostLikes = listHelper.mostLikes;

// Dummy test
test("dummy returns one", () => {
  const blogs = [];

  const result = dummy(blogs);
  assert.strictEqual(result, 1);
});

// Test for the total likes of all blog posts
describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];

    const result = totalLikes(blogs);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        id: "65ec7c63b453f20ca486ccf6",
        title: "My first blog post",
        author: "Kunle Ade",
        url: "http://localhost:3001/my-first-blog-post",
        likes: 15,
      },
    ];

    const result = totalLikes(blogs);
    assert.strictEqual(result, 15);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        id: "65ec7c63b453f20ca486ccf6",
        title: "My first blog post",
        author: "Kunle Ade",
        url: "http://localhost:3001/my-first-blog-post",
        likes: 15,
      },
      {
        id: "65ec8932b704818bbad9aa55",
        title: "My second blog post",
        author: "Kunle Ade",
        url: "http://localhost:3001/my-second-blog-post",
        likes: 13,
      },
    ];

    const result = totalLikes(blogs);
    assert.strictEqual(result, 28);
  });
});

// Test for blog with highest number of likes
describe("favourite blog", () => {
  test("of empty list is zero", () => {
    const blogs = [];

    assert.deepStrictEqual(favouriteBlog(blogs), undefined);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        id: "65ec7c63b453f20ca486ccf6",
        title: "My first blog post",
        author: "Kunle Ade",
        url: "http://localhost:3001/my-first-blog-post",
        likes: 15,
      },
    ];

    assert.deepStrictEqual(favouriteBlog(blogs), blogs[0]);
  });

  test("blog with the most likes", () => {
    const blogs = [
      {
        id: "65ec7c63b453f20ca486ccf6",
        title: "My first blog post",
        author: "Kunle Ade",
        url: "http://localhost:3001/my-first-blog-post",
        likes: 15,
      },
      {
        id: "65ec8932b704818bbad9aa55",
        title: "My second blog post",
        author: "Kunle Ade",
        url: "http://localhost:3001/my-second-blog-post",
        likes: 13,
      },
    ];

    assert.deepStrictEqual(favouriteBlog(blogs), blogs[0]);
  });
});

// Test for author with the most blog posts
describe("Most blogs", () => {
  test("of empty list is zero", () => {
    const blogs = [];

    assert.deepStrictEqual(mostBlogs(blogs), undefined);
  });

  test("when list has only one author equals the likes of that", () => {
    const blogs = [
      {
        author: "Edsger W. Dijkstra",
        blogs: 7,
      },
    ];

    assert.deepStrictEqual(mostBlogs(blogs), blogs[0]);
  });

  test("author with most blogs", () => {
    const blogs = [
      {
        author: "Robert C. Martin",
        blogs: 7,
      },
      {
        author: "Edsger W. Dijkstra",
        blogs: 3,
      },
      {
        author: "Kunle A. Adesokan",
        blogs: 9,
      },
    ];

    assert.deepStrictEqual(mostBlogs(blogs), blogs[2]);
  });
});

describe("Most likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];

    assert.deepStrictEqual(mostLikes(blogs), undefined);
  });

  test("when list has only one author equals the likes of that", () => {
    const blogs = [
      {
        author: "Edsger W. Dijkstra",
        blogs: 7,
      },
    ];

    assert.deepStrictEqual(mostLikes(blogs), "Edsger W. Dijkstra");
  });

  test("of an author, whose blog posts have the most likes", () => {
    const blogs = [
      {
        author: "Robert C. Martin",
        likes: 10,
      },
      {
        author: "Edsger W. Dijkstra",
        likes: 17,
      },
      {
        author: "Kunle A. Adesokan",
        likes: 12,
      },
    ];

    assert.strictEqual(mostLikes(blogs), "Edsger W. Dijkstra");
  });
});
