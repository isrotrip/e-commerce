const item = require('../models/items');

class ItemController {
  static uploadPhoto(req, res){
    if(req.file.cloudStoragePublicUrl){
      res.status(201).send({pictureUrl: req.file.cloudStoragePublicUrl})
    }
    else {
      res.status(500).send({error: 'internal server error'})
    }
  }

  static add(req,res){
    item
      .create({
        name: req.body.name,
        amount: req.body.amount,
        price: req.body.price,
        picture: req.body.picture
      })
      .then(item => {
        res.status(201).json({
          message: `${req.body.name} has been added by ${req.body.amount}. The current stock are ${item.amount}`,
          data: item
        });
      }) 
      .catch(error => {
        res.status(500).json({error: error.message});
      })
  }

  static read(req,res){
    item
      .find()
      .then(data => {
        if(data){
          res.status(200).json({
            message: data
          });
        }
        else {
          res.status(400).json({
            error: `data isn't available`
          })
        }
      })
      .catch(error => {
        res.status(500).json({error: error.message});
      })
  }

  static remove(req,res){
    item
      .findByIdAndDelete(req.params.id)
      .then(data => {
        if(data){
          const deleteMessage = {
            message: `${data.name} has been successfully deleted`,
            data: data
          }
          res.status(200).json(deleteMessage);
        }
        else {
          res.status(400).json({error: `data isn't available`})
        }
      })
      .catch(error => {
        res.status(500).json({error: error.message});
      })
  }

  static update(req,res){
    item
      .findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        amount: req.body.amount,
        price: req.body.price,
        picture: req.body.picture
      })
      .then(item => {
        if(item){
          let newData = {
            _id: item.id,
            name: req.body.name,
            price: req.body.price,
            picture: req.body.picture
          } 
          res.status(200).json({
            message: `${item.name} has been updated. The current stock are ${req.body.amount}`,
            oldData: item,
            newData: newData
          });
        }
        else {
          res.status(400).json({error: `data isn't available`})
        }
      })
      .catch(error => {
        res.status(200).json(error);
      })
  }

}

module.exports = ItemController;