import { Link } from "react-router";
import yeetLogo from "../assets/weeyeet_logo_white.png";
import { useYeeter } from "../hooks/useYeeter";
import { useYeeters } from "../hooks/useYeeters";
import { useYeets } from "../hooks/useYeets";
import { useYeetersForAddress } from "../hooks/useYeetersForAddress";

const chainid = "0x2105";
const yeeterid = "0xc313665721f79979b2884989308b52aa25744a99";
const address = "0x83aB8e31df35AA3281d630529C6F4bf5AC7f7aBF";

function Yeeter() {
  const { yeeter, metadata, isLoading, isFetched } = useYeeter({
    chainid,
    yeeterid,
  });

  const {
    yeets,
    isLoading: yeetsIsLoading,
    isFetched: yeetsIsFetched,
  } = useYeets({
    chainid,
    yeeterid,
  });

  const {
    yeeters,
    isLoading: yeetersIsLoading,
    isFetched: yeetersIsFetched,
  } = useYeeters({
    chainid,
    filter: "open",
  });

  const {
    yeeters: addressYeeters,
    allYeets,
    isLoading: addressYeetersIsLoading,
    isFetched: addressYeetersIsFetched,
  } = useYeetersForAddress({
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
      <h1>yeeter hooks</h1>

      <div>
        useYeeter
        {isLoading && <p>...loading</p>}
        {isFetched && (
          <>
            <div className="json">{JSON.stringify(yeeter, undefined, 2)}</div>
            <div className="json">{JSON.stringify(metadata, undefined, 2)}</div>
          </>
        )}
      </div>

      <div>
        useYeets
        {yeetsIsLoading && <p>...loading</p>}
        {yeetsIsFetched && (
          <>
            <div className="json">{JSON.stringify(yeets, undefined, 2)}</div>
          </>
        )}
      </div>

      <div>
        useYeeters
        {yeetersIsLoading && <p>...loading</p>}
        {yeetersIsFetched && (
          <>
            <div className="json">{JSON.stringify(yeeters, undefined, 2)}</div>
          </>
        )}
      </div>

      <div>
        useYeetersForAddress
        {addressYeetersIsLoading && <p>...loading</p>}
        {addressYeetersIsFetched && (
          <>
            <div className="json">
              {JSON.stringify(addressYeeters, undefined, 2)}
            </div>
            <div className="json">{JSON.stringify(allYeets, undefined, 2)}</div>
          </>
        )}
      </div>
    </>
  );
}

export default Yeeter;
