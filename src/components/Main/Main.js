import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home/Home';

const Main = props => {
  return (
    <main className="page_content">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </main>
  );
};

export default Main;
