// 3rd Pary Imports
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState, useContext } from "react";

// Local Imports
import MethodsContext from "../../Contexts/MethodsContext";
import UserContext from "../../Contexts/UserContext";

// Style
import "./UserForm.css";

/**
 * Summary.     UI and functionality for updating a user's profile.
 *
 * Description. Component that provides the UI and functionality for updating a user
 * profile in the database.
 *
 * @requires          React
 * @requires          react-router-dom
 * @requires          reactstrap
 *
 * @param {Function}  action        Action to be performed on form submit.
 *
 * @typedef {Class}   ReactComponent
 *
 * @return {ReactComponent}         Returns the EditProfile Component with the data from UserContext.
 */
const EditProfile = () => {
  const { email, firstName, lastName, username } = useContext(UserContext);

  const INITIAL_STATE = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: "",
  };

  const { updateUser, setError } = useContext(MethodsContext);

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ msg: "", color: "green" });
    updateUser(formData);
    setFormData(INITIAL_STATE);
  };
  return (
    <div className="text-white">
      <MDBInput
        className="mb-3 text-white UserForm-Title"
        label="username (Cannot be updated)"
        type="text"
        name="username"
        value={username}
        readonly
      />
      {Object.keys(formData).map((v) =>
        v === "password" ? (
          <>
            <h6 classname="mt-3">
              Please Enter Your Password to Confirm these Changes
            </h6>
            <MDBInput
              className="mt-3 text-white UserForm-Title"
              label="Password"
              type="password"
              name="password"
              value={formData[v]}
              onChange={handleChange}
            />
          </>
        ) : (
          <MDBInput
            className="mb-3 text-white UserForm-Title"
            label={
              v === "firstName" || v === "lastName"
                ? `${v.split("t")[0]}t ${v.split("t")[1]}`
                : v
            }
            type="text"
            name={v}
            value={formData[v]}
            onChange={handleChange}
          />
        )
      )}
      <div className="d-grid gap-2 mt-3 mb-4">
        {formData.password ? (
          <MDBBtn onClick={handleSubmit}>Save Changes</MDBBtn>
        ) : (
          <MDBBtn disabled>Save Changes</MDBBtn>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
