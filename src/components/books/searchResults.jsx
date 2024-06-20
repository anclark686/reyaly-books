import { SearchBar } from "./search";
import { Card } from "react-bootstrap";
import Navbar from "../Navbar";
import { useLocation, Link } from "react-router-dom";

export const SearchResults = () => {
  let data = useLocation();
  const results = data.state.results;
  return (
    <div className="search-results">
      <Navbar />
      <div className="header-container">
        <h1 className="header">Search Results</h1>
      </div>

      <SearchBar />

      <Card>
        {results.length > 0 ? (
          <table className="is-striped is-fullwidth">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Genre</th>
                <th scope="col">Read</th>
              </tr>
            </thead>
            <tbody>
              {results.map((book, index) => (
                <tr key={book.id}>
                  <td>
                    <Link to="/details" state={{ book: book }}>
                      {book.title}
                    </Link>
                  </td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>
                    {book.read ? (
                      <span aria-label="check" role="img">
                        ✅
                      </span>
                    ) : (
                      <span aria-label="x" role="img">
                        ❌
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="null-message">
            <h1>No Results, try searching something else.</h1>
          </div>
        )}
      </Card>
    </div>
  );
};
