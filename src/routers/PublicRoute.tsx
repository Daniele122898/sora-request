import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import {ApplicationState} from "../store";

const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}: any) => (
  <Route {...rest} component={(props: any)=> (
    !isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={"/dashboard"} />
    )
  )}/>
);

const mapStateToProps = (state: ApplicationState) => ({
  isAuthenticated: state.auth.user ? !!state.auth.user.id : false
});

export default connect(mapStateToProps)(PublicRoute);