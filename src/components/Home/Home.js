// 3rd party imports
import { useHistory } from "react-router-dom";

// Local imports
import "./Home.css";

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

  return (
    <header>
      <div className="p-5 text-center bg-image" id="intro-example">
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">Jobly</h1>
              <h5 className="mb-4">
                Find Your Next Great Opporutnity With Jobly
              </h5>
              <div className="mb-4">
                <button
                  className="me-4 btn btn-primary"
                  onClick={() => routeToPath("jobs")}
                >
                  Jobs
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => routeToPath("companies")}
                >
                  Companies
                </button>
              </div>
              <h6 className="mt-3">
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
