// 3rd party imports
import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";

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
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [routes, setRoutes] = useState(["Login", "Signup"]);
  const { firstName } = useContext(UserContext);

  useEffect(() => {
    setRoutes(
      firstName ? ["Companies", "Jobs", "Profile"] : ["Login", "Signup"]
    );
  }, [firstName]);

  const toggle = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    signOut();
    history.push(`/login`);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Jobly</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {routes.map((route) => (
              <NavItem>
                <NavLink>
                  <Link
                    to={`/${route.toLowerCase()}`}
                    className="NavBar-NavLink"
                  >
                    {route}
                  </Link>
                </NavLink>
              </NavItem>
            ))}
            {firstName ? (
              <Button color="primary" size="sm" onClick={handleSignOut}>
                {`Log Out ${firstName}`}
              </Button>
            ) : (
              <></>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
