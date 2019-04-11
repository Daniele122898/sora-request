import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from "../actions/auth";
import { AnyThunkDispatch } from '../types'
import { ApplicationState } from '../store/index';
import { isAdmin } from '../utils/utils';

type RootState = {};

export const Header = ({ startLogout, isAdmin }: any) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Sora Requests</h1>
        </Link>
        <div>
          { isAdmin &&
            <NavLink
              to='/adminPanel'
              className="button button--link" 
            >
              Admin
            </NavLink>
          }
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

const mapStateToProps = (state: ApplicationState) => ({
  isAdmin: isAdmin(state.auth.user ? state.auth.user.id : '')
});

const mapDispatchToProps = (dispatch: AnyThunkDispatch<RootState>) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);