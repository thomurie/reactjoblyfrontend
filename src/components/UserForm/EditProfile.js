// 3rd Pary Imports
import { MDBInput, MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
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
const EditProfile = ({ action }) => {
  let history = useHistory();

  const { username, firstName, lastName, email } = useContext(UserContext);
  if (username === undefined) {
    history.push("/");
  }

  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: "",
    });
  }, [action]);

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
          <div className="d-flex justify-content-center align-items-center h-100">
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
                    <h5 classname="mt-3">
                      Please Enter Your Password to Confirm these Changes
                    </h5>
                    <MDBInput
                      className="mt-3 text-white UserForm-Title"
                      label="Password"
                      type="password"
                      name="password"
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
                      onChange={handleChange}
                    />
                  </>
                )
              )}
              <div className="d-grid gap-2 mt-3 mb-3">
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

// 3rd Pary Imports
// import { useEffect, useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import {
//   Button,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";
// // Local Imports
// import Details from "../Details/Details";
// import UserContext from "../../Contexts/UserContext";
// // Style
// import "./UserForm.css";

// /**
//  * Summary.     UI and functionality for updating a user's profile.
//  *
//  * Description. Component that provides the UI and functionality for updating a user
//  * profile in the database.
//  *
//  * @requires          React
//  * @requires          react-router-dom
//  * @requires          reactstrap
//  *
//  * @param {Function}  action        Action to be performed on form submit.
//  *
//  * @typedef {Class}   ReactComponent
//  *
//  * @return {ReactComponent}         Returns the EditProfile Component with the data from UserContext.
//  */
// const EditProfile = ({ action }) => {
//   let history = useHistory();

//   const { username, firstName, lastName, email } = useContext(UserContext);
//   if (username === undefined) {
//     history.push("/");
//   }

//   const [formData, setFormData] = useState({});
//   useEffect(() => {
//     setFormData({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       password: "",
//     });
//   }, [action]);

//   const formLabels = {
//     firstName: "First Name",
//     lastName: "Last Name",
//     email: "Email",
//     password: "Please Enter Your Password to Save Changes",
//   };

//   const handleChange = (e) => {
//     e.preventDefault();
//     const { value, name } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     action(formData);
//     setFormData({});
//   };
//   return (
//     <Container className="themed-container" fluid="sm">
//       <Row>
//         <Col sm="12" md={{ size: 6, offset: 3 }}>
//           <Details name="Edit Profile"></Details>
//           <Form onSubmit={handleSubmit}>
//             <FormGroup>
//               <Label className={"UserForm-Title"} for="username">
//                 Username
//               </Label>
//               <Input type="text" value={username} />
//             </FormGroup>
//             {Object.keys(formData).map((v) => (
//               <FormGroup>
//                 <Label className={"UserForm-Title"} for={v}>
//                   {formLabels[v]}
//                 </Label>
//                 <Input
//                   type={v !== "password" ? "text" : "password"}
//                   name={v}
//                   id={v}
//                   value={formData[v]}
//                   onChange={handleChange}
//                 />
//               </FormGroup>
//             ))}
//             {formData.password ? (
//               <Button color="primary" className="UserFrom-Button">
//                 Save Changes
//               </Button>
//             ) : (
//               <Button color="primary" className="UserFrom-Button" disabled>
//                 Save Changes
//               </Button>
//             )}
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default EditProfile;
