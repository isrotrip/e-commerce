const jsonwebtoken = require('../helpers/jsonwebtoken.js');
const User = require('../models/user');
const Item = require('../models/items.js');
const Cart = require('../models/carts.js');

module.exports = {
  authenticated: function(req, res, next) {
    if(!req.headers.token){
      res.status(400).json({error: 'please login first'})
    }
    else {
      const user = jsonwebtoken.verify(req.headers.token);
      User
        .findOne({
          email: user.email 
        })
        .then(user => {
          if(user === null){
            res.status(400).json({error: 'invalid token error'})
          } else {
            next()
          }
        })
        .catch(error => {
          res.status(500).json({error: error.message})
        })
    }
  },
  
  authorizated: function(req, res, next) {
    const user = jsonwebtoken.verify(req.headers.token);
    Cart
      .findById(req.params.id)
      .then(cart => {
        if(cart.userId.toString() === user._id.toString()){
          next()
        } else {
          res.status(400).json({error: 'not authorizated to use this feature'})
        }
      })
      .catch(error => {
        res.status(500).json({error: error.message})
      })
  },

  adminSection: function(req, res, next) {
    let user = jsonwebtoken.verify(req.headers.token);
    User
      .findOne({
        email: user.email 
      })
      .then(user => {
        if(user.role !== 'Admin'){
          res.status(400).json({error: 'only admin that can use this feature'})
        } else {
          next()
        }
      })
      .catch(error => {
        res.status(500).json({error: error.message})
      })
  }
}