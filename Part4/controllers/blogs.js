const blogsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).end();
  }

  const user = request.user;

  const newBlog = {
    ...request.body,
    likes: request.body.likes ? request.body.likes : 0,
    user: user.id,
  };

  const blog = new Blog(newBlog);

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    const user = request.user;
    if (!user.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    if (blog === null) {
      return response
        .status(401)
        .json({ error: "blog with the id does not exist" });
    }

    if (user.id !== blog.user.toString()) {
      return response.status(401).json({ error: "unathorized user" });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
);

blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const user = request.user;

  const newBlog = {
    ...request.body,
    likes: request.body.isLike ? request.body.likes + 1 : request.body.likes,
    user: user.id,
  };

  const blog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });

  response.status(201).json(blog);
});

blogsRouter.put(
  "/:id/comments",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;

    const { comment, ...newBlogData } = request.body;

    const newBlog = {
      ...newBlogData,
      comments: [...newBlogData.comments, comment],
      user: user.id,
    };

    const blog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
      new: true,
    });

    response.status(201).json(blog);
  }
);

module.exports = blogsRouter;
