// 3rd party imports
import { MDBInputGroup, MDBInputGroupElement, MDBBtn } from "mdb-react-ui-kit";

/**
 * Summary.     Renders a search bar that is used in the DataList Component
 *
 * Description. Renders a search bar that is used in the DataList Component.
 * Uses the data passed down from DataList to render a controlled component
 * that renders a UI that allows you to search through lists of data in this application.
 *
 * @requires           reactstrap
 *
 * @see                DataList
 *
 * @param {Function}   handleChange            Prop passed down from DataList Component.
 * @param {Function}   handleSubmit            Prop passed down from DataList Component.
 * @param {string}     search                  State passed down from DataList Component.
 *
 * @typedef {Class}    ReactComponent
 *
 * @return {ReactComponent}   Returns the SearchBar Component which renders a InputGroup for searching
 */

const SearchBar = ({ handleChange, handleClear, handleSubmit, search }) => {
  return (
    <MDBInputGroup className="mb-3">
      <MDBInputGroupElement
        placeholder="Enter Search Term"
        type="text"
        onChange={handleChange}
        value={search}
      />
      {search ? (
        <>
          <MDBBtn onClick={handleSubmit}>Search</MDBBtn>
          <MDBBtn onClick={handleClear}>Clear Search</MDBBtn>
        </>
      ) : (
        <>
          <MDBBtn disabled>Search</MDBBtn>
          <MDBBtn disabled>Clear Search</MDBBtn>
        </>
      )}
    </MDBInputGroup>
  );
};

export default SearchBar;
