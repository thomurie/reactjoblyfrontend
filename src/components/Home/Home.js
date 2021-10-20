// 3rd party imports
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Jumbotron, Button } from "reactstrap";

// Local imports
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
    <div>
      <Jumbotron>
        <h1 className="display-3">Jobly</h1>
        {data}
      </Jumbotron>
    </div>
  );
};

export default Home;
