import { NavLink, useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

function Navigation({ token, setToken, user }) {
  const client = useApolloClient();

  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate("/");
  };

  return (
    <div className="flex justify-between bg-sky-700 p-16 pb-4 pt-4 text-slate-50">
      <div className="text-xl font-semibold">LibraryGQL</div>
      <div className="flex gap-6 font-medium">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/authors">Authors</NavLink>
        <NavLink to="/books">Books</NavLink>
        {token && <NavLink to="/add">Add Book</NavLink>}
        {token && <NavLink to="/favorite-genre/refactoring">Recommend</NavLink>}
      </div>
      <div>
        {token ? (
          <div className="flex gap-1">
            Welcome,
            <p>{user?.username}</p>
            <button className="ml-3" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </div>
  );
}

export default Navigation;
