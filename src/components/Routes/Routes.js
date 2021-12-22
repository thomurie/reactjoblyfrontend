import { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

// Local Imports
import DataList from "../DataList/DataList";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";
import UpdateUser from "../UserForm/UpdateUser";
import UserContext from "../../Contexts/UserContext";
import DisplayForm from "../UserForm/DisplayForm";

/**
 * Summary.     Uses react-router to render components based on the path.
 *
 * Description. Uses react-router to render components based on the path.
 * Additionally prop drills various functions to different components.
 * These components and routes allow users to navigate accross the app.
 *
 * @see                login
 * @see                signUp
 * @see                signOut
 * @see                updateUser
 *
 * @fires              login
 * @fires              signUp
 * @fires              signOut
 * @fires              updateUser
 *
 * @param {Function}   login            Prop passed down from App Component.
 * @param {Function}   signOut          Prop passed down from App Component.
 * @param {Function}   signUp           Prop passed down from App Component.
 * @param {Function}   updateUser       Prop passed down from App Component.
 *
 * @typedef {Class}   ReactComponent
 *
 * @return {ReactComponent}   Returns the Routes Component which uses react-router-dom to render components based on path.
 */

const Routes = () => {
  const { firstName, username } = useContext(UserContext);

  return (
    <div>
      <BrowserRouter>
        <NavBar firstName={firstName} />
        <Switch>
          {/* Home */}
          <Route exact path="/">
            <Home firstName={firstName} />
          </Route>
          {/* Companies */}
          <Route exact path="/companies">
            <DataList type="AllCompanies" />
          </Route>
          {/* Company Details */}
          <Route exact path="/companies/:handle">
            <DataList type="Company" />
          </Route>
          {/* Jobs */}
          <Route exact path="/jobs">
            <DataList type="AllJobs" />
          </Route>
          {/* Login */}
          <Route exact path="/login">
            {username ? <Redirect to="/" /> : <DisplayForm type="Login" />}
          </Route>
          {/* Signup */}
          <Route exact path="/signup">
            {username ? <Redirect to="/" /> : <DisplayForm type={"Signup"} />}
          </Route>
          {/* Profile */}
          <Route exact path="/profile">
            {username ? <UpdateUser /> : <Redirect to="/" />}
          </Route>
          {/* Handle All Other Requests */}
          <Redirect to="/" />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Routes;
