import { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

// Local Imports
import DataList from "../DataList/DataList";
import EditProfile from "../UserForm/EditProfile";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";
import UserForm from "../UserForm/UserForm";

// Local Imports
import UserContext from "../../Contexts/UserContext";

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

const Routes = ({ login, signOut, signUp, updateUser }) => {
  const { email, firstName, lastName, username } = useContext(UserContext);
  return (
    <div>
      <BrowserRouter>
        <NavBar signOut={signOut}></NavBar>
        <Switch>
          {/* Home */}
          <Route exact path="/">
            {username ? <Home firstName={firstName}></Home> : <Home></Home>}
          </Route>
          {/* Companies */}
          <Route exact path="/companies">
            {username ? (
              <DataList type="AllCompanies"></DataList>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          {/* Company Details */}
          <Route exact path="/companies/:handle">
            {username ? (
              <DataList type="Company"></DataList>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          {/* Jobs */}
          <Route exact path="/jobs">
            {username ? (
              <DataList type="AllJobs"></DataList>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          {/* Login */}
          <Route exact path="/login">
            {username ? (
              <Redirect to="/" />
            ) : (
              <UserForm action={login} type={"Login"}></UserForm>
            )}
          </Route>
          {/* Signup */}
          <Route exact path="/signup">
            {username ? (
              <Redirect to="/" />
            ) : (
              <UserForm action={signUp} type={"Signup"}></UserForm>
            )}
          </Route>
          {/* Profile */}
          <Route exact path="/profile">
            {username ? (
              <EditProfile
                action={updateUser}
                email={email}
                firstName={firstName}
                lastName={lastName}
                username={username}
              ></EditProfile>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          {/* Handle All Other Requests */}
          <Redirect to="/" />
        </Switch>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
