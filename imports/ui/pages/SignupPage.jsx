import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Allusers } from '../../api/allusers';
export default class SignupPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      formData:{},
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  inputChanged = (e) =>{
    let {formData, errors} = this.state;

    const { name, value } = e.target;
    formData[name] = value
    if (value !== null && value !== '') {
      errors[name] = false;
    }
    this.setState({formData,errors})
    
  }

  handleSubmit(e){
    e.preventDefault();
    let {formData} = this.state;
    let errors = this.isValid();
    if (_.isEmpty(errors)) {
      formData.createdAt =  new Date();
      console.log(formData,'formDataformDataformDataformData');
      Accounts.createUser(formData, (err) => {
        if(err){
          this.setState({
            error: err.reason
          });
        } else {
          let users = Accounts.users.find({}).fetch();
          
            
          this.props.history.push('/login');
        }
      });
    }
    this.setState({ errors });
  }

  isValid = () => {
    let requires = [
      'user_type',
      'name',
      'email',
      'password',
    ];
    let { formData } = this.state;
    let errors = {};
    let keys = Object.keys(formData);
    requires.forEach(each => {
      if (
        keys.indexOf(each) === -1 ||
        formData[each] == null ||
        typeof formData[each] === 'undefined' ||
        formData[each] === ''
      ) {
        errors[each] = true;
      }
    });
    return errors;
  };

  render(){
    const {formData,errors} = this.state
  let radioStyle = errors.user_type ? {border:'1px solid red'} : {};
    return (
      <div className="modal show">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="text-center">Sign up</h1>
            </div>
            <div className="modal-body">
              <form id="login-form" className="form col-md-12 center-block form-horizontal" onSubmit={this.handleSubmit}>
                
                <div className={`form-group ${errors.name && 'has-error has-feedback'}`}>
                  <input 
                    type="text" 
                    name="name" 
                    className="form-control input-lg" 
                    onChange={this.inputChanged} 
                    placeholder="name"
                    value={formData.name || ''}
                    required=""
                  />
                </div>
                <div className={`form-group ${errors.email && 'has-error has-feedback'}`}>
                  <input 
                    type="email" 
                    name="email"
                    className="form-control input-lg" 
                    onChange={this.inputChanged} 
                    placeholder="email"
                    value={formData.email || ''}    
                    required=""
                  />
                </div>
                <div className={`form-group ${errors.password && 'has-error has-feedback'}`}>
                  <input 
                    type="password" 
                    name="password"
                    className="form-control input-lg" 
                    onChange={this.inputChanged} 
                    placeholder="password"
                    value={formData.password || ''}
                    required=""
                  />
                </div>
                <div className={`form-group ${errors.user_type && 'has-error has-feedback'}`} style={radioStyle}>
                  <center>
                    <input 
                      type="radio" 
                      name="user_type"
                      onChange={this.inputChanged} 
                      value="admin"
                      required=""
                    /> Admin
                    <input 
                      type="radio" 
                      name="user_type"
                      onChange={this.inputChanged} 
                      value="guest"
                      required=""
                    /> User
                  </center>
                </div>
                <div className="form-group">
                  <input type="submit" id="login-button" className="btn btn-lg btn-primary btn-block" value="Sign Up" />
                </div>
                <div className="form-group">
                  <p className="text-center">Already have an account? Login <Link to="/login">here</Link></p>
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{borderTop: 0}}></div>
          </div>
        </div>
      </div>
    );
  }
}
