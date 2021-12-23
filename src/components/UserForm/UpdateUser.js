// 3rd Party Imports
import { MDBBtn } from "mdb-react-ui-kit";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Local Imports
import Details from "../Details/Details";
import Image from "../Images/annie-spratt-wgivdx9dBdQ-unsplash.jpg";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import UpdateUserForm from "./UpdateUserForm";
import MethodsContext from "../../Contexts/MethodsContext";

/**
 * Summary.     Defines the UserForm Component with different data depending on value of type.
 *
 * Description. Creates a UI used for login / signup depending on the type requested by the parent.
 * Based on the type and action passed to the component the UI is rendered to reflect the request.
 *
 * @requires React
 * @requires reactstrap
 *
 * @param {Function}   action           Action to be performed on form submit.
 * @param {string}     type          Description of a key in the objectVar parameter.
 *
 * @typedef {Class}    ReactComponent
 *
 * @return {ReactComponent}             Returns the UserForm Component with different data depending on value of type.
 */
const UpdateUser = () => {
  const history = useHistory();
  const { signOut, setError } = useContext(MethodsContext);

  useEffect(() => {
    setError({ msg: "", color: "green" });
  }, []);

  const handleSignOut = () => {
    signOut();
    history.push("/");
  };
  return (
    <div
      id="UserForm-Login"
      className="p-5 text-center bg-image"
      style={{ backgroundImage: `url(${Image})` }}
    >
      <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-white">
            <Details name="Edit Profile"></Details>
            <ErrorMsg />
            <UpdateUserForm />
            <div className="d-grid gap-2 mt-3 mb-4">
              <MDBBtn onClick={handleSignOut}>Sign Out</MDBBtn>
            </div>
            <h6 classname="mt-3">
              Photo by{" "}
              <a href="https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Annie Spratt
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
  );
};

export default UpdateUser;
