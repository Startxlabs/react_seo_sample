'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import Home from './components/Home';
import NewsDetail from './components/Detail';


const routes = (
  <Route path="/home" component={Layout}>
    <IndexRoute component={Home}/>
    <Route path="/detail/:id" component={NewsDetail}/>
  </Route>
);

export default routes;
