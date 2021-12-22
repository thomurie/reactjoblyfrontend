// 3rd party imports
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
} from "mdb-react-ui-kit";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

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
    <MDBCol>
      <MDBCard
        className="text-white h-100"
        style={{ backgroundColor: "#72B01D" }}
      >
        <MDBCardBody>
          <MDBCardTitle>{job.title}</MDBCardTitle>
          <MDBCardSubTitle>{job.companyName}</MDBCardSubTitle>
          <MDBCardText>
            {job.salary > 4 ? `$${job.salary}` : "Negotiable"}
          </MDBCardText>
          <MDBCardText>
            {job.equity && job.equity !== "0" ? (
              <p>Equity: {job.equity}</p>
            ) : (
              "401K | Health | Dental"
            )}
          </MDBCardText>
          {username ? (
            applied.indexOf(job.id) === -1 ? (
              <MDBBtn color="info" onClick={handleClick}>
                Apply
              </MDBBtn>
            ) : (
              <MDBBtn color="info" disabled>
                Applied
              </MDBBtn>
            )
          ) : (
            <MDBBtn color="light" outline>
              <Link className="NavBar-NavLink text-light" to={`/login`}>
                Login to apply
              </Link>
            </MDBBtn>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default JobCard;
