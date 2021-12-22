// 3rd party imports
import { MDBCol, MDBContainer, MDBFooter, MDBRow } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Local imports
import UserContext from "../../Contexts/UserContext";

// Style
import "./Footer.css";

const Footer = () => {
  const INITAL_ROUTES = ["Companies", "Jobs"];
  const [routes, setRoutes] = useState(INITAL_ROUTES);
  const { firstName } = useContext(UserContext);

  useEffect(() => {
    const userRoutes = firstName
      ? [...INITAL_ROUTES, "Profile"]
      : [...INITAL_ROUTES, "Login", "Signup"];
    setRoutes(userRoutes);
  }, [firstName]);

  return (
    <MDBFooter
      className="text-center text-lg-left text-white"
      style={{ backgroundColor: "#3F7D20" }}
    >
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol className="mb-4 mb-md-0" lg="6" md="12">
            <h5 className="text-uppercase">Welcome To Jobly</h5>

            <p>
              Your next opportunity is waiting for you. Finding it starts with
              Jobly. Search by role or company. Find new and exciting companies
              on our Companies page. Find and apply to your next job using our
              Jobs page.
            </p>
          </MDBCol>

          <MDBCol className="mb-4 mb-md-0" lg="6" md="12">
            <h6 style={{ textDecoration: "underline" }}>Site Map</h6>
            {routes.map((route) => (
              <Link
                className="NavBar-NavLink text-light"
                to={`/${route.toLowerCase()}`}
              >
                {route}
                <br />
              </Link>
            ))}
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()}{" "}
        <Link className="text-white" to="/">
          Jobly
        </Link>
      </div>
    </MDBFooter>
  );
};

export default Footer;
