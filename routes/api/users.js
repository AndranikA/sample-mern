const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const passport = require('passport');
const keys = require('../../config/keys');

// load validations
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load user model
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register users
// @access  Public
router.post('/register', (req, res)=> {
  const {email} = req.body;
  const {errors, isValid} = validateRegisterInput(req.body);

  // check validation
  if (!isValid) return res.status(400).json(errors);

  User
    .findOne({email})// query for user
    .then(user=> {
      // if user exist return an error message
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json({errors});
      }
      // init gravatar for user avatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const {name, password} = req.body;
      
      // hash the password
      bcrypt.genSalt(10, (err, salt)=> {
        bcrypt.hash(password, salt, (err, hash)=> {
          if (err) console.log(err);
          User.create({name, email, password: hash, avatar})
            .then(user=> res.json(user))
            .catch(err=> console.log('Can not create user', err))
        })
      })

    })
    .catch(err=> console.log('Can not find user', err))
});

// @route   POST api/users/login
// @desc    Login users / return JWT token
// @access  Public
router.post('/login', (req, res)=> {
  const {email, password} = req.body;
  const {errors, isValid} = validateLoginInput(req.body);

  // check validation
  if (!isValid) return res.status(400).json(errors);

  User
    .findOne({email})// search for user
    .then(user=> {

      // check if user exist
      if (!user) {
        errors.general = 'Incorrect username or password';
        return res.status(404).json(errors);
      }
      // check password (compare it with hashed one)
      bcrypt.compare(password, user.password)
        .then(isMatched=> {
          if (isMatched) {
            const {id, name, avatar} = user;

            // sign token (payloads, secretOrKey, options)
            jwt.sign({id, name, avatar}, keys.secretOrKey, {expiresIn: 60 * 60 * 24}, (err, token)=> {
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            })
          } else {
            errors.general = 'Incorrect username or password';
            res.status(400).json(errors);
          }
        })
    })
});

module.exports = router;