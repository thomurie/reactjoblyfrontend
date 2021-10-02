// 3rd Party imports
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  /**
   * Summary.     Get details on a company by handle.
   *
   * Description. This method allows us to retrieve an object of all the available
   * data on a specific company in the API. 
   
   * @static
   *
   * @memberof JoblyApi
   *
   * @fires   JoblyApi#request
   
   * @param {string}   handle            Required parameter used to find the company in the API.
   *
   * @return {Object}                    Returns an Object of Company Data.
   */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /**
   * Summary.     Get data on All Companies in the API.
   *
   * Description. This method allows us to retrieve an array of all the available
   * data on all the companies in the API. This method also allows us to add an
   * optional filter parameter. If this parameter is include the returned array is
   * modified by the filter.
   *
   * @access     private
   * @static
   *
   * @memberof   JoblyApi
   *
   * @fires      JoblyApi#request
   
   * @param {string}   [filterBy=""]    Optional parameter used to filter the results of this method.
   *
   * @return {Array}                    Returns an array of Company Objects. 
   */
  static async allCompanies(filterBy = "") {
    let res = await this.request(
      `companies${filterBy ? `/?name=${filterBy}` : "/"}`
    );
    return res.companies;
  }

  /**
   * Summary.     Get data on All Jobs in the API.
   *
   * Description. This method allows us to retrieve an array of all the available
   * data on all the Jobs in the API. This method also allows us to add an
   * optional filter parameter. If this parameter is include the returned array is
   * modified by the filter.
   *
   * @access     private
   * @static
   *
   * @memberof   JoblyApi
   *
   * @fires      JoblyApi#request
   
   * @param {string}   [filterBy=""]    Optional parameter used to filter the results of this method.
   *
   * @return {Array}                    Returns an array of Company Objects.
   */
  static async allJobs(filterBy = "") {
    let res = await this.request(
      `jobs${filterBy ? `/?title=${filterBy}` : "/"}`
    );
    return res.jobs;
  }

  // USER API ROUTES
  /**
   * Summary.     Login the user.
   *
   * Description. This method allows us to login a user using the API.
   * Additionally this allows us to set the token to the current user.
   *
   * @access     private
   * @static
   *
   * @memberof JoblyApi
   *
   * @fires   JoblyApi#request
   
   * @param {string}   username    Users username, required for login
   * @param {string}   password    Users password, required for login
  
   * @return {string}              Returns an token as a string
   */
  static async loginUser(username, password) {
    let res = await this.request(
      `auth/token`,
      { username: username, password: password },
      "post"
    );
    return res.token;
  }

  /**
   * Summary.     Get User Informaiton
   *
   * Description. This method allows us to use the token to retrieve user data
   * 
   *
   * @access     private
   * @static
   *
   * @memberof JoblyApi
   *
   * @fires   JoblyApi#request
   
   * @param {string}   username    Users username, required for login.
  
   * @return {Object}              Returns an object of User Information. 
   */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /**
   * Summary.         Register New User.
   *
   * Description.     This method allows us to create a new user.
   * 
   *
   * @access     private
   * @static
   *
   * @memberof   JoblyApi
   *
   * @fires      JoblyApi#request
   
   * @param {string}   username    Users username, required for login
  
   * @return {token}               Returns JWT token which can be used to authenticate further requests. 
   */
  static async addUser(user) {
    let res = await this.request(`auth/register`, user, "post");
    return res.token;
  }

  /**
   * Summary.         Update profile for existing user.
   *
   * Description.     This method allows us update an existing user profile.
   * 
   *
   * @access     private
   * @static
   *
   * @memberof   JoblyApi
   *
   * @fires      JoblyApi#request
   
   * @param {string}   username    Users username, required for login
  
   * @return {token}               Returns JWT token which can be used to authenticate further requests. 
   */
  static async editUser(username, user) {
    let res = await this.request(`users/${username}`, user, "patch");
    return res.user;
  }

  /**
   * Summary.         Apply user to job.
   *
   * Description.     This method allows us apply to jobs using the users username
   * and job id. This updates the applications Array in the User Object.
   *
   * @access     private
   * @static
   *
   * @memberof   JoblyApi
   *
   * @fires      JoblyApi#request
   *
   * @param {string}   username    Users username, required for application
   * @param {string}   id          Job ID, required for application
   *
   * @return {token}               Returns JWT token which can be used to authenticate further requests.
   */
  static async applyUser(username, id) {
    let res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
    return res;
  }
}

export default JoblyApi;
