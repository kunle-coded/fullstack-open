const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("../tests/test_helper");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Testing is crucial to software development",
    author: "Kunle Ade",
    url: "http://localhost:3001/my-first-blog-post",
    likes: 15,
  },
  {
    title: "Backend testing is important",
    author: "John Doe",
    url: "http://localhost:3001/my-second-blog-post",
    likes: 13,
  },
];

const newBlog = {
  title: "Async/await simplifies making async calls",
  author: "John Doe",
  url: "http://localhost:3001/my-second-blog-post",
  likes: 10,
};

describe.only("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    const post1 = response.body[0];
    const post2 = response.body[1];

    assert("id" in post1);
    assert("id" in post2);
  });

  test.only("a valid blog can be added", async () => {
    const oldUser = {
      username: "root",
      password: "secrete",
    };

    const result = await api
      .post("/api/login")
      .send(oldUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const body = result.body;

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${body.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);

    assert.strictEqual(response.body.length, initialBlogs.length + 1);
    assert(contents.includes("Async/await simplifies making async calls"));
  });

  test("likes property missing from the request", async () => {
    const newBlog = {
      title: "Testing is crucial to software development",
      author: "Kunle Ade",
      url: "http://localhost:3001/my-first-blog-post",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.likes, 0);
  });

  test("title property missing from the request data", async () => {
    const newBlog = {
      author: "Kunle Ade",
      url: "http://localhost:3001/my-first-blog-post",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  test("url property missing from the request data", async () => {
    const newBlog = {
      title: "Testing is crucial to software development",
      author: "Kunle Ade",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsInDB = await api.get("/api/blogs");

      const blogToDelete = blogsInDB.body[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAfterDel = await api.get("/api/blogs");

      assert.strictEqual(blogsAfterDel.body.length, blogsInDB.body.length - 1);

      const contents = blogsAfterDel.body.map((r) => r.id);
      assert(!contents.includes(blogToDelete.id));
    });
  });

  describe("updating a blog", () => {
    test("succeeds with status code 201 if id is valid", async () => {
      const blogsInDB = await api.get("/api/blogs");

      const blogToUpdate = blogsInDB.body[0];
      const newBlog = {
        ...blogToUpdate,
        likes: 17,
      };

      const response = await api
        .put(`/api/blogs/${newBlog.id}`)
        .send(newBlog)
        .expect(201);

      assert.strictEqual(response.body.likes, newBlog.likes);
    });
  });
});

// User tests
describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secrete", 10);
    const user = new User({
      name: "Superuser",
      username: "root",
      passwordHash,
    });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      name: "Kunle Ade",
      username: "kunleade",
      password: "kunledegreat",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    assert(usernames.includes(newUser.username));
  });

  describe("when there is initially one user in db", () => {
    test("creation fails with proper status code and message if username already taken", async () => {
      const usersAtStart = await helper.usersInDB();

      const newUser = {
        username: "root",
        name: "Superuser",
        password: "salainen",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDB();
      assert(result.body.error.includes("expected `username` to be unique"));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test("creation fails if username or password fails validation", async () => {
      const usersAtStart = await helper.usersInDB();

      const newUser = {
        username: "root",
        name: "Testuser",
        password: "te",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDB();

      assert(result.body.error.includes("Password is too short"));
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
  });

  describe("a logged in user can post a blog", () => {
    test("when user login succeeds, and blog post sends successfully", async () => {
      const oldUser = {
        username: "root",
        password: "secrete",
      };

      const result = await api
        .post("/api/login")
        .send(oldUser)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const body = result.body;

      const newBlog = {
        title: "A test to post blog by an authorized user",
        author: "Superuser",
        url: "http://localhost:3001/my-second-blog-post",
        likes: 5,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${body.token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/blogs");
      const contents = response.body.map((r) => r.title);

      assert.strictEqual(oldUser.username, body.username);

      assert.strictEqual(response.body.length, initialBlogs.length + 1);
      assert(contents.includes("A test to post blog by an authorized user"));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
