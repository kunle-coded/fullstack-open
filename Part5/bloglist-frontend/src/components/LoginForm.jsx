function LoginForm({
  username,
  password,
  onAddUsername,
  onAddPassword,
  notification,
  nameClass,
  handleLogin,
}) {
  return (
    <div>
      <h2>Log in to application</h2>

      {notification !== null ? (
        <div className={nameClass}>{notification}</div>
      ) : null}

      <form data-testid="loginform" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input
            data-testid="username"
            type="text"
            value={username}
            onChange={({ target }) => onAddUsername(target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={({ target }) => onAddPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginForm;
