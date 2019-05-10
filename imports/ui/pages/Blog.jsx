import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import AppContainer from '../containers/AppContainer';
import { Blogs } from '../../api/blogs';
import { withTracker } from "meteor/react-meteor-data";

class Blog extends Component {
  state = {
  }

  componentWillMount = ()=>{
  }

  onViewClick = (id) =>{
    if (id) {
      this.props.history.push({
        pathname: '/blog',
        state: { id: id }
      })
    }
  }
  onDeleteClick = (id) =>{
    if (id) {
      Blogs.remove(id)
    }
  }

  logout =(e) =>{
    e.preventDefault();
    Meteor.logout( (err) => {
        if (err) {
            console.log( err.reason );
        } else {
            this.props.history.push('/login');
        }
    });
    this.props.history.push('/login');
  }
  renderBlogs = () => {
    const {blogs} = this.props
    return blogs.map((blog,key) => (
      <div className="col-md-4" key={key}>
        <div className="panel-group">
          <div className="panel panel-default">
            <div className="panel-heading">{blog.blogTitle}</div>
            <div className="panel-body">{blog.description}</div>
            <div className="panel-footer text-right">
              <div>
                <button className="btn btn-danger pull-left" onClick={(e) =>{this.onDeleteClick(blog._id)}}> Delete Blog</button>
                <button className="btn btn-primary" onClick={(e) =>{this.onViewClick(blog._id)}}> View Blog</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  render(){
    const {currentUser} = this.props
    return (
      <div>        
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Blog Post App</Link>
            </div>
            <div className="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                {currentUser ?<li>
                                  <a href="#" onClick={this.logout}>Logout</a>
                                </li> :
                                <li>
                                  <Link to="/login">Login</Link>
                                </li> 
                              }
              </ul>
            </div>
          </div>
        </nav>
        <div>
        <div className="text-right">
        {currentUser && <Link className="btn btn-primary" to="/newBlog">Add new Blog</Link>}
        </div>
        {this.renderBlogs()}
        </div>
      </div>
    );
  }
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  const handle = Meteor.subscribe('Blogs');

  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    blogs: Blogs.find({}).fetch(),
  };
})(Blog);
