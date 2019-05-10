import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Blogs } from '../../api/blogs';
import { withTracker } from "meteor/react-meteor-data";


class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      formData: {},
      errors: {},
      enableEdit:false,
      loaded:false
    };
  }

  componentDidMount(){
    setTimeout(()=> {
      this.setState({loaded:true})
    }, 3000);
  }
  componentDidUpdate(prev){
    if (this.props.blog != prev.blog) {
      this.setState({
        formData:this.props.blog
      })
    }
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
    let {formData, errors} = this.state;
    const {isEdit} = this.props
    if(isEdit){
      Blogs.update({_id : formData._id},{
        $set:{
          blogTitle: formData.blogTitle,
          description: formData.description,
        }
      })
    }else{
      let {currentUser} = this.props
      Blogs.insert({
        ...formData,
        createdBy: currentUser._id,
        createdAt: new Date(), // current time
      });
    }
    formData= {}
    this.setState({formData})
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

  logout =(e)=>{
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

  renderComponent = () =>{
    let currentUser = this.props.currentUser;
    let userDataAvailable = (currentUser !== undefined);
    let loggedIn = (currentUser && userDataAvailable);
    const {formData, errors, enableEdit} = this.state;
    const {isEdit} = this.props
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
            </div>
            <div className="col-md-4">
              <h3 className="text-center">{isEdit ? 'Edit' :'Add'} Blog</h3>
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
                    <input type="submit" className="btn btn-lg btn-primary btn-block" value={isEdit ? 'Edit' :'Add'}/>
                  </div>
                </form>
            </div>
            <div className="col-md-4">
              <Link to="/">View All Blogs</Link>
            </div>
          </div>
        </div>
      </div>)
  }

  render(){
    let currentUser = this.props.currentUser;
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
        {this.renderComponent()}
      </div>
    );
  }
}

// MainPage.propTypes = {
//   username: PropTypes.string
// }

export default withTracker(props => {
  const handle = Meteor.subscribe('Blogs');
  console.log(handle.ready());
  const {location} = props
  if (location.state && location.state.id) {
    return {
      currentUser: Meteor.user(),
      isEdit: true,
      ready:handle.ready(),
      blog: Blogs.findOne({_id: location.state.id}) || {}
    };
  }else{
    return {
    currentUser: Meteor.user(),
    isEdit: false,
    ready:handle.ready(),
    blog: {}
  };
  }
})(MainPage);
