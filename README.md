## Jobly

Live site: http://reactjoblyapptsu.surge.sh

### Purpose, motivation and description:

Jobly is an online job board allowing users to find and apply to their dream job. Jobly places a large focus on knowing all you can about the organization you are applying to. Many job boards place a large focus on the job, not the company. Companies and people alike have very unique values and goals. Jobly aims to match you with companies that share your values and goals.

### Data model:

Jobly uses a [PostgreSQL](https://www.postgresql.org/) database.

Jobly is an application that holds lots of data. Companies are the most important part of the data model. Jobs must be associated with companies and users apply to these jobs. Because every aspect of the data model is related it was important to approach the design of this database from an analytical point of view and really focus on “what do we want from this database”. Ultimately we want users to be able to find jobs at companies they love. In order to do this a large consideration was given to the user flow and experience in the site. The database was then designed to accommodate and retrieve relevant data to this user experience.

There were many ways we could design and implement this database. A non relational database was considered. Given the many advantages of using a non-relational database in terms of scalability, ease of use, and implementation. In addition to considering how this database would be used, additional consideration was given to what the future for Jobly holds.

Currently under development is a robust web scraper that collects data from multiple job APIs and job sites and updates the data in the database. This kind of data collection will require a large amount of computing. In addition to the computing performed, repetitive and complex queries will be performed constantly to ensure that the database is updated correctly. The combination of robust computing and frequent complex queries could be performed on a non-relational database. But such frequent updates to data that affects users requires the use of a relational database that can handle complex queries and ensure referential integrity.

After deciding to use a relational database, several open source databases were considered. Ultimately PostgreSQL was used given it is highly expandable and offers flexible full text search features. PostgreSQL has a comparatively low reading speed compared to other open source databases but the advantages of PostgreSQL outweigh this negative.

The advantage of a full text search allows Jobly to obtain a wide range of data based on a simple text query from the user. Oftentimes company names are uncommonly used words. If a database with strict text searching was used the data retrieved would be incomplete or simply not found leading to a poor user experience. Given the goal to make Jobly as easy to use as possible, the flexible full text search allows us to retrieve data that is even remotely close to what the user is looking for, ensuring that the user’s experience is great.

Current data is a combination of static data and user input data. As previously stated this static data will soon be updated to be data scraped from around the web.

As this app expands the data model will be updated to accommodate the new data.

### API or routing design:

Jobly uses a REST API.

A REST API was used due to its flexibility and scalability. There are many changes coming to Jobly in the future. The API needs to be able to accommodate these changes without changes to the way clients communicate with the server. An [Express](https://expressjs.com/) router offers several endpoints clients can use HTTP methods to request data from. As requests are received the method and route are analyzed and data is returned to the client. All data sent to the server or client is in JSON formatting to ensure that responses and requests stay consistent. All communication between the client and server is completely stateless, requests are independent and references to previous transactions are not referred to in future requests. In order to streamline communication between the client and server encrypted tokens can be included in the headers of responses and and requests. Tokens are verified using [JWT](https://jwt.io/) and based on this verification responses are modified accordingly.

Route structure is based on the content required by the client in order to display the appropriate data to the user. Routes are divided into users, companies, and jobs. These routes include routes that handle POST, PUT, DELETE, and GET requests. Allowing this application to be full featured. Most POST, PUT, and DELETE requests are protected by authentication methods that verify the user's access token, and privilege.

### Front-end:

Jobly is built using [React](https://reactjs.org/) a declarative component based library.

React was used for a number of reasons. First in accordance with our goal to be scalable, React is a great library for expanding on existing code because it uses reusable components. Reusable components means less code needs to be written and maintained.

React uses components as a key part of the library. Don't Repeat Yourself (DRY) and Single Responsibility Principle (SRP) were used for defining component hierarchy. The application starts with the APP which holds the navbar, routes, and footer. As routes are visited the contents in the app are updated to reflect the corresponding page requested. Based on the page requested different components are called and rendered. Components are broken down into smaller pieces following the principles of SRP. Components are shared across multiple pages following the principles of DRY. When not logical some components are customized to meet the page requirements. These principles are the reason the hierarchy is built to increase readability and reusability.

Finally, because it is a declarative library, the local state is used in multiple components to control what a user sees and does. State is managed by the highest up component that uses that state in the component hierarchy with state passed down as a prop to its children. As the user interacts with the site, the state is updated to display current data and views for the user. Additionally, the global state is managed by the Context API. Authenticated users are issued tokens on sign in that allow the user's data to be retrieved and updated whenever a change is detected. These tokens are stored in the browser and are updated based on user interactions.

### Additional Features:

This application has a handful of features for both users and guests.

Guest users are able to view all companies, specific company data, all available jobs, and jobs specific to an organization. The Job and Company boards offer a search bar that can be used to find a job or company by a specific keyword search.

Authenticated users have the same access as guest users but are also able to apply to jobs. These applications are received by the companies where the company can review the applicant and then choose to contact them.

Additional features for users and guests are currently under development. Plans include managing your resume on the user profile as well as displaying how many applicants a job has received.

### Styling:

Jobly uses [Material Design for Bootstrap 5 & React 17](https://mdbootstrap.com/docs/b5/react/) to style the components. Material Design is an easy to use Bootstrap based component library trusted by 2,000,000+ developers and designers.

Material Design was used as it allowed us to create a professional design and layout without spending lots of time refining the CSS of every component. Material Design allowed us to style one component exactly how we wanted it and then reuse it throughout the application. A common element used to display data is the card and grid layout. Material Design offers customization options for the card and layout design allowing us to create and deploy an application that is professional and easy to use.

Additionally Material Design has built in responsive sizing for all major screen sizes allowing Jobly to be used on whatever your preferred device is.

<!-- ### Testing:

You should describe what parts of the application are tested either by coverage or explaining the test suite. Testing is essential in projects so you should discuss your testing philosophies, what parts of the application are tested and whether unit, integration, and/or end-to-end tests are used.
Some sample questions:
(1) What kinds of tests exist in this application?
(2) Did you use TDD or another process to write your tests?
(3) What is your testing philosophy both on the front-end and backend? -->

7

### Deployment and next steps:

This application was deployed using a combination of Heroku and Surge

This Application has two separately deployed parts, the front-end and back-end. The back-end was deployed using Heroku. The front-end was deployed using Surge.
Heroku provides a number of additional features that make it ideal for hosting the back-end of this project. The primary objective achieved in the Jobly Back-End was scalability and performance. Given these requirements Heroku provides an ideal environment where developers can deploy a scalable application.
The primary objective achieved in the Jobly Front-End was user experience and performance. Surge was used for the front-end given its extreme ease in building and deploying React projects. Implementation and deployment of future features and performance enhancements can easily be implemented without requiring any rigorous changes to existing production builds.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

<!-- ### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information. -->

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
