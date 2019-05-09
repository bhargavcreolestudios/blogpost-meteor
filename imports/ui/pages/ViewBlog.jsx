import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import AppContainer from '../containers/AppContainer';
import { Blogs } from '../../api/blogs';
import { createContainer } from "meteor/react-meteor-data";

export default class ViewBlog extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id
    }
  }
  

  render(){
    let data = Blogs.findOne({_id: this.state.id})
    console.log(data)
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
        <div className="col-md-12">
        <div className="panel-group">
          <div className="panel panel-default">
            <div className="panel-heading">{blogs.blogTitle}</div>
            <div className="panel-body">{blogs.description}</div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

/*export default createContainer(props => {
  const {match} = props
  if (!match.params || !match.params.id) {
    props.history.goBack()
    return{
      blogs:[]
    }
  }
  return {
    blogs: Blogs.findOne({_id: props.match.params.id})
  };
}, ViewBlog);*/
