// 3rd Pary Imports
import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ListGroup, Container, Row, Col } from "reactstrap";
// Local Imports
import CompanyCard from "../CompanyCard/CompanyCard";
import Details from "../Details/Details";
import JobCard from "../JobCard/JobCard";
import JoblyApi from "../../helpers/api";
import SearchBar from "../SearchBar/SearchBar";
import UserContext from "../../Contexts/UserContext";

/**
 * Summary.         Creates a react component based on the type of data being requested.
 *
 * Description.     Based on the passed in data type this component will render different types
 * of data lists. Using the type parameter the component decides what to show and where to get the data.
 *
 * @requires React
 * @requires react-router-dom
 * @requires reactstrap
 *
 * @see      CompanyCard
 * @see      Details
 * @see      JobCard
 * @see      JoblyApi
 * @see      SearchBar
 * @see      UserContext
 *
 * @param {string}    type          modifies the displayed data based on the type of data being requested.
 *
 * @typedef {Class}   ReactComponent
 *
 * @return {ReactComponent}        Renders a react component with the specified type of data.
 */
const DataList = ({ type }) => {
  let history = useHistory();
  /**
   * Verify that there is a signed in user
   * else- redirect to home
   */
  const { username } = useContext(UserContext);
  if (username === undefined) {
    history.push("/");
  }

  const { handle, jobs } = useParams();

  let [search, setSearch] = useState("");
  let [data, setData] = useState([]);

  /**
   * Set the data based on the type of data being rendered.
   */
  useEffect(() => {
    if (type === "AllCompanies") {
      /**
       * renders a CompanyCard for each company in the retrieved data
       */
      JoblyApi.allCompanies(search)
        .then((AllCompanyData) => {
          setData([
            <>
              <Details
                name="Companies"
                description="All the Wonderful Companies on Jobly"
              ></Details>
              <SearchBar
                search={search}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              ></SearchBar>
              <ListGroup>
                {AllCompanyData.map((d) => (
                  <CompanyCard company={d}></CompanyCard>
                ))}
              </ListGroup>
            </>,
          ]);
        })
        .catch((err) => {
          console.error(err);
          setData([]);
        });
    } else if (type === "Company") {
      /**
       * Renders a Details for the retrieved company data
       * Renders a JobCard for each job in the retrieved company data
       */
      JoblyApi.getCompany(handle)
        .then((CompanyData) => {
          setData([
            <>
              <Details
                name={CompanyData.name}
                description={CompanyData.description}
              ></Details>
              <ListGroup>
                {CompanyData.jobs.map((j) => (
                  <JobCard job={j}></JobCard>
                ))}
              </ListGroup>
            </>,
          ]);
        })
        .catch((err) => {
          console.error(err);
          setData([]);
        });
    } else if (type === "AllJobs") {
      /**
       * renders a JobCard for each company in the retrieved data
       */
      JoblyApi.allJobs(search)
        .then((AllJobData) => {
          setData([
            <>
              <Details
                name="Jobs"
                description="Find Your Next Job on Jobly"
              ></Details>
              <SearchBar
                search={search}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              ></SearchBar>
              <ListGroup>
                {AllJobData.map((j) => (
                  <JobCard job={j}></JobCard>
                ))}
              </ListGroup>
            </>,
          ]);
        })
        .catch((err) => {
          console.error(err);
          setData([]);
        });
    }
  }, [type, search]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch("");
  };

  return (
    <Container className="themed-container" fluid="sm">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          {data ? data : <h3>Loading...</h3>}
        </Col>
      </Row>
    </Container>
  );
};

export default DataList;
