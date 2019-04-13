import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { slide as Menu } from 'react-burger-menu';
import { startLogout } from "../actions/auth";
import { AnyThunkDispatch } from '../types'
import { ApplicationState } from '../store/index';
import { isAdmin } from '../utils/utils';

type RootState = {};

/*

{ isAdmin &&
            <NavLink
              to='/adminPanel'
              className="button button--link header--button" 
            >
              Admin
            </NavLink>
          }
          <NavLink 
            to="/myRequests"
            className="button button--link header--button" 
          >
            My Requests
          </NavLink>
          <button 
            className="button button--link header--button" 
            onClick={()=> { startLogout(history); }}
          >
            Logout
          </button>

*/

export const Header = ({ startLogout, isAdmin }: any) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Sora Requests</h1>
        </Link>
        <div id={"outer-container"}>
          
          

          <Menu
            disableAutoFocus={'true'}
            pageWrapId={'app'}
            outerContainerId={'outer-container'}
            right 
            width={'50%'}
            customBurgerIcon={<IoMdMenu/>}
            customCrossIcon={<IoMdClose/>}
            crossButtonClassName={'cross'}
            burgerButtonClassName={'burger'}
            bodyClassName={'BODY'}
            htmlClassName={'HTML'}
            overlayClassName={'OVERLAY'}
            menuClassName={'burger-menu'}
          >
            <a href="" 
              className="button button--link burger-button"
            >
              My Requests
            </a>
            <a href="" 
              className="button button--link burger-button"
            >
              Logout
            </a>
          </Menu>

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