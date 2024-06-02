import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Links from './linksList.js';
// import CreateLink from './CreateLink';
// import UpdateLink from './UpdateLink';
// import DeleteLink from './DeleteLink';

const LinksRoutes = () => {
  return (
    <Switch>
      <Route exact path="/links" component={Links} />
      {/* <Route exact path="/links/create" component={CreateLink} />
      <Route exact path="/links/update/:id" component={UpdateLink} />
      <Route exact path="/links/delete/:id" component={DeleteLink} /> */}
    </Switch>
  );
};

export default LinksRoutes;
