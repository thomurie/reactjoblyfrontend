// 3rd party imports
import { useState } from "react";

/**
 * Summary.     Custom hook used to read and set user data in localStorage
 *
 * Description. This custom hook by default renders any userdata in local storage into state.
 * Additionally allows us to update / set this data in localStorage. Includes a function
 * that allows us to remove any data in localStorage. Ultimately returns an Array that conatins
 * the user token and username from local storage and a funcition for modifying this data.
 *
 * @requires React
 *
 * @return {Array[Object, Function]}  Returns an Array that contains an Object that has the user's token (from localStorage) and a function to update this data.
 */
function LoginLocalStorage() {
  const loginAttempt = {
    lnUsername: localStorage.getItem("login_username"),
    lnFirstName: localStorage.getItem("login_firstname"),
    lnLastName: localStorage.getItem("login_lastname"),
    lnEmail: localStorage.getItem("login_email"),
  };

  const [attempt, setAttempt] = useState(loginAttempt);

  const updateLoginAttempt = (action, attemptData) => {
    if (action === "add") {
      localStorage.setItem("login_username", attemptData.username);
      localStorage.setItem("login_firstname", attemptData.firstName);
      localStorage.setItem("login_lastname", attemptData.lastName);
      localStorage.setItem("login_email", attemptData.email);

      setAttempt({
        lnUsername: attemptData.username,
        lnFirstName: attemptData.firstName,
        lnLastName: attemptData.lastName,
        lnEmail: attemptData.email,
      });
    } else if (action === "remove") {
      localStorage.setItem("login_username", "");
      localStorage.setItem("login_firstname", "");
      localStorage.setItem("login_lastname", "");
      localStorage.setItem("login_email", "");

      setAttempt({
        lnUsername: "",
        lnFirstName: "",
        lnLastName: "",
        lnEmail: "",
      });
    } else if (action === "obtain") {
      return attempt;
    }
  };

  return [attempt, updateLoginAttempt];
}

export default LoginLocalStorage;
