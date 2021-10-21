// 3rd party imports
import { MDBBtn } from "mdb-react-ui-kit";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
// import { Jumbotron, Container, Button } from "reactstrap";

// Local imports
import "./Home.css";
import UserContext from "../../Contexts/UserContext";

/**
 * Summary.     Creates the Home Component based on UserContext
 *
 * Description. Determines if there is a user currently logged in based
 * on the value of UserContext. If there is a logged in user, the user
 * is greated and welcomed to the site. Unknown users or missing data
 * in the UserContext will render a Hope component with with the option
 * to Login In.
 *
 * @requires react
 * @requires react-router-dom
 * @requires reactstrap
 * @requires UserContext
 *
 * @typedef {Class}   ReactComponent
 *
 * @return {ReactComponent}   Returns the Home Component with different data depending on value of UserContext
 */

const Home = () => {
  const history = useHistory();

  const routeToPath = (path) => {
    history.push(`/${path}`);
  };

  const { username, firstName } = useContext(UserContext);

  return (
    <header>
      <div id="intro-example" className="p-5 text-center bg-image">
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">Jobly</h1>
              <h5 className="mb-4">
                Find Your Next Great Opporutnity With Jobly
              </h5>
              {username ? (
                <h4 className="mb-4">Welcome {firstName}</h4>
              ) : (
                <>
                  <MDBBtn
                    rounded
                    className="mb-4"
                    onClick={() => routeToPath("login")}
                  >
                    Login
                  </MDBBtn>{" "}
                  <MDBBtn
                    rounded
                    className="mb-4"
                    onClick={() => routeToPath("signup")}
                  >
                    Sign Up
                  </MDBBtn>
                </>
              )}
              <h6 classname="mt-3">
                Photo by{" "}
                <a href="https://unsplash.com/@christinhumephoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  Christin Hume
                </a>{" "}
                on{" "}
                <a href="https://unsplash.com/s/photos/office?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  Unsplash
                </a>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;

// // 3rd party imports
// import { useContext } from "react";
// import { useHistory } from "react-router-dom";
// import { Jumbotron, Container, Button } from "reactstrap";

// // Local imports
// import UserContext from "../../Contexts/UserContext";

// /**
//  * Summary.     Creates the Home Component based on UserContext
//  *
//  * Description. Determines if there is a user currently logged in based
//  * on the value of UserContext. If there is a logged in user, the user
//  * is greated and welcomed to the site. Unknown users or missing data
//  * in the UserContext will render a Hope component with with the option
//  * to Login In.
//  *
//  * @requires react
//  * @requires react-router-dom
//  * @requires reactstrap
//  * @requires UserContext
//  *
//  * @typedef {Class}   ReactComponent
//  *
//  * @return {ReactComponent}   Returns the Home Component with different data depending on value of UserContext
//  */

// const Home = () => {
//   const history = useHistory();

//   const routeToPath = (path) => {
//     history.push(`/${path}`);
//   };

//   const { username, firstName } = useContext(UserContext);

//   return (
//     <div>
//       <Jumbotron fluid>
//         <Container fluid>
//           <h1 className="display-3">Jobly</h1>
//           {username ? (
//             <h2>Welcome {firstName}</h2>
//           ) : (
//             <>
//               <Button
//                 color="primary"
//                 size="lg"
//                 onClick={() => routeToPath("login")}
//               >
//                 Login
//               </Button>{" "}
//               <Button
//                 color="primary"
//                 size="lg"
//                 onClick={() => routeToPath("signup")}
//               >
//                 Sign Up
//               </Button>{" "}
//             </>
//           )}
//         </Container>
//       </Jumbotron>
//     </div>
//   );
// };

// export default Home;

// export default function App() {
//   return (
//     <header>
//       <div
//         className='p-5 text-center bg-image'
//         style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/041.jpg')", height: 400 }}
//       >
//         <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
//           <div className='d-flex justify-content-center align-items-center h-100'>
//             <div className='text-white'>
//               <h1 className='mb-3'>Heading</h1>
//               <h4 className='mb-3'>Subheading</h4>
//               <a className='btn btn-outline-light btn-lg' href='#!' role='button'>
//                 Call to action
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
