import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import DashboardPage from '../components/DashboardPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ReactAuthPage from '../components/ReactAuthPage';
import MyRequestsPage from '../components/MyRequestsPage';
import EditWaifuRequest from '../components/EditWaifuRequest';
import AdminPanel from '../components/AdminPanel';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true}/>
        <PublicRoute path="/reactAuth/:redirPath?" component={ReactAuthPage}/>
        <PrivateRoute path="/editWaifuRequest/:id" component={EditWaifuRequest}/>
        <PrivateRoute path="/dashboard" component={DashboardPage}/>
        <PrivateRoute path="/adminPanel" component={AdminPanel}/>
        <PrivateRoute path="/myRequests" component={MyRequestsPage}/>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;