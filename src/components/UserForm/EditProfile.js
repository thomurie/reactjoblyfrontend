// 3rd Pary Imports
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// Local Imports
import Details from "../Details/Details";
import Image from "../Images/annie-spratt-wgivdx9dBdQ-unsplash.jpg";
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
const EditProfile = ({ action, username, firstName, lastName, email }) => {
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    action(formData);
    setFormData({});
  };
  return (
    <>
      <div
        id="UserForm-Login"
        className="p-5 text-center bg-image"
        style={{ backgroundImage: `url(${Image})` }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
          <div className="d-flex justify-content-center align-items-center h-200">
            <div className="text-white">
              <Details name="Edit Profile"></Details>
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
                  <>
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
                  </>
                )
              )}
              <div className="d-grid gap-2 mt-3 mb-4">
                {formData.password ? (
                  <MDBBtn onClick={handleSubmit}>Save Changes</MDBBtn>
                ) : (
                  <MDBBtn disabled>Save Changes</MDBBtn>
                )}
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
    </>
  );
};

export default EditProfile;
