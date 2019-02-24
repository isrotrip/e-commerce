const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema ({
    name:{
        type:String,
        required:[true, 'Please Input Item Name'],
        validate: {
            validator: function(v){
                return Item
                    .findOne({name: v})
                    .then(item => {
                        if(!item){
                            return true
                        } else {
                            if(item._id.toString() === this._id.toString()){
                                return true
                            }
                            else{
                                return false
                            }
                        }
                    })
                    .catch(err => {
                        return true
                    })
            },
            message: 'have been added, please update to change'
        }
    },
    amount:{
        type:Number,
        required:[function(){
            return this.amount > -1
        }, 'Cannot be minus amount']
    },
    price:{
        type:Number,
        required:[function(){
            return this.price > 0
        }, 'Please Input Item Price']
    },
    picture:{
        type:String
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;