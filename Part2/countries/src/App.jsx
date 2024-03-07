import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Country from "./components/Country";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    countryService.getCountry().then((res) => setCountries(res));
  }, []);

  function handleCountry(input) {
    const matched = countries.filter((country) =>
      country.name.common.toLowerCase().startsWith(input.toLowerCase())
    );

    console.log(matched);

    if (matched.length < 1 && searchInput.length >= 1) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    setShowCountry(matched);
  }

  function handleSearch(input) {
    setSearchInput(input);
    handleCountry(input);
  }

  return (
    <div>
      <div>
        <label htmlFor="search">find countries</label>
        <input
          type="text"
          id="search"
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {searchInput === "" ? null : isError ? (
        <p>No country matches your input</p>
      ) : (
        <div style={{ marginTop: "10px" }}>
          {showCountry.length >= 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : (
            showCountry.map((country) => (
              <Country
                key={country.name.common}
                country={country}
                isDetails={showCountry.length === 1}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
