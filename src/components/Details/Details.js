/**
 * Summary.     Render a component with a given name and description.
 *
 * Description. Renders a Jumotron component with a given name/title
 * in a large font and a description in a slightly smaller font
 *
 * @requires reactstrap
 *
 * @param {string}    description    Description to be displayed in component.
 * @param {string}    name           Title/name to be displayed in component.
 *
 * @typedef {Class}   ReactComponent
 *
 * @return {ReactComponent}   Returns the Details Component with the included data
 */

const Details = ({ description, name }) => {
  return (
    <div className="pt-4">
      <h1 className="mb-3">{name}</h1>
      <h5 className="mb-4">{description}</h5>
    </div>
  );
};

export default Details;
