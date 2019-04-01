import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/textFieldGroup'

// load action
import {registerUser} from '../../actions/authActions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    const {name, email, password, password2} = this.state;
    this.props.registerUser({name, email, password, password2}, this.props.history); // we can use registerUser as a prop because we passed it as a second argument to the connect https://react-redux.js.org/api/connect
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  render() {
    const {name, email, password, password2, errors} = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit} noValidate>
                <TextFieldGroup
                  placeholder="Name"
                  onChange={this.onChange}
                  name="name"
                  value={name}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  onChange={this.onChange}
                  name="email"
                  value={email}
                  type="email"
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  onChange={this.onChange}
                  name="password"
                  value={password}
                  type="password"
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm password"
                  onChange={this.onChange}
                  name="password2"
                  value={password2}
                  type="password"
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth, // auth comes from rootReducer
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(Register);