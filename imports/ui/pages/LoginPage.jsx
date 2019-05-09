import React, { Component } from 'react'
import { withHistory, Link } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data'
import { Allusers } from '../../api/allusers';
export default class LoginPage extends Component {
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
      Meteor.loginWithPassword(formData.email, formData.password, (err, res) => {
        if(err){
          this.setState({
            error: err.reason
          });
        } else {
          this.props.history.push('/');
        }
      });
    }
    this.setState({ errors });
    
  }
  isValid = () => {
    let requires = [
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
    const {formData, errors} = this.state;
    return (
      <div className="modal show">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="text-center">Login</h1>
            </div>
            <div className="modal-body">
              <form id="login-form" className="form col-md-12 center-block" onSubmit={this.handleSubmit}>
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
                <div className="form-group text-center">
                  <input type="submit" id="login-button" className="btn btn-primary btn-lg btn-block" value="Login" />
                </div>
                <div className="form-group text-center">
                  <p className="text-center">Don't have an account? Register <Link to="/signup">here</Link></p>
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
