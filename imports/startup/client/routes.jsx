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
import MainPage from '../../ui/pages/MainPage';


export const renderRoutes = () => (
  <Router>
    <div>
      <Route exact path="/newBlog" component={MainPage} />
      <Route exact path="/login" component={LoginPage}/>
      <Route exact path="/signup" component={SignupPage}/>
      <Route exact path="/" component={Blog} />
      <Route exact path="admin/users" component={Users} />
      <Route exact path="/blog" component={ViewBlog} />
    </div>
  </Router>
);
