// 3rd Pary Imports
import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ListGroup, Container, Row, Col, CardGroup } from "reactstrap";
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

  const { handle } = useParams();

  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState("");
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState({ type: type });

  /**
   * Set the data based on the type of data being rendered.
   */
  useEffect(() => {
    if (type !== dataType.type) {
      console.log(type, dataType.type);
      clearSearch();
    }
    if (type === "AllCompanies") {
      setDataType({
        type: type,
        name: "Companies",
        description: "All the Wonderful Companies on Jobly",
      });
      /**
       * renders a CompanyCard for each company in the retrieved data
       */
      JoblyApi.allCompanies(search)
        .then((AllCompanyData) => {
          if (type !== dataType.type) {
            clearSearch();
          } else if (AllCompanyData.length < 1) {
            alert("No items found");
            clearSearch();
          }

          let items = [];
          let count = 0;
          const cards = [];

          for (let i = 0; i < AllCompanyData.length; i++) {
            const e = AllCompanyData[i];
            if (count <= 2) {
              items.push(<CompanyCard company={e}></CompanyCard>);
              i + 1 === AllCompanyData.length
                ? cards.push(<CardGroup>{items}</CardGroup>)
                : count++;
            } else {
              cards.push(<CardGroup>{items}</CardGroup>);
              items = [];
              count = 0;
            }
          }

          // cards.push(<CardGroup>{items}</CardGroup>

          setData(cards);
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
          setDataType({
            type: type,
            name: CompanyData.name,
            description: CompanyData.description,
          });

          let items = [];
          let count = 0;
          const cards = [];

          for (let i = 0; i < CompanyData.jobs.length; i++) {
            const e = CompanyData.jobs[i];

            if (count < 3) {
              items.push(<JobCard job={e}></JobCard>);
              i + 1 === CompanyData.jobs.length
                ? cards.push(<CardGroup>{items}</CardGroup>)
                : count++;
            } else {
              cards.push(<CardGroup>{items}</CardGroup>);
              items = [];
              count = 0;
            }
          }

          setData(cards);
        })
        .catch((err) => {
          console.error(err);
          setData([]);
        });
    } else if (type === "AllJobs") {
      setDataType({
        type: type,
        name: "Jobs",
        description: "Find Your Next Job on Jobly",
      });
      /**
       * renders a JobCard for each company in the retrieved data
       */
      JoblyApi.allJobs(search)
        .then((AllJobData) => {
          if (type !== dataType.type) {
            clearSearch();
          } else if (AllJobData.length < 1) {
            alert("No items found");
            clearSearch();
          }

          let items = [];
          let count = 0;
          const cards = [];

          for (let i = 0; i < AllJobData.length; i++) {
            const e = AllJobData[i];
            if (count < 3) {
              items.push(<JobCard job={e}></JobCard>);
              i + 1 === AllJobData.length
                ? cards.push(<CardGroup>{items}</CardGroup>)
                : count++;
            } else {
              cards.push(<CardGroup>{items}</CardGroup>);
              items = [];
              count = 0;
            }
          }

          setData(cards);
        })
        .catch((err) => {
          console.error(err);
          setData([]);
        });
    }
  }, [type, search]);

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setFormData(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(formData);
  };

  const clearSearch = () => {
    setFormData("");
    setSearch("");
  };

  return (
    <>
      <Container className="themed-container" fluid="sm">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Details
              name={dataType.name}
              description={dataType.description}
            ></Details>
            {type !== "Company" ? (
              <SearchBar
                search={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                clearSearch={clearSearch}
              ></SearchBar>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        {data}
      </Container>
    </>
  );
};

export default DataList;
// setData([
//   <>
//     {CompanyData.jobs.map((j) => (
//       <JobCard job={j}></JobCard>
//     ))}
//   </>,
// ]);

// setData([
//   <>
//     {AllJobData.map((j) => (
//       <JobCard job={j}></JobCard>
//     ))}
//   </>,
// ]);
