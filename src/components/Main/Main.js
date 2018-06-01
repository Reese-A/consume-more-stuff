import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home/Home';
import Category from '../Category/Category';
import Login from '../../containers/Login/Login';
import All from '../All/All';
import Register from '../../containers/Register/Register';
import ItemDetail from '../ItemDetail/ItemDetail';
import NewItem from '../NewItem/NewItem';

const Main = props => {
  return (
    <main className="page_content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/category/:name" component={Category} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/all" component={All} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/item/new-item" component={NewItem} />
        <Route exact path="/item/:id" component={ItemDetail} />
      </Switch>
    </main>
  );
};

export default Main;
