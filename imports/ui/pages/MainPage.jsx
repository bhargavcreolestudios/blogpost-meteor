import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Blogs } from '../../api/blogs';

export default class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      formData: {},
      errors: {},
      enableEdit:false,
    };
  }
  inputChanged = (event)=>{
    let {formData, errors} = this.state;

    const { name, value } = event.target;
    formData[name] = value
    if (value !== null && value !== '') {
      errors[name] = false
    }
    this.setState({formData,errors})
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.enableEdit){
      let {formData} = this.state;
      Blogs.update({_id : formData._id},{
        $set:{
          blogTitle: formData.blogTitle,
          description: formData.description,
        }
      })
    }else{
      let currentUser = this.props.currentUser;
      let {formData, errors} = this.state;
      Blogs.insert({
        ...formData,
        createdBy: currentUser._id,
        createdAt: new Date(), // current time
      });
    }
  }
  _onDeleteClick = (id) => {
    Blogs.remove(id)
  }
  _onEditClick = (id) => {
    let data = Blogs.findOne({_id: id})
    let editData = {
      _id: id,
      blogTitle:data.blogTitle, 
      description:data.description, 
      createdBy:data.createdBy, 
      editedAt:new Date()
    }
    this.setState({formData: editData, enableEdit:true})
  }

  renderBlogs() {
    let blogs = Blogs.find({}, { sort: { createdAt: -1 } }).fetch();
    return blogs.map((blog,key) => (
      <tr key={key}>
        <td scope="row">{blog.blogTitle}</td>
        <td>{blog.description}</td>
        <td>
          <button type="button" className="btn blue" onClick={(id)=>{this._onEditClick(blog._id)}}>Edit</button>
        </td>
        <td>
          <button type="button" className="btn red" onClick={(id)=>{this._onDeleteClick(blog._id)}}>Remove</button>
        </td>
      </tr>
    ));
  }

  render(){

    let currentUser = this.props.currentUser;
    let userDataAvailable = (currentUser !== undefined);
    let loggedIn = (currentUser && userDataAvailable);
    const {formData, errors, enableEdit} = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
            </div>
            <div className="col-md-4">
              <h1 className="text-center">{ loggedIn ? 'Welcome '+currentUser.username : '' }</h1>

              <h3 className="text-center">Add Blog</h3>
              { /*error.length > 0 ? <div className="alert alert-danger fade in">{error}</div> :''*/}
                <form id="login-form" className="form col-md-12 center-block" onSubmit={this.handleSubmit.bind(this)}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="blogTitle" 
                      name="blogTitle" 
                      className="form-control input-lg" 
                      placeholder="Blog Title"
                      value={formData.blogTitle || ''}
                      onChange={this.inputChanged}
                    />
                  </div>
                  <div>
                    <textarea 
                      name="description" 
                      className="form-control input-lg" 
                      placeholder="Blog Content"
                      value={formData.description || ''}
                      onChange={this.inputChanged}
                      rows="5"
                    >
                    </textarea>
                  </div>
                  <div className="form-group">
                    {
                      enableEdit ? <input type="submit" id="login-button" className="btn btn-lg btn-primary btn-block" value="Update" /> : <input type="submit" id="login-button" className="btn btn-lg btn-primary btn-block" value="Add" /> 
                    }
                  </div>
                </form>
            </div>
            <div className="col-md-4">
              <Link to="/blog">View All Blogs</Link>
              <Link to="/admin/users" style={{ 'marginLeft': "30px" }}>View All Users</Link>
            </div>
          </div>
        </div>

        {  <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Blog Title</th>
                            <th scope="col">Blog Description</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                            {this.renderBlogs()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>}

      </div>
    );
  }
}

MainPage.propTypes = {
  username: PropTypes.string
}
