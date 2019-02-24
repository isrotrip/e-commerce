const Cart = require('../models/carts');
const Item = require('../models/items');
const jsonwebtoken = require('../helpers/jsonwebtoken');

class CartController {
  static add(req,res){
    const user = jsonwebtoken.verify(req.headers.token);
    let itemName = '';
    Item
      .findById(req.body.item.itemId)
      .then((item) => {
        if(item){
          if(item.amount < req.body.item.qty){
            res.status(400).json({
              error: `Stock amount of ${item.name} is less then item that customer want to buy`,
              itemName: item.name
            })
          } else {
            itemName = item.name
            return Cart
              .create({
                item: {
                  itemId: item._id,
                  qty: req.body.item.qty
                },
                userId: user._id
              })
              .then(cart => {
                item.amount -= req.body.item.qty;
                item.save();
                res.status(201).json({
                  message: `${itemName} has been added into your cart`,
                  data: cart,
                  itemName: itemName
                });
              })
          }
        }
        else {
          res.status(400).json({error: `Sorry item with id ${req.body.item.itemId} is not available`})
        }
      })
      .catch(error => {
        res.status(500).json({error: error.message});
      })
  }

  static remove(req,res){
    Item
      .findById(req.params.itemId)
      .then(item => {
        if(item) {
          return Cart
            .findByIdAndDelete(req.params.id)
            .then(cart => {
              if(cart) {
                item.amount += cart.item.qty;
                item.save();
                res.status(200).json({
                  message: `Item ${item.name} has been removed from your cart`,
                  data: cart,
                  itemName: item.name
                });
              }
              else {
                res.status(400).json({
                  message: `Cart isn't found`
                })
              }
            })
        }
        else {
          req.status(400).json({
            error: `There isn't item with id ${req.params.itemId} in this store`});
        }
      })
      .catch(error => {
        res.status(500).json({error: error.message});
      })
  }

  static update(req,res){
    Item
      .findById(req.params.itemId)
      .then(item => {
        if(item){
          return Cart
            .findById(req.params.id)
            .then(cart => {
              if(cart){
                item.amount += cart.item.qty;
                if(item.amount < req.body.item.qty){
                  res.status(400).json({
                    error: `Stock amount of ${item.name} is less then item that customer want to update`,
                    itemName: item.name
                  })
                }
                else {
                  item.amount -= req.body.item.qty;
                  item.save();
                  cart.item.qty = req.body.item.qty;
                  cart.save();
                  res.status(200).json({
                    message: `Item ${item.name} has been updated from your cart`,
                    data: cart,
                    itemName: item.name
                  });
                }
              }
              else {
                res.status(400).json({
                  message: `Cart isn't found`
                })
              }
            })
        }
        else {
          res.status(400).json({
            error: `There isn't item with id ${req.params.itemId} in this store`
          })
        }
      })
      .catch(error => {
        res.status(500).json({error: error.message})
      })
  }

  static read(req, res){
    const user = jsonwebtoken.verify(req.headers.token);
    Cart
      .find({
        userId: user._id
      })
      .then(carts => {
        res.status(200).json({data: carts});
      })
      .catch(error => {
        res.status(500).json({error: error.message});
      })
  }
}

module.exports = CartController;