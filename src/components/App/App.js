// 3rd Party Imports
import { useEffect, useState } from "react";
// Local imports
import JoblyApi from "../../helpers/api";
import Routes from "../Routes/Routes";
import useLocalStorage from "../../Hooks/useLocalStorage";
import UserContext from "../../Contexts/UserContext";
// Style
import "./App.css";

/**
 * Summary.       Defines the App component which renders the entire application.
 *
 * Description.   Defines the App Component, defines the user logic methods,
 * establishes the context for the application, provides state to the application,
 * renders the remaining components needed to run the application.
 *
 * @requires JoblyApi
 * @requires React
 * @requires Routes
 * @requires useLocalStorage
 * @requires UserContext
 *
 * @see      useLocalStorage
 *
 * @fires    useLocalStorage
 * @fires    useState
 *
 * @typedef {Class}   ReactComponent
 *
 * @return {ReactComponent} Returns the App React Component that renders the application in React.
 */
function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [localUser, updateLocalUser] = useLocalStorage();

  /**
   * Summary.     Removes the user from the localStorage.
   *
   * Description. Removes the username and token from the localStorage.
   * Removes the token from the API.
   *
   * @requires JoblyApi
   *
   * @see     JoblyApi
   * @see     updateLocalUser
   *
   * @fires   updateLocalUser
   */
  const signOut = () => {
    JoblyApi.token = "";
    updateLocalUser("remove");
  };

  /**
   * Summary.       Helper function that retrieves and adds User Object to currentUser state.
   *
   * Description.   Makes call to Api using token and username, obtains User
   * Object, sets the currentUser state to the User Object.
   *
   * @requires JoblyApi
   *
   * @see      JoblyApi.getUser
   * @see      setCurrentUser
   *
   * @fires    JoblyApi.getUser
   * @fires    setCurrentUser
   * @throws   signOut
   *
   * @param {string}   token           User's unique identification token.
   * @param {string}   username        User's unique username.
   */

  const signIn = (token, username) => {
    JoblyApi.token = token;
    JoblyApi.getUser(username)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        alert(err);
        console.error(err);
        signOut();
      });
  };

  /**
   * Summary.     Retrieves the user token and updates localStorage with the
   * retrieved token
   *
   * Description. Using the username and password a call is made to the API.
   * A token is obtained from the API. The token and username are set in the
   * localStorage using the updateLocalUser function.
   *
   * @see     JoblyApi.loginUser
   * @see     updateLocalUser
   *
   * @fires   JoblyApi.loginUser
   * @fires   updateLocalUser
   * @throws  signOut
   *
   * @param {Object}   user      { username: string, password: string }
   */
  const login = (user) => {
    JoblyApi.loginUser(user.username, user.password)
      .then((resToken) => {
        updateLocalUser("add", { token: resToken, username: user.username });
      })
      .catch((err) => {
        alert(err);
        console.error(err);
        signOut();
      });
  };

  /**
   * Summary.     Adds a user to the API, updates localStorage with new user's username
   * and token.
   *
   * Description. Accepts a user Object, using this object a call is made to the API to
   * add this user to the database. The call to the API adds the user, and returns a token.
   * this token and the user's username are added to localStorage.
   *
   * @see     JoblyApi.addUser
   * @see     signIn
   * @see     updateLocalUser
   *
   * @fires   JoblyApi.addUser
   * @fires   updateLocalUser
   * @fires   signIn
   * @throws  signOut
   *
   * @param {Object}   user    {username: string, password: string, firstName: string, lastName: string, email: string}
   */
  const signUp = (user) => {
    JoblyApi.addUser(user)
      .then((resToken) => {
        updateLocalUser("add", { token: resToken, username: user.username });
      })
      .catch((err) => {
        alert(err);
        console.error(err);
        signOut();
      });
  };

  /**
   * Summary.     Updates user Object in API
   *
   * Description. Takes the user object passed to it and removes the unwanted data from the
   * object. Makes a call to the API with the updated Object, the API updates the user in
   * the database. LocalUser is updated to fire useEffect to update the user Object in
   * CurrentUser in order to update the user Object with the newly updated data.
   *
   * @see     JoblyApi.editUser
   * @see     updateLocalUser
   *
   * @fires   JoblyApi.editUser
   * @fires   updateLocalUser
   * @throws  signOut
   *
   * @param {Object}   user    {username: string, password: string, firstName: string, lastName: string, email: string}
   */
  const updateUser = (user) => {
    const editUserData = {
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      email: user.email,
    };
    JoblyApi.editUser(localUser.username, editUserData)
      .then(() => {
        updateLocalUser("add", {
          token: localUser.token,
          username: localUser.username,
        });
      })
      .catch((err) => {
        console.error(err);
        signOut();
      });
  };

  /**
   * Summary.     Uses data in localUser to add or remove user from CurrentUser
   *
   * Description. Based on localUser the signIN function is called to to retrieve and
   * update the data in CurrentUser. If the data in localUser is missing the CurrentUser
   * is set to a blank object.
   *
   * @see     signIn
   * @see     setCurrentUser
   *
   * @fires   signIn
   * @fires   setCurrentUser
   *
   */
  useEffect(() => {
    if (localUser.username) {
      signIn(localUser.token, localUser.username);
    } else {
      setCurrentUser({});
    }
  }, [localUser]);

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <Routes
          login={login}
          signOut={signOut}
          signUp={signUp}
          updateUser={updateUser}
        ></Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

/**
 * Summary. (use period)
 *
 * Description. (use period)
 *
 * @example
 *
 * @todo
 *
 * @since      x.x.x
 * @deprecated x.x.x Use new_function_name() instead.
 * @access     private
 *
 * @class
 * @augments parent
 * @mixes    mixin
 *
 * @alias    realName
 * @memberof namespace
 * @requires
 *
 * @see  Function/class relied on
 * @link URL
 * @global
 *
 * @fires   eventName
 * @fires   className#eventName
 * @listens event:eventName
 * @listens className~event:eventName
 * @throws
 *
 * @param {type}   var           Description.
 * @param {type}   [var]         Description of optional variable.
 * @param {type}   [var=default] Description of optional variable with default variable.
 * @param {Object} objectVar     Description.
 * @param {type}   objectVar.key Description of a key in the objectVar parameter.
 *
 * @yield {type} Yielded value description.
 *
 * @return {type} Return value description.
 */
