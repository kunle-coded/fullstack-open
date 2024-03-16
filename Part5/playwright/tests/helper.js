const loginWith = async (page, username, password) => {
  //   await page.getByRole("button", { name: "log in" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};
const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "new blog" }).click();
  await page.getByTestId("title").fill(title);
  await page.getByTestId("author").fill(author);
  await page.getByTestId("url").fill(url);
  await page.getByRole("button", { name: "create" }).click();
};

const editBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "view" }).click();
  await page.getByRole("button", { name: "edit" }).click();
  await page.getByTestId("editTitle").fill(title);
  await page.getByTestId("editAuthor").fill(author);
  await page.getByTestId("editUrl").fill(url);
  await page.getByRole("button", { name: "save" }).click();
};

export { loginWith, createBlog, editBlog };
