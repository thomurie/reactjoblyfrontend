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
function useLocalStorage() {
  const currentUser = {
    username: localStorage.getItem("user"),
    token: localStorage.getItem("token"),
  };

  const [localUser, setLocalUser] = useState(currentUser);

  const updateLocalUser = (action, user) => {
    if (action === "add") {
      localStorage.setItem("user", user.username);
      localStorage.setItem("token", user.token);
      setLocalUser({
        username: localStorage.getItem("user"),
        token: localStorage.getItem("token"),
      });
    } else if (action === "remove") {
      localStorage.setItem("user", "");
      localStorage.setItem("token", "");
      setLocalUser({
        username: "",
        token: "",
      });
    }
  };

  return [localUser, updateLocalUser];
}

export default useLocalStorage;
