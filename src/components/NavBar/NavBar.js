// 3rd party imports
import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarNav,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Style
import "./NavBar.css";

/**
 * Summary.     Defines the NavBar Component
 *
 * Description. Depending on if there is a signed in user or not the Navbar displays
 * different options. Signed users have links to protected routes and access to signOut
 * methods. All other users are provided wiht links to public routes.
 *
 *
 * @requires react
 * @requires reactstrap
 * @requires react-router-dom
 * @requires react
 * @requires UserContext
 *
 * @see      signOut
 *
 * @param {Function}   signOut  see signOut for additional information.
 *
 * @typedef {Class}    ReactComponent
 *
 * @return {ReactComponent}     Returns the NavBar Component with different data depending on value of UserContext.
 */

const NavBar = ({ firstName }) => {
  const INITAL_ROUTES = ["Companies", "Jobs"];
  const [showNavSecond, setShowNavSecond] = useState(false);
  const [routes, setRoutes] = useState(INITAL_ROUTES);

  useEffect(() => {
    const userRoutes = firstName
      ? [...INITAL_ROUTES]
      : [...INITAL_ROUTES, "Login", "Signup"];
    setRoutes(userRoutes);
  }, [firstName]);

  return (
    <header>
      <MDBNavbar bgColor="light" expand="lg" light>
        <MDBContainer fluid>
          <MDBNavbarBrand>
            <Link style={{ color: "#72B01D" }} to="/">
              Jobly
            </Link>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavSecond(!showNavSecond)}
          >
            <MDBIcon fas icon="bars" />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavSecond}>
            <MDBNavbarNav className="mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink aria-current="page">
                  <Link className="text-dark" to="/">
                    Home
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem>

              {routes.map((route) => (
                <MDBNavbarItem key={route}>
                  <MDBNavbarLink>
                    <Link
                      className=" text-dark NavBar-NavLink"
                      to={`/${route.toLowerCase()}`}
                    >
                      {route}
                    </Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              ))}

              {firstName && (
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <Link
                      style={{ color: "#72B01D" }}
                      className=" NavBar-NavLink"
                      to={`/profile`}
                    >
                      {`Hi ${firstName}`}
                    </Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
};

export default NavBar;
