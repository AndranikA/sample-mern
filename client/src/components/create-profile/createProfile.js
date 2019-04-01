import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/textFieldGroup';
import TextareaFieldGroup from '../common/textareaFieldGroup';
import InputGroup from '../common/inputGroup';
import SelectListGroup from '../common/selectlistGroup';

// load action
import {createProfile} from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      bio: '',
      githubusername: '',
      youtube: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      instagram: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const {handle, status, company, website, skills, location, githubusername, bio, twitter, youtube, facebook, linkedin, instagram} = this.state;
    this.props.createProfile({handle, status, company, website, skills, location, githubusername, bio, twitter, youtube, facebook, linkedin, instagram}, this.props.history);
  }
  render() {
    const {handle, status, company, website, skills, location, githubusername, bio, errors,displaySocialInputs} = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      const {twitter, youtube, facebook, linkedin, instagram } = this.state;
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profile url"
            name="twitter"
            icon="fa fa-twitter"
            value={twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook profile url"
            name="facebook"
            icon="fa fa-facebook"
            value={facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin profile url"
            name="linkedin"
            icon="fa fa-linkedin"
            value={linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube profile url"
            name="youtube"
            icon="fa fa-youtube"
            value={youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram profile url"
            name="instagram"
            icon="fa fa-instagram"
            value={instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      )
    }

    // Select options for status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">Let's make some information to make your profile stand out</p>
              <small className="d-block pb-3">* = required</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  value={handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile uri(can't be changed later)"
                />
                <SelectListGroup
                  name="status"
                  value={status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="An idea where you are in your career"
                  options={options}
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your onw company or "
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your website"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="city or state or both"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="Please use comma separated values"
                />
                <TextareaFieldGroup
                  placeholder="Short bio"
                  name="bio"
                  value={bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a bit about yourself"
                />

                <div className="mb-3">
                  <button type="button" onClick={() => {
                    this.setState(prevState => ({displaySocialInputs: !prevState.displaySocialInputs}))
                  }} className="btn btn-light">Add Social network links</button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(CreateProfile)