import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../Components/Header/Header";
// import {mapStateToProps} from "../Components/utility/mapRedux"

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <div>
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <div>
            <Header />
            <Component {...props} />
          </div>
        ) : (
          <div>
            <Redirect to="/" exact={true} />
          </div>
        )
      }
    />
  </div>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth,
});

export default connect(mapStateToProps)(PrivateRoute);
