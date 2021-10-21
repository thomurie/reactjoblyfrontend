// 3rd party imports
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// Local imports
import UserContext from "../../Contexts/UserContext";

const Footer = () => {
  const [routes, setRoutes] = useState(["Login", "Signup"]);
  const { firstName } = useContext(UserContext);

  useEffect(() => {
    setRoutes(
      firstName ? ["Companies", "Jobs", "Profile"] : ["Login", "Signup"]
    );
  }, [firstName]);
  return (
    <MDBFooter
      style={{ backgroundColor: "#3F7D20" }}
      className="text-center text-lg-left text-white"
    >
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Welcome To Jobly</h5>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              atque ea quis molestias. Fugiat pariatur maxime quis culpa
              corporis vitae repudiandae aliquam voluptatem veniam, est atque
              cumque eum delectus sint!
            </p>
          </MDBCol>

          <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
            <MDBBtnGroup aria-label="Basic example">
              {routes.map((route) => (
                <MDBBtn color="light" outline>
                  <Link
                    to={`/${route.toLowerCase()}`}
                    className="NavBar-NavLink text-light"
                  >
                    {route}
                  </Link>
                </MDBBtn>
              ))}
            </MDBBtnGroup>
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
