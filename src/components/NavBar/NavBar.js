// 3rd party imports
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Local imports
import UserContext from "../../Contexts/UserContext";
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

const NavBar = ({ signOut }) => {
  const [showNavSecond, setShowNavSecond] = useState(false);
  const [routes, setRoutes] = useState(["Login", "Signup"]);
  const { firstName } = useContext(UserContext);

  useEffect(() => {
    setRoutes(
      firstName ? ["Companies", "Jobs", "Profile"] : ["Login", "Signup"]
    );
  }, [firstName]);

  return (
    <header>
      <MDBNavbar expand="lg" light bgColor="light">
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
            <MDBIcon icon="bars" fas />
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
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <Link
                      to={`/${route.toLowerCase()}`}
                      className=" text-dark NavBar-NavLink"
                    >
                      {route}
                    </Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              ))}

              {firstName ? (
                <MDBNavbarItem>
                  <MDBBtn
                    color="dark"
                    onClick={signOut}
                  >{`Log Out ${firstName}`}</MDBBtn>
                </MDBNavbarItem>
              ) : (
                <></>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
};

export default NavBar;
