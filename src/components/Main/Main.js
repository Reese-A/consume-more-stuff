import React from 'react';
import { Switch, Route } from 'react-router-dom';

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

const Main = props => {
  return (
    <main className="page_content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/category/:name" component={Category} />
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/all" component={All} />
        {/* <Route exact path="/register" component={Register} /> */}
        <PrivateRoute exact path="/item/new-item" component={NewItem} />
        <PrivateRoute exact path="/user/:name/home" component={AuthHome} />

        {/* <Route exact path="/item/new-item" component={NewItem} /> */}
        <Route exact path="/item/:id" component={ItemDetail} />
        <PrivateRoute exact path="/item/:id/edit" component={EditItem} />
      </Switch>
    </main>
  );
};

export default Main;
