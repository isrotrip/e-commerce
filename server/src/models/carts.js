const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema ({
    item: {
        itemId: 
        {
            type: Schema.Types.ObjectId, ref: 'Item'
        }, 
        qty: {
            type: Number, required: [function(){
                if(this.item.qty > 0 ? true : false) {
                    return true
                }
                else {
                    throw 'quantity must be higher than 0'
                }
            }]}},
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;