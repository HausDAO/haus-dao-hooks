import { Link } from "react-router";
import yeetLogo from "../assets/weeyeet_logo_white.png";

function Home() {
  console.log("yolo");
  return (
    <>
      <div>
        <img src={yeetLogo} className="logo" alt="Yeet logo" />
      </div>
      <h1>DAOhaus DAO Hooks</h1>
      <div className="instructions">
        <a href="https://github.com/HausDAO/haus-dao-hooks" target="_blank">
          github repo
        </a>
        <Link to="/yeeter">yeeter hooks</Link>
        <Link to="/dao">dao hooks</Link>
        <Link to="/proposal">proposal hooks</Link>
        <Link to="/member">member hooks</Link>
      </div>
    </>
  );
}

export default Home;
