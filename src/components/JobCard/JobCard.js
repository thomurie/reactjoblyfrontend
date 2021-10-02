// 3rd party imports
import { useContext, useState } from "react";
import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  List,
  ListInlineItem,
  Button,
} from "reactstrap";
// Local imports
import JoblyApi from "../../helpers/api";
import UserContext from "../../Contexts/UserContext";

/**
 * Summary.     Renders the JobCard Component
 *
 * Description. Using Job Object passed to component from DataList
 * the JobCard renders a component showing information on the given
 * job. Additionally renders UI and supplies funcitonality for
 * applying currently logged in users to the the specifice job.
 * Shows different UI for jobs the user has and has not applied to.
 *
 * @todo Add Logic for current user to Apply for Job.
 * @todo Add Logic to change button to change to Applied.
 *
 * @requires reactstrap
 *
 * @see      Jobly.applyUser
 *
 * @fires    Jobly.applyUser
 *
 * @param {Object}   job     {title: string, companyName: string, salary: string, equity: string}
 *
 * @typedef {Class}   ReactComponent
 *
 * @return {ReactComponent}   Returns the JobCard Component with different data depending on value of the job Object.
 */

const JobCard = ({ job }) => {
  const { username, applications } = useContext(UserContext);
  const [applied, setApplied] = useState(applications);

  const handleClick = () => {
    JoblyApi.applyUser(username, job.id);
    setApplied([...applied, job.id]);
  };

  return (
    <ListGroupItem>
      <ListGroupItemHeading>{job.title}</ListGroupItemHeading>
      <ListGroupItemText>
        <List type="inline">
          <ListInlineItem>{job.companyName}</ListInlineItem>
          <ListInlineItem>${job.salary}</ListInlineItem>
          <ListInlineItem>
            {job.equity && job.equity !== "0" ? (
              <p>Equity: {job.equity}</p>
            ) : null}
          </ListInlineItem>
        </List>
      </ListGroupItemText>
      {applied.indexOf(job.id) === -1 ? (
        <Button onClick={handleClick} color="info">
          Apply
        </Button>
      ) : (
        <Button color="info" disabled>
          Applied
        </Button>
      )}
    </ListGroupItem>
  );
};

export default JobCard;
