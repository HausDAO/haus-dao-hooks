import yeetLogo from "../assets/weeyeet_logo_white.png";
import { useYeeter } from "../hooks/useYeeter";
import { useYeeters } from "../hooks/useYeeters";
import { useYeets } from "../hooks/useYeets";

const chainid = "0x2105";
const yeeterid = "0xc313665721f79979b2884989308b52aa25744a99";

// use yeets
// use yeeters
// use dao
// use proposals
// use members

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

  return (
    <>
      <div>
        <img src={yeetLogo} className="logo" alt="Yeet logo" />
      </div>
      <h1>yeeter hooks</h1>

      <div>
        useYeeter
        {isLoading && <p>...loading</p>}
        {isFetched && (
          <>
            <div className="json">{JSON.stringify(yeeter, undefined, 2)}</div>
            <hr />
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
    </>
  );
}

export default Yeeter;
