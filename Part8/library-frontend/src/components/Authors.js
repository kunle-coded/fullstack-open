import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";
import { useState } from "react";
import { useEffect } from "react";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const result = useQuery(ALL_AUTHORS);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  useEffect(() => {
    if (name === "") {
      const noBornDate = result.data?.allAuthors.find(
        (author) => author.born === null,
      );

      if (noBornDate) {
        setName(noBornDate.name);
      }
    }
  }, [name, result.data]);

  if (result.loading) {
    return <div>loading...</div>;
  }

  function submit(e) {
    e.preventDefault();
    updateAuthor({ variables: { name, setBornTo: born } });
    setName("");
    setBorn("");
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Authors</h2>
      <table className="mt-5 w-6/12 table-auto text-left">
        <thead className="bg-slate-200">
          <tr>
            <th className="p-3">Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {result.data?.allAuthors.map((a) => (
            <tr key={a.name} className="border-b-2">
              <td className="pb-2 pl-3 pt-2">{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-16">
        <div className="mb-5">
          <h2 className="text-xl font-semibold">Set birthyear</h2>
        </div>
        <form onSubmit={submit}>
          <div>
            <label
              htmlFor="Name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>

            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <select
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                onChange={({ target }) => setName(target.value)}
              >
                {result.data?.allAuthors.map((author) =>
                  author.born === null ? (
                    <option key={author.name}>{author.name}</option>
                  ) : null,
                )}
              </select>
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="Born"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Born
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="number"
                value={born}
                onChange={({ target }) => setBorn(Number(target.value))}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="rounded-md bg-sky-700 p-2 pl-3 pr-3 text-slate-50"
            >
              Update author
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authors;
