import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import Favourite from "./components/Favourite";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);

  const result = useQuery(ALL_BOOKS);

  const storedUser = localStorage.getItem("user-data");
  const userObject = JSON.parse(storedUser);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  useEffect(() => {
    if (userObject !== null) {
      const tok = localStorage.getItem("library-user-token");
      setToken(tok);
    }
  }, [userObject]);

  return (
    <div className="min-h-screen bg-slate-100 pb-8">
      <Navigation token={token} setToken={setToken} user={userObject} />

      <div className="m-16 mt-14">
        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route
            path="/add"
            element={token ? <NewBook /> : <Navigate replace to="/" />}
          />
          <Route
            path="/favorite-genre/:genre"
            element={
              token ? (
                <Favourite results={result} me={userObject} />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !token ? (
                <LoginForm setToken={setToken} />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
