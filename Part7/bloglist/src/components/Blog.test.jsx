import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

describe.only("<Blog />", () => {
  let container;

  const blog = {
    title: "Using refs in an advanced way in React components",
    author: "Kunle Ade",
    likes: 0,
    url: "http://localhost:5173/using-refs",
  };

  const mockHandler = vi.fn();

  beforeEach(() => {
    container = render(<Blog blog={blog} onLike={mockHandler} />).container;
  });

  test("renders content", () => {
    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent(
      "Using refs in an advanced way in React components"
    );
  });

  test("at start the likes and url are not displayed", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, the blog likes and url are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test("clicking the button twice calls event handler twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByTestId("likes-count");
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test("<BlogForm /> updates parent state and calls onSubmit", async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm onCreate={createBlog} />);

    const title = container.querySelector("#title");
    const author = container.querySelector("#author");
    const url = container.querySelector("#url");
    const sendButton = screen.getByText("create");

    await user.type(title, "testing title input field...");
    await user.type(author, "testing author input field...");
    await user.type(url, "testing url input field...");
    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe(
      "testing title input field..."
    );

    expect(createBlog.mock.calls[0][0].author).toBe(
      "testing author input field..."
    );
    expect(createBlog.mock.calls[0][0].url).toBe("testing url input field...");
  });
});
