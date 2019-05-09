import React, { Component } from 'react';
/*import { withHistory, Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Allusers } from '../../api/allusers';*/
export default class Users extends Component {
  constructor(props){
    super(props);
  }

 /* inputChanged = (e) =>{
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
  };*/

  render(){
    return (
     <div>
       hi
     </div>
    );
  }
}
