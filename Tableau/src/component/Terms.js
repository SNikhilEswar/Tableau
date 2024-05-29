import React, { Component } from "react";
import { withRouter } from "react-router";
class ExplorePage extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  handleTerms = () => {
    const { history } = this.props;
    localStorage.setItem('hasLoggedInBefore', true);
    this.props.handleLogin();
    history.push("/home");
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Terms and Conditions</h1>
        <button onClick={this.handleTerms}>Accept Terms</button>
      </div>
    );
  }
}

export default withRouter(ExplorePage);
