function Favourite({ results, me }) {
  if (results.loading) {
    return <div>Loading...</div>;
  }

  const books = results.data.allBooks;

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold">Recommendations</h2>
      </div>

      <div className="my-4">
        <p>
          Books in your favorite genre{" "}
          <span className="font-semibold">{me.favoriteGenre}</span>
        </p>
      </div>

      <div>
        <table className="mt-8 w-full table-auto text-left">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-3">Title</th>
              <th>Author</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {books.map((a) =>
              a.genres.includes(me?.favoriteGenre) ? (
                <tr key={a.title} className="border-b-2">
                  <td className="pb-2 pl-3 pt-2">{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ) : null,
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Favourite;
