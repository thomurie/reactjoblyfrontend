// 3rd Pary Imports
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Local Imports
import CompanyCard from "../CompanyCard/CompanyCard";
import Details from "../Details/Details";
import JobCard from "../JobCard/JobCard";
import JoblyApi from "../../helpers/api";
import MethodsContext from "../../Contexts/MethodsContext";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMsg from "../ErrorMsg";
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

  const { refreshUserData, setError } = useContext(MethodsContext);

  let [formData, setFormData] = useState("");
  let [search, setSearch] = useState("");
  let [dataFields, setDataFields] = useState({
    description: "",
    name: "",
    searchBar: false,
    type: type,
  });
  let [data, setData] = useState([]);

  /**
   * Set the data based on the type of data being rendered.
   */
  useEffect(() => {
    refreshUserData();
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
          if (AllCompanyData.length > 0) {
            setData([
              <MDBRow className="row-cols-1 row-cols-md-3 g-4 mt-2 mb-2">
                {AllCompanyData.map((d) => (
                  <CompanyCard company={d}></CompanyCard>
                ))}
              </MDBRow>,
            ]);
            setError({ msg: "", color: "green" });
          } else {
            setError({
              msg: "No results found. Please try again.",
              color: "red",
            });
          }
        })
        .catch((err) => {
          setError({
            msg: err.message,
            color: "red",
          });
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
          setData([
            <MDBRow className="row-cols-1 row-cols-md-3 g-4 mt-2 mb-2">
              {CompanyData.jobs.map((j) => (
                <JobCard job={j}></JobCard>
              ))}
            </MDBRow>,
          ]);
          setError({ msg: "", color: "green" });
        })
        .catch((err) => {
          setError({
            msg: "Error finding data. Please try again.",
            color: "red",
          });
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
          if (AllJobData.length > 0) {
            setData([
              <MDBRow className="row-cols-1 row-cols-md-3 g-4 mt-2 mb-2">
                {AllJobData.map((j) => (
                  <JobCard job={j}></JobCard>
                ))}
              </MDBRow>,
            ]);
            setError({ msg: "", color: "green" });
          } else {
            setError({
              msg: "No results found. Please try again.",
              color: "red",
            });
          }
        })
        .catch((err) => {
          setError({
            msg: err.message,
            color: "red",
          });
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
    setError({ msg: "", color: "green" });
    setSearch("");
  };

  return (
    <div style={{ backgroundColor: "#F3EFF5" }}>
      <MDBContainer>
        <Details description={dataFields.description} name={dataFields.name} />
        <ErrorMsg />
        {dataFields.searchBar && (
          <SearchBar
            handleChange={handleChange}
            handleClear={clearSearch}
            handleSubmit={handleSubmit}
            search={formData}
          ></SearchBar>
        )}
        {data}
      </MDBContainer>
    </div>
  );
};

export default DataList;
