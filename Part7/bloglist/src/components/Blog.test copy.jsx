import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;

  const blog = {
    title: "Using refs in an advanced way in React components",
  };

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container;
  });

  const element = screen.getByText(
    "Using refs in an advanced way in React components"
  );
  expect(element).toBeDefined();

  test("renders its children", async () => {
    await screen.findAllByText("togglable content");
  });

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });
});
