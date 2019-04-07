import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header'
import {ApplicationState} from "../store";

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}: any) => (
  <Route {...rest} component={(props: any)=> (
    isAuthenticated ? (
      <div>
        <Header />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to={"/"} />
    )
  )}/>
);

const mapStateToProps = (state: ApplicationState) => ({
  isAuthenticated: state.auth.user ? !!state.auth.user.id : false
});

export default connect(mapStateToProps)(PrivateRoute);