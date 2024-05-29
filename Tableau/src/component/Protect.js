// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isLoggedIn ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{ pathname: '/', state: { from: props.location } }} />
//       )
//     }
//   />
// );

// export default PrivateRoute;


import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const { component: Component, isLoggedIn, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) =>
          isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        }
      />
    );
  }
}

export default PrivateRoute;

