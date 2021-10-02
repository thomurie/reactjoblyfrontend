// 3rd party imports
import { useHistory } from "react-router-dom";
import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

/**
 * Summary.     Defines the CompanyCard Component
 *
 * Description. Takes the information in the company object and creates a
 * ListGroupItem that contains all the information from the company Object
 *
 * @requires reactstrap
 * @requires react-router-dom
 *
 * @param {Object}    company      {handle: string, name: string, description: string}
 *
 * @typedef {Class}   ReactComponent
 *
 * @return {ReactComponent}        Returns the App React Component that renders the application in React.
 */

const CompanyCard = ({ company }) => {
  const history = useHistory();

  const viewCompany = () => {
    history.push(`/companies/${company.handle}`);
  };

  return (
    <ListGroupItem tag="button" onClick={viewCompany}>
      <ListGroupItemHeading>{company.name}</ListGroupItemHeading>
      <ListGroupItemText>{company.description}</ListGroupItemText>
    </ListGroupItem>
  );
};

export default CompanyCard;
