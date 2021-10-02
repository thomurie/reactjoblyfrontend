// 3rd party imports
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Jumbotron, Container, Button } from "reactstrap";

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

  const { username, firstName } = useContext(UserContext);

  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Jobly</h1>
          {username ? (
            <h2>Welcome {firstName}</h2>
          ) : (
            <>
              <Button
                color="primary"
                size="lg"
                onClick={() => routeToPath("login")}
              >
                Login
              </Button>{" "}
              <Button
                color="primary"
                size="lg"
                onClick={() => routeToPath("signup")}
              >
                Sign Up
              </Button>{" "}
            </>
          )}
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Home;
