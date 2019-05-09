import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

// containers
import AppContainer from '../../ui/containers/AppContainer'
import MainContainer from '../../ui/containers/MainContainer'

// pages
import SignupPage from '../../ui/pages/SignupPage'
import LoginPage from '../../ui/pages/LoginPage'
import Blog from '../../ui/pages/Blog';
import ViewBlog from '../../ui/pages/ViewBlog';
import Users from '../../ui/pages/Users';


export const renderRoutes = () => (
  <Router>
    <div>
      <Route exact={true} path="/" component={AppContainer} />
      <Route path="/login" component={LoginPage}/>
      <Route path="/signup" component={SignupPage}/>
      <Route path="/blog" component={Blog} />
      <Route path="admin/users" component={Users} />
      <Route path="/blog/view/:id" component={ViewBlog} />
    </div>
  </Router>
);
