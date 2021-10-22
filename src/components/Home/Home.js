// 3rd party imports
import { MDBBtn } from "mdb-react-ui-kit";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
// import { Jumbotron, Container, Button } from "reactstrap";

// Local imports
import "./Home.css";
import UserContext from "../../Contexts/UserContext";

/**
 * Summary.     Creates the Home Component based on UserContext
 *
 * Description. Determines if there is a user currently logged in based
 * on the value of UserContext. If there is a logged in user, the user
 * is greated and welcomed to the site. Unknown users or missing data
 * in the UserContext will render a Hope component with with the option
 * to Login In.
 *
 * @requires react
 * @requires react-router-dom
 * @requires reactstrap
 * @requires UserContext
 *
 * @typedef {Class}   ReactComponent
 *
 * @return {ReactComponent}   Returns the Home Component with different data depending on value of UserContext
 */

const Home = () => {
  const history = useHistory();

  const routeToPath = (path) => {
    history.push(`/${path}`);
  };

  const INTIALSTATE = [
    <>
      <h1 className="display-4">Loading...</h1>
    </>,
  ];

  const { username, firstName } = useContext(UserContext);
  const [data, setData] = useState(INTIALSTATE);
  const [loaded, setLoaded] = useState(false);

  const userIsTrue = [
    <>
      <h2>Welcome {firstName}</h2>
    </>,
  ];

  const userIsFalse = [
    <>
      <Button color="primary" size="lg" onClick={() => routeToPath("login")}>
        Login
      </Button>{" "}
      <Button color="primary" size="lg" onClick={() => routeToPath("signup")}>
        Sign Up
      </Button>
    </>,
  ];

  setTimeout(() => {
    setLoaded(true);
  }, 500);

  useEffect(async () => {
    if (!loaded) {
      return;
    }
    if (username) {
      setData(userIsTrue);
    } else {
      setData(userIsFalse);
    }
  }, [loaded]);

  return (
    <header>
      <div id="intro-example" className="p-5 text-center bg-image">
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">Jobly</h1>
              <h5 className="mb-4">
                Find Your Next Great Opporutnity With Jobly
              </h5>
              {username ? (
                <h4 className="mb-4">Welcome {firstName}</h4>
              ) : (
                <>
                  <MDBBtn
                    rounded
                    className="mb-4"
                    onClick={() => routeToPath("login")}
                  >
                    Login
                  </MDBBtn>{" "}
                  <MDBBtn
                    rounded
                    className="mb-4"
                    onClick={() => routeToPath("signup")}
                  >
                    Sign Up
                  </MDBBtn>
                </>
              )}
              <h6 classname="mt-3">
                Photo by{" "}
                <a href="https://unsplash.com/@christinhumephoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  Christin Hume
                </a>{" "}
                on{" "}
                <a href="https://unsplash.com/s/photos/office?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  Unsplash
                </a>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;
