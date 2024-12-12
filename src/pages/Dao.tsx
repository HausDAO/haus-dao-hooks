import yeetLogo from "../assets/weeyeet_logo_white.png";
import { useDao } from "../hooks/useDao";

const chainid = "0x2105";
const daoid = "0xf5f0798dfdcc731a164bad743e606cf0d51fd798";

function Dao() {
  const { dao, isLoading, isFetched } = useDao({
    chainid,
    daoid,
  });

  return (
    <>
      <div>
        <img src={yeetLogo} className="logo" alt="Yeet logo" />
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
    </>
  );
}

export default Dao;
