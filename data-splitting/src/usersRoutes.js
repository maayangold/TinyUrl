import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Users from './usersList.js';


const UsersRoutes = () => {
  return (
    <Switch>
      <Route exact path="/users" component={Users} />

    </Switch>
  );
};

export default UsersRoutes;
