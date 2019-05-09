import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import AppContainer from '../containers/AppContainer';
import { Blogs } from '../../api/blogs';
import { createContainer } from "meteor/react-meteor-data";

class Blog extends Component {
  state = {
    blogs:[]
  }

  componentWillMount = ()=>{
    console.log("log the props");
    // console.log(this.props);
  }

  componentDidUpdate(prevProps){
    let {blogs} = this.props
    if (blogs != prevProps.blogs) {
      this.setState({blogs})
    }
  }
  renderBlogs = () => {
    const {blogs} = this.state
    return blogs.map((blog,key) => (
      <div className="col-md-4" key={key}>
        <div className="panel-group">
          <div className="panel panel-default">
            <div className="panel-heading">{blog.blogTitle}</div>
            <div className="panel-body">{blog.description}</div>
            <div className="panel-footer text-right">
              <button className="btn btn-primary" onClick={ () => { this.props.history.push('blog/view/'+blog._id) } }> View Blog</button>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  render(){
    return (
      <div>
        
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Blog Post App</a>
            </div>
            <div className="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#" onClick={this.logout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {this.renderBlogs()}
      </div>
    );
  }
}

export default createContainer(props => {
  return {
    blogs: Blogs.find({}).fetch()
  };
}, Blog);
