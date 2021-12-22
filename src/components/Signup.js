// 3rd Pary Imports
import { MDBInput, MDBBtn, MDBTypography } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
// Local Imports
import Details from "../Details/Details";
import Image from "../Images/sean-pollock-PhYq704ffdA-unsplash.jpg";
import MethodsContext from "../../Contexts/MethodsContext";
import LoginLocalStorage from "../../Hooks/loginLocalStorage";
// Style
import "./UserForm.css";

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
const UserForm = ({ type }) => {
  const [attempt, updateLoginAttempt] = LoginLocalStorage();
  const { lnEmail, lnFirstName, lnLastName, lnUsername } = attempt;
  const { login, signUp, error } = useContext(MethodsContext);

  const action = type === "Login" ? login : signUp;

  const [formData, setFormData] = useState({});
  useEffect(() => {
    updateLoginAttempt("obtain");
    setFormData(
      type === "Login"
        ? { username: "", password: "" }
        : {
            username: lnUsername,
            password: "",
            firstName: lnFirstName,
            lastName: lnLastName,
            email: lnEmail,
          }
    );
  }, [type, action]);

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateLoginAttempt("add", formData);
    action(formData);
    setFormData({});
  };

  console.log(error);
  return (
    <div
      id="UserForm-Login"
      className="p-5 text-center bg-image"
      style={{ backgroundImage: `url(${Image})` }}
    >
      <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-white">
            <Details name={type}></Details>
            {error && (
              <MDBTypography
                note
                style={{ backgroundColor: "red" }}
                Color="danger"
              >
                {error}
              </MDBTypography>
            )}
            {Object.keys(formData).map((v) => (
              <MDBInput
                className="mt-3 text-white UserForm-Title"
                label={
                  v === "firstName" || v === "lastName"
                    ? `${v.split("t")[0]}t ${v.split("t")[1]}`
                    : v
                }
                type={v !== "password" ? "text" : "password"}
                name={v}
                value={formData[v]}
                onChange={handleChange}
              />
            ))}
            <div className="d-grid gap-2 mt-3 mb-3">
              {formData.password ? (
                <MDBBtn onClick={handleSubmit}>Submit</MDBBtn>
              ) : (
                <MDBBtn disabled>Submit</MDBBtn>
              )}
            </div>
            <h6 classname="mt-3">
              Photo by{" "}
              <a href="https://unsplash.com/@seanpollock?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Sean Pollock
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

export default UserForm;