import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN, USER } from "../queries";
import { useEffect } from "react";

function LoginForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN);

  const user = useQuery(USER);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }

    if (user.data) {
      const me = user.data.me;
      localStorage.setItem("user-data", JSON.stringify(me));
    }
  }, [result.data, setToken, user.data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    login({ variables: { username, password } });

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="Username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>

          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="Password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="rounded-md bg-sky-700 p-2 pl-3 pr-3 text-slate-50"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
