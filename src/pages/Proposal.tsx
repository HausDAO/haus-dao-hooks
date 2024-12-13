import { Link } from "react-router";
import yeetLogo from "../assets/weeyeet_logo_white.png";
import { useProposal } from "../hooks/useProposal";
import { useDaoProposals } from "../hooks/useDaoProposals";

const chainid = "0x2105";
const daoid = "0xf5f0798dfdcc731a164bad743e606cf0d51fd798";
const proposalid = "2";

function Proposal() {
  const { proposal, isLoading, isFetched } = useProposal({
    chainid,
    daoid,
    proposalid,
  });

  const {
    proposals,
    isLoading: isProposalsLoading,
    isFetched: isProposalsFetched,
  } = useDaoProposals({
    chainid,
    daoid,
  });

  return (
    <>
      <div>
        <Link to="/">
          <img src={yeetLogo} className="logo" alt="Yeet logo" />
        </Link>
      </div>
      <h1>Proposal hooks</h1>

      <div>
        useProposal
        {isLoading && <p>...loading</p>}
        {isFetched && (
          <>
            <div className="json">{JSON.stringify(proposal, undefined, 2)}</div>
          </>
        )}
      </div>

      <div>
        useDaoProposal
        {isProposalsLoading && <p>...loading</p>}
        {isProposalsFetched && (
          <>
            <div className="json">
              {JSON.stringify(proposals, undefined, 2)}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Proposal;
