import React, { Component } from 'react';
import './style.css';
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: ''
    };
  }

  handleLogin = () => {
    const { history } = this.props;
    if(!this.state.fName && !this.state.lName) {
      alert('Please fill both fields')
    } else {
      console.log(this.props.loggedIn === false ? 'terms' : 'home');
      if(this.props.loggedIn) {
        history.push('/home');
      } else {
        history.push('/terms');
      }
    }
  }

  render() {
    return (
      <div className="login_form_wrapper">
			<div className="container">
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<div className="login_wrapper">
							<h2>{this.props.ipAddress === null ? 'Loading...' : this.props.ipAddress}</h2>
							<div className="formsix-pos">
								<div className="form-group i-email">
									<input type="email" className="form-control" required="" id="email2" placeholder="Email Address *" 
                  value={this.state.fName}
                  onChange={(e) => this.setState({fName: e.target.value})}
                  />
								</div>
							</div>
							<div className="formsix-e">
								<div className="form-group i-password">
									<input type="password" className="form-control" required="" id="password2" placeholder="Password *" 
                   value={this.state.lName}
                   onChange={(e) => this.setState({lName: e.target.value})}
                  />
								</div>
							</div>
							<div className="login_btn_wrapper">
                <button onClick={this.handleLogin}>Login</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
  }
}

export default LoginPage;
