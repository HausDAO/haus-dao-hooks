import { Link } from "react-router";
import yeetLogo from "../assets/weeyeet_logo_white.png";
import { useSearchDaos } from "../hooks/useSearchDaos";
import { useState } from "react";

const chainid = "0x2105";

function SearchDaos() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

  const { daos, isLoading, isFetched } = useSearchDaos({
    chainid,
    name,
  });

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e);
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    console.log("searchTerm", searchTerm);
    setName(searchTerm?.toLowerCase());
  };

  return (
    <>
      <div>
        <Link to="/">
          <img src={yeetLogo} className="logo" alt="Yeet logo" />
        </Link>
      </div>
      <h1>Search Daos hook</h1>

      <div className="search">
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearchInput(e)
          }
        />
      </div>

      <div className="search">
        <button disabled={!searchTerm} onClick={handleSearch}>
          Search
        </button>
      </div>

      <div>
        useSearchDao
        {isLoading && <p>...loading</p>}
        {isFetched &&
          daos?.map((dao) => {
            return <p className="daoName">{dao.name}</p>;
          })}
      </div>
    </>
  );
}

export default SearchDaos;
