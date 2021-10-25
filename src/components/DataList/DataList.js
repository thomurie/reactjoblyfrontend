// 3rd Pary Imports
import { MDBBtn, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Local Imports
import CompanyCard from "../CompanyCard/CompanyCard";
import Details from "../Details/Details";
import JobCard from "../JobCard/JobCard";
import JoblyApi from "../../helpers/api";
import SearchBar from "../SearchBar/SearchBar";

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
  const { handle } = useParams();

  let [formData, setFormData] = useState("");
  let [search, setSearch] = useState("");
  let [dataFields, setDataFields] = useState({
    description: "",
    name: "",
    searchBar: false,
    type: type,
  });
  let [data, setData] = useState({ cards: [], error: false });

  const errorHandling = () => {
    if (data.error && data.count === 1) {
      return (
        <MDBBtn color="warning" onClick={clearSearch} rounded>
          No Results, Click to Refresh
        </MDBBtn>
      );
    }
    if (data.error) {
      clearSearch();
      const isError = { ...data, count: 1 };
      setData(isError);
    }
    return data.cards;
  };
  /**
   * Set the data based on the type of data being rendered.
   */
  useEffect(() => {
    console.log("Render");
    if (type === "AllCompanies") {
      setDataFields({
        description: "All the Wonderful Companies on Jobly",
        name: "Companies",
        searchBar: true,
        type: type,
      });
      /**
       * renders a CompanyCard for each company in the retrieved data
       */
      JoblyApi.allCompanies(search)
        .then((AllCompanyData) => {
          if (AllCompanyData.length < 1) {
            const isError = { ...data, error: true };
            setData(isError);
          }
          setData({
            cards: [
              <MDBRow className="row-cols-1 row-cols-md-3 g-4 mt-2 mb-2">
                {AllCompanyData.map((d) => (
                  <CompanyCard company={d}></CompanyCard>
                ))}
              </MDBRow>,
            ],
            error: false,
          });
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
          setDataFields({
            description: CompanyData.description,
            name: CompanyData.name,
            searchBar: false,
            type: type,
          });
          setData({
            cards: [
              <MDBRow className="row-cols-1 row-cols-md-3 g-4 mt-2 mb-2">
                {CompanyData.jobs.map((j) => (
                  <JobCard job={j}></JobCard>
                ))}
              </MDBRow>,
            ],
            error: false,
          });
        })
        .catch((err) => {
          console.error(err);
          setData([]);
        });
    } else if (type === "AllJobs") {
      setDataFields({
        description: "Find Your Next Job on Jobly",
        name: "Jobs",
        searchBar: true,
        type: type,
      });
      /**
       * renders a JobCard for each company in the retrieved data
       */
      JoblyApi.allJobs(search)
        .then((AllJobData) => {
          if (AllJobData.length < 1) {
            const isError = { ...data, error: true };
            setData(isError);
          }
          setData({
            cards: [
              <MDBRow className="row-cols-1 row-cols-md-3 g-4 mt-2 mb-2">
                {AllJobData.map((j) => (
                  <JobCard job={j}></JobCard>
                ))}
              </MDBRow>,
            ],
            error: false,
          });
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

  const handleSubmit = () => {
    setSearch(formData);
  };

  const clearSearch = () => {
    setFormData("");
    setSearch("");
  };

  return (
    <div style={{ backgroundColor: "#F3EFF5" }}>
      <MDBContainer>
        <Details
          description={dataFields.description}
          name={dataFields.name}
        ></Details>
        {dataFields.searchBar ? (
          <SearchBar
            handleChange={handleChange}
            handleClear={clearSearch}
            handleSubmit={handleSubmit}
            search={formData}
          ></SearchBar>
        ) : (
          <></>
        )}
        {errorHandling()}
      </MDBContainer>
    </div>
  );
};

export default DataList;
