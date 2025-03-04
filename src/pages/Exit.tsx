import { Link } from "react-router";
import yeetLogo from "../assets/weeyeet_logo_white.png";
import { useDaoExitsForAddress } from "../hooks/useDaoExitsForAddress";

const chainid = "0x1";
// const chainid = "0xaa36a7";
// const chainid = "0x64";
// const chainid = "0xa";
// const chainid = "0xa4b1";
// const chainid = "0x2105";

// const address = "0xf5d6b637a9185707f52d40d452956ca49018247A";
// const address = "0xf100041473280B594D78AB5Fa4C44Ba81edd367B";
const address = "0x83aB8e31df35AA3281d630529C6F4bf5AC7f7aBF";

function Exit() {
  const { exits, isLoading, isFetched } = useDaoExitsForAddress({
    chainid,
    address,
  });

  console.log("exits", exits);

  return (
    <>
      <div>
        <Link to="/">
          <img src={yeetLogo} className="logo" alt="Yeet logo" />
        </Link>
      </div>
      <h1>exit hooks</h1>

      <div>
        useDaoExitsForAddress
        {isLoading && <p>...loading</p>}
        {isFetched && (
          <>
            <div className="json">{JSON.stringify(exits, undefined, 2)}</div>
          </>
        )}
      </div>
    </>
  );
}

export default Exit;
