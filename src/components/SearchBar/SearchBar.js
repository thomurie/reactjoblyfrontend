// 3rd party imports
import { Button, InputGroup, InputGroupAddon, Input } from "reactstrap";

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

const SearchBar = ({ handleChange, handleSubmit, search }) => {
  return (
    <InputGroup>
      <Input
        type="text"
        name="search"
        placeholder="Enter Search Term"
        value={search}
        onChange={handleChange}
      />
      <InputGroupAddon addonType="append">
        <Button onClick={handleSubmit}>Clear Search</Button>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchBar;