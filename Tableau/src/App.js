import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "./component/Home";
import TermsPage from "./component/Terms";
import LoginPage from "./component/Login";
import PrivateRoute from './component/Protect'
import TableauViz from './component/Tableau/TableauViz';
import Manual from './component/Tableau/ManualTableau';
import Custom from './component/Tableau/Custom';
// import Filter from './component/Tableau/Filter';
// import GetData from './component/Tableau/GetData';
// import GetLogicalData from './component/Tableau/GetLogicalData';
// import Resize from './component/Tableau/Resize';
// import Event from './component/Tableau/Event'
//import SelectMark from './component/Tableau/SelectMark'
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ipAddress: null,
      isLoggedIn: false,
    };
  }


  // componentDidMount() {
  //   this.fetchIpAddress();
  //   const hasLoggedInBefore = localStorage.getItem('hasLoggedInBefore');
  //   if (hasLoggedInBefore) {
  //     // If the user has logged in before, set the login status to true
  //     // this.setState({ isLoggedIn: true });
  //     this.handleLogin();
  //   }
  // }

  // handleLogin = () => {
  //   this.setState({ isLoggedIn: true });
  // }


  // fetchIpAddress = async () => {
  //   try {
  //     const response = await fetch('https://ipinfo.io/json');
  //     const data = await response.json();
  //     this.setState({ ipAddress: data.ip });
  //   } catch (error) {
  //     console.error('Error fetching IP address:', error);
  //     this.setState({ ipAddress: 'NetWork Error' });
  //   }
  // };


  render() {

    console.log(this.state);

    return (
      //       <Router>
      //         <div>
      //         <Route
      //           exact
      //           path="/"
      //           render={(props) => 
      //           <LoginPage {...props}
      //            ipAddress={this.state.ipAddress} 
      //            loggedIn={this.state.isLoggedIn}
      //            />}
      //         />
      //         {/* <Route exact path="/home" component={HomePage} />  */}
      //         <PrivateRoute
      //             exact
      //             path="/home"
      //             component={HomePage}
      //             isLoggedIn={this.state.isLoggedIn}
      //           />

      // <Route
      //             exact
      //             path="/terms"
      //             component={TermsPage}
      //             handleLogin={this.handleLogin}
      //         />

      //         </div>
      //       </Router>
      <>
        <h1>Tablue</h1>
        <TableauViz/>
      </>
    );
  }
}
export default App;