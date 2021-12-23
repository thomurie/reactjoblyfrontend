// 3rd Pary Imports
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";

// Local Imports
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
  const INITIAL_FORM =
    type === "Login"
      ? { username: "", password: "" }
      : {
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          email: "",
        };

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [attempt, updateLoginAttempt] = LoginLocalStorage();
  const { lnEmail, lnFirstName, lnLastName, lnUsername } = attempt;
  const { login, signUp, setError } = useContext(MethodsContext);
  const action = type === "Login" ? login : signUp;

  const lnInfoObj = {
    username: lnUsername || "",
    password: "",
    firstName: lnFirstName || "",
    lastName: lnLastName || "",
    email: lnEmail || "",
  };

  Object.keys(lnInfoObj).forEach((v) =>
    !v || lnInfoObj[v] !== "undefined" ? v : (lnInfoObj[v] = "")
  );

  useEffect(() => {
    updateLoginAttempt("obtain");
    setFormData(
      type === "Login"
        ? { username: lnInfoObj.username, password: "" }
        : {
            username: lnInfoObj.username,
            password: "",
            firstName: lnInfoObj.firstName,
            lastName: lnInfoObj.lastName,
            email: lnInfoObj.email,
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
    const updatedForm = { ...formData, password: "" };
    setFormData(updatedForm);
  };

  return (
    <div className="text-white">
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((v) => {
          return (
            <MDBInput
              key={v}
              className="mt-3 text-white UserForm-Title"
              label={
                v === "firstName" || v === "lastName"
                  ? `${v.split("t")[0]}t ${v.split("t")[1]}`
                  : v
              }
              type={v !== "password" ? "text" : "password"}
              name={v}
              value={formData[v] || ""}
              onChange={handleChange}
            />
          );
        })}
        <div className="d-grid gap-2 mt-3 mb-3">
          {formData.password ? (
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          ) : (
            <MDBBtn disabled>Submit</MDBBtn>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
