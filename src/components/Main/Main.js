import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../Home/Home';
import Category from '../Category/Category';
import Login from '../../containers/Login/Login';
import All from '../All/All';
import Register from '../../containers/Register/Register';
import ItemDetail from '../ItemDetail/ItemDetail';
import NewItem from '../NewItem/NewItem';
import EditItem from '../EditItem/EditItem';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AuthHome from '../AuthHome/AuthHome';
import Verify from '../Verify/Verify';

import ChangePassword from '../ChangePassword/ChangePassword';

const Main = props => {
  return (
    <main id="main" className="page_content">
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/all" component={All} />

        <Route exact path="/category/:name" component={Category} />

        <PrivateRoute exact path="/item/new-item" component={NewItem} />

        <Route exact path="/user/verify" component={Verify} />
        <PrivateRoute exact path="/user/:id/home" component={AuthHome} />
        <PrivateRoute
          exact
          path="/user/:id/password"
          component={ChangePassword}
        />

        <Route exact path="/item/:id" component={ItemDetail} />
        <PrivateRoute exact path="/item/:id/edit" component={EditItem} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </main>
  );
};

export default Main;
