// 3rd Pary Imports
import { MDBTypography } from "mdb-react-ui-kit";
import { useContext } from "react";
// Local Imports
import MethodsContext from "../Contexts/MethodsContext";
// Style

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
const ErrorMsg = () => {
  const { error } = useContext(MethodsContext);

  return (
    error.msg && (
      <MDBTypography
        note
        style={{ backgroundColor: `${error.color}` }}
        Color="danger"
      >
        {error.msg}
      </MDBTypography>
    )
  );
};

export default ErrorMsg;
