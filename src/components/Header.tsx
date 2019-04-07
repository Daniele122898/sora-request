import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from "../actions/auth";
import { AnyThunkDispatch } from '../types'

type RootState = {};

export const Header = ({ startLogout }: any) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Sora Requests</h1>
        </Link>
        <div>
          <NavLink 
            to="/myRequests"
            className="button button--link" 
          >
            My Requests
          </NavLink>
          <button 
            className="button button--link" 
            onClick={()=> { startLogout(history); }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch: AnyThunkDispatch<RootState>) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);