// 3rd party imports
import {
  MDBBtn,
  MDBBtnGroup,
  MDBCol,
  MDBContainer,
  MDBFooter,
  MDBRow,
} from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
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
      className="text-center text-lg-left text-white"
      style={{ backgroundColor: "#3F7D20" }}
    >
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol className="mb-4 mb-md-0" lg="6" md="12">
            <h5 className="text-uppercase">Welcome To Jobly</h5>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              atque ea quis molestias. Fugiat pariatur maxime quis culpa
              corporis vitae repudiandae aliquam voluptatem veniam, est atque
              cumque eum delectus sint!
            </p>
          </MDBCol>

          <MDBCol className="mb-4 mb-md-0" lg="6" md="12">
            <MDBBtnGroup aria-label="Basic example">
              {routes.map((route) => (
                <MDBBtn color="light" outline>
                  <Link
                    className="NavBar-NavLink text-light"
                    to={`/${route.toLowerCase()}`}
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
