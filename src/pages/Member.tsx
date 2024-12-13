import { Link } from "react-router";
import yeetLogo from "../assets/weeyeet_logo_white.png";
import { useMember } from "../hooks/useMember";
import { useDaoMembers } from "../hooks/useDaoMembers";

const chainid = "0x2105";
const daoid = "0xf5f0798dfdcc731a164bad743e606cf0d51fd798";
const memberaddress = "0x83aB8e31df35AA3281d630529C6F4bf5AC7f7aBF";

function Member() {
  const { member, isLoading, isFetched } = useMember({
    chainid,
    daoid,
    memberaddress,
  });

  const {
    members,
    isLoading: isMembersLoading,
    isFetched: isMembersFetched,
  } = useDaoMembers({
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
      <h1>member hooks</h1>

      <div>
        useMember
        {isLoading && <p>...loading</p>}
        {isFetched && (
          <>
            <div className="json">{JSON.stringify(member, undefined, 2)}</div>
          </>
        )}
      </div>

      <div>
        useDaoMembers
        {isMembersLoading && <p>...loading</p>}
        {isMembersFetched && (
          <>
            <div className="json">{JSON.stringify(members, undefined, 2)}</div>
          </>
        )}
      </div>
    </>
  );
}

export default Member;
