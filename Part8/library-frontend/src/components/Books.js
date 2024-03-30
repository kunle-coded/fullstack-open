import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";
import { useEffect } from "react";

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const result = useQuery(ALL_BOOKS, {
    variables: genre ? { genre } : undefined,
  });

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }

    const genreArr = ["All genres"];

    result.data?.allBooks.forEach((book) => {
      book.genres.forEach((genre) => {
        if (!genreArr.includes(genre)) {
          genreArr.push(genre);
        }
      });
    });

    if (genreArr.length >= 1) {
      setGenres(genreArr);
    }
  }, [result.data]);

  if (result.loading) {
    return <div>loading...</div>;
  }

  function filterBooks(gnre, index) {
    setCurrentIndex((currInd) => (currInd === index ? 0 : index));

    if (gnre === "All genres") {
      setGenre(null);
    } else {
      setGenre(gnre);
    }
  }

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Books</h2>
        </div>
        <div className="flex  ">
          <p className="mr-1 bg-sky-700 px-2 py-1 text-slate-50">Filter</p>
          <ul className="ml-0 flex capitalize">
            {genres.map((gnr, ind) => (
              <li
                key={gnr}
                onClick={(e) => filterBooks(gnr, ind)}
                className={`${currentIndex === ind ? "bg-amber-100" : "bg-amber-200"} cursor-pointer px-2 py-1`}
              >
                {gnr}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <table className="mt-5 w-full table-auto text-left">
        <thead className="bg-slate-200">
          <tr>
            <th className="p-3">Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((a) => (
            <tr key={a.title} className="border-b-2">
              <td className="pb-2 pl-3 pt-2">{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
