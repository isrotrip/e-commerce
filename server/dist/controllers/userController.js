const User = require('../models/user');
const hashPassword = require('../helpers/hashPassword');
const jsonwebtoken = require('../helpers/jsonwebtoken');

class UserController {
  static login(req,res){
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if(!user) {
          res.status(400).json({error: 'Wrong email'});
        } else if(user.password !== hashPassword(req.body.password)){
          res.status(400).json({error: 'Wrong password'});
        } else {
          const token = jsonwebtoken.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          })
          user.status = true;
          user.save();
          res.status(200).json({
            message: `Welcome ${user.role} ${user.name}`,
            token: token,
            isLogin: user.status
          })
        }
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }

  static registerCustomer(req,res){
    if(!req.body.password) {
      res.status(500).json({error: 'Please Input Your Password'});
    }
    else {
      User
      .create({
        name: req.body.name,
        email: req.body.email,
        deposit: 0,
        password: hashPassword(req.body.password),
        created_at: new Date,
        status: false,
        role: 'Customer'
      })
      .then(user => {
          const successMessage = {
            message: `${user.email} have been registered successfully`,
            statusCode: 201
          }
          res.status(201).json(successMessage);
        })
        .catch(err => {
          res.status(500).json({error: err.message});
        })
    }
  }

  static registerAdmin(req,res){
    User
      .create({
        name: req.body.name,
        email: req.body.email,
        deposit: 0,
        password: hashPassword(req.body.password),
        created_at: new Date,
        status: false,
        role: 'Admin'
      })
      .then(user => {
        const successMessage = {
          message: `${user.email} have been registered successfully`,
          statusCode: 201
        }
        res.status(201).json(successMessage);
      })
      .catch(err => {
        const errorMessage = {
          error: err.message
        }
        res.status(500).json(errorMessage);
      })
  }

  static checkAllSignInCustomers(req,res){
    User
      .find({
        where: {
          status: true
        }
      })
      .then(users => {
        if(users){
          res.status(200).json(users);
        } else {
          res.status(200).json(null)
        }
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      })
  }
}

module.exports = UserController;