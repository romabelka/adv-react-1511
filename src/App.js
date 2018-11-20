import React, { Component, Fragment } from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminPage from './components/routes/admin';
import AuthPage from './components/routes/auth';
import People from './components/routes/people';
import PrivateRoute from './components/common/PrivateRoute';
class App extends Component {
  

  render() {
    const { auth: { user } } = this.props;
    return (
      <Fragment>
        <div>
          {user && (
            <NavLink to="/admin" activeStyle={{ color: 'red' }}>
              Admin
            </NavLink>
          )}
        </div>
        <div>
          <NavLink to="/auth/sign-in" activeStyle={{ color: 'red' }}>
            Sign In
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth/sign-up" activeStyle={{ color: 'red' }}>
            Sign Up
          </NavLink>
        </div>
        <div>
          <NavLink to="/people/add" activeStyle={{ color: 'red' }}>
            Add People
          </NavLink>
        </div>
        <div>
          <PrivateRoute isAuthenticated={user} path="/admin" component={AdminPage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/people" component={People} />
        </div>
      </Fragment>
    );
  }
}

export default withRouter(connect((state) => {
  const { auth } = state;
  return { auth };
})(App));


// import React, { Component, Fragment } from 'react';
// import { NavLink, Route, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import AdminPage from './components/routes/admin';
// import AuthPage from './components/routes/auth';
// import People from './components/routes/people';

// class App extends Component {
//   render() {
//     const PrivateRoute = ({ component: Component, ...rest }) => (
//       <Route {...rest} render={(props) => (
//          this.props.user
//           ? <Component {...props} />
//           : <Redirect to='/' />
//       )} />
//     )

//     return (
//       <Fragment>
//         <div>
//           <NavLink to="/admin" activeStyle={{ color: 'red' }}>
//             Admin
//           </NavLink>
//         </div>
//         <div>
//           <NavLink to="/auth/sign-in" activeStyle={{ color: 'red' }}>
//             Sign In
//           </NavLink>
//         </div>
//         <div>
//           <NavLink to="/auth/sign-up" activeStyle={{ color: 'red' }}>
//             Sign Up
//           </NavLink>
//         </div>
//         <div>
//           <NavLink to="/people/add" activeStyle={{ color: 'red' }}>
//             Add People
//           </NavLink>
//         </div>
//         <div>
//           {/* <PrivateRoute path='/admin' component={AdminPage} /> */}
//           <Route path="/auth" component={AuthPage} />
//           <Route path="/people" component={People} />
//         </div>
//       </Fragment>
//     );
//   }
// }



