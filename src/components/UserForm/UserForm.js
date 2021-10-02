// 3rd Pary Imports
import { useEffect, useState } from "react";
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
const UserForm = ({ action, type }) => {
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData(
      type === "Login"
        ? { username: "", password: "" }
        : {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
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
    action(formData);
    setFormData({});
  };
  return (
    <Container className="themed-container" fluid="sm">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Details name={type}></Details>
          <Form onSubmit={handleSubmit}>
            {Object.keys(formData).map((v) => (
              <FormGroup>
                <Label className={"UserForm-Title"} for={v}>
                  {v === "firstName" || v === "lastName"
                    ? `${v.split("t")[0]}t ${v.split("t")[1]}`
                    : v}
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
                Submit
              </Button>
            ) : (
              <Button color="primary" className="UserFrom-Button" disabled>
                Submit
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserForm;
