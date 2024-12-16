import { Link } from "react-router";
import yeetLogo from "../assets/weeyeet_logo_white.png";
import { useDao } from "../hooks/useDao";
import { useDaos } from "../hooks/useDaos";
import { useDaosForAddress } from "../hooks/useDaosForAddress";

const chainid = "0x2105";
const daoid = "0xf5f0798dfdcc731a164bad743e606cf0d51fd798";
const address = "0x83aB8e31df35AA3281d630529C6F4bf5AC7f7aBF";

function Dao() {
  const { dao, isLoading, isFetched } = useDao({
    chainid,
    daoid,
  });

  const {
    daos,
    isLoading: isDaosLoading,
    isFetched: isDaosFetched,
  } = useDaos({
    chainid,
  });

  const {
    daos: addressDaos,
    isLoading: addressDaosIsLoading,
    isFetched: addressDaosIsFetched,
  } = useDaosForAddress({
    chainid,
    address,
  });

  return (
    <>
      <div>
        <Link to="/">
          <img src={yeetLogo} className="logo" alt="Yeet logo" />
        </Link>
      </div>
      <h1>Dao hooks</h1>

      <div>
        useDao
        {isLoading && <p>...loading</p>}
        {isFetched && (
          <>
            <div className="json">{JSON.stringify(dao, undefined, 2)}</div>
          </>
        )}
      </div>

      <div>
        useDaos
        {isDaosLoading && <p>...loading</p>}
        {isDaosFetched && (
          <>
            <div className="json">{JSON.stringify(daos, undefined, 2)}</div>
          </>
        )}
      </div>

      <div>
        useDaosForAddress
        {addressDaosIsLoading && <p>...loading</p>}
        {addressDaosIsFetched && (
          <>
            <div className="json">
              {JSON.stringify(addressDaos, undefined, 2)}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Dao;
