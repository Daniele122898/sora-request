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



*/

export const Header = ({ startLogout, isAdmin }: any) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Sora Requests</h1>
        </Link>
        <div id={"outer-container"}>
          <div className='show-on-desktop'>
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
            </div>
          <div className='show-on-mobile'>
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
              { isAdmin &&
                <NavLink
                  to='/adminPanel'
                  className="button button--link burger-button" 
                >
                  Admin
                </NavLink>
              }
              <NavLink 
                to="/myRequests"
                className="button button--link burger-button" 
              >
                My Requests
              </NavLink>
              <button 
                className="button button--link burger-button burger-button__button" 
                onClick={()=> { startLogout(history); }}
              >
                Logout
              </button>
            </Menu>
          </div>

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