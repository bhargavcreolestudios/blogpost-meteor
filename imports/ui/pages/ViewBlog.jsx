import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import AppContainer from '../containers/AppContainer';
import { Blogs } from '../../api/blogs';
import { withTracker } from "meteor/react-meteor-data";

class ViewBlog extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      blog:{}
    }
  }

  componentWillMount(){
    const {location} = this.props
    if (!location.state || !location.state.id) {
     this.props.history.goBack()
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

  onEditClick = (id) =>{
    if (id) {
      this.props.history.push({
        pathname: '/newBlog',
        state: { id: id }
      })
    }
  }

  render(){
    const {blog, currentUser} = this.props
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
        <div className="col-md-12">
        <div className="panel-group">
          <div className="panel panel-default">
            <div className="panel-heading">{blog.blogTitle}</div>
            <div className="panel-body">{blog.description}</div>
            {currentUser && <div className="panel-footer text-right"><button className="btn btn-primary" onClick={(e) =>{this.onEditClick(blog._id)}}> Edit Blog</button></div>}
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default withTracker(props => {
  const handle = Meteor.subscribe('Blogs');
  const {location} = props
  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    blog: Blogs.findOne({_id: location.state.id}) || {}
  };
})(ViewBlog);
