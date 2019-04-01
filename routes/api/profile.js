const express = require('express');
const router = express.Router();
const passport = require('passport');
//const mongoose = require('mongoose');

// load user and profile model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// load validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res)=> {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if(profiles.length < 1) {
        errors.noProfiles = 'No profiles yet';
        return res.status(400).json(errors)
      }
      res.json(profiles)
    })
    .catch(err => {
      errors.noProfile = err.message;//this is bad idea user must not see server errors
      res.status(400).json(errors)
    })
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res)=> {
  const errors = {};

  Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noProfile = "Profile not found";
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => {
      errors.noProfile = err.message;//this is bad idea user must not see server errors
      res.status(400).json(errors)
    })
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by handle
// @access  Public
router.get('/user/:user_id', (req, res)=> {
  const errors = {};

  Profile.findOne({user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noProfile = "Profile not found";
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => {
      errors.noProfile = "Profile not found";
      res.status(400).json(errors)
    })
});

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res)=> {
  const errors = {};
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  Profile.findOne({user: req.user.id})
    .populate('user', ['name', 'avatar'])
    .then(profile=> {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile)
    })
    .catch(err=> res.status(400).json(err))
});

// @route   POST api/profile
// @desc    Create or update users profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res)=> {

  // check validation
  const {errors, isValid} = validateProfileInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  // get fields from request
  const {handle, company, website, location, bio, status, githubusername, skills} = req.body;
  const {id} = req.user;
  const profileFields = {};
  profileFields.user = id;
  if (handle) profileFields.handle = handle;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  // split skills into array
  if (typeof skills !== "undefined") profileFields.skills = skills.split(',');

  //social
  const {youtube, twitter, facebook, linkedin, instagram} = req.body;
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  Profile.findOne({user: id})
    .then(profile=> {
      // check if profile exist
      if (profile) {
        // update
        Profile.findOneAndUpdate({user: id}, {$set: profileFields}, {new: true})
          .then(profile=> res.json(profile));
      } else {

        Profile.findOne({handle: profileFields.handle})
          .then(profile=> {
            // check if handle exist
            if (profile) {
              errors.handle = "Handle already exist";
              res.status(400).json(errors);
            } else {
              // create
              Profile.create(profileFields)
                .then(profile=> res.json(profile))
            }

          })
      }
    })
    .catch(err=> res.status(400).json(err))
});

// @route   POST api/profile/experience
// @desc    Create users experience
// @access  Private
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res)=> {

  // check validation
  const {errors, isValid} = validateExperienceInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  Profile.findOne({user: req.user.id})
    .then(profile => {
      const {title, company, location, from, to, current, description} =req.body;
      profile.experience.unshift({title, company, location, from, to, current, description});
      profile
        .save()
        .then(profile=> res.json(profile))
    })
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete users experience
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res)=> {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      // find remove exp index
      const removeIndex = profile.experience
        .map(exp => exp.id)
        .indexOf(req.params.exp_id);
      // remove exp
      profile.experience.splice(removeIndex, 1);
      // save profile
      profile.save().then(profile => res.json(profile));
    })
    .catch(err=> res.status(404).json(err))
});

// @route   POST api/profile/education
// @desc    Create user education
// @access  Private
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res)=> {

  // check validation
  const {errors, isValid} = validateEducationInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  Profile.findOne({user: req.user.id})
    .then(profile => {
      const {school, degree, fieldofstudy, from, to, current, description} =req.body;
      profile.education.unshift({school, degree, fieldofstudy, from, to, current, description});
      profile
        .save()
        .then(profile=> res.json(profile))
    })
    .catch(err=> res.status(404).json(err))
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete user education
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res)=> {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      // find remove exp index
      const removeIndex = profile.education
        .map(edu => edu.id)
        .indexOf(req.params.edu_id);
      // remove exp
      profile.education.splice(removeIndex, 1);
      // save profile
      profile.save().then(profile => res.json(profile));
    })
    .catch(err=> res.status(404).json(err))
});

// @route   DELETE api/profile
// @desc    Delete profile and user
// @access  Private
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res)=> {
  Profile.findOneAndRemove({user: req.user.id})
    .then(() => {
      User.findOneAndRemove({_id: req.user.id})
        .then(()=> res.json({success: true}))
    })
    .catch(err=> res.status(404).json(err))
});

module.exports = router;