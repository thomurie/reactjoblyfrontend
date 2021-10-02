// 3rd Pary Imports
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

  const formLabels = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    password: "Please Enter Your Password to Save Changes",
  };

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
    <Container className="themed-container" fluid="sm">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Details name="Edit Profile"></Details>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label className={"UserForm-Title"} for="username">
                Username
              </Label>
              <Input type="text" value={username} />
            </FormGroup>
            {Object.keys(formData).map((v) => (
              <FormGroup>
                <Label className={"UserForm-Title"} for={v}>
                  {formLabels[v]}
                </Label>
                <Input
                  type={v !== "password" ? "text" : "password"}
                  name={v}
                  id={v}
                  value={formData[v]}
                  onChange={handleChange}
                />
              </FormGroup>
            ))}
            {formData.password ? (
              <Button color="primary" className="UserFrom-Button">
                Save Changes
              </Button>
            ) : (
              <Button color="primary" className="UserFrom-Button" disabled>
                Save Changes
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
