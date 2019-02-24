const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name:{
        type:String,
        required:[true, 'Please Input Your Name']
    },
    email:{
        type:String,
        required:[true, 'Please Input Your Email'],
        validate:[{
            validator: function(v){
                return User
                .findOne({
                    email: v
                })
                .then(user => {
                    if(!user){
                        return true;
                    }
                    else {
                        if(user._id.toString() === this._id.toString()){
                            return true;
                        }
                        return false;
                    }
                })
                .catch(err => {
                    return false;
                })
            }, message: `email had been taken`
        }, {
        validator: function(v) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(v).toLowerCase());   
            }, message: 'wrong email format'
        }]
    },
    deposit:Number,
    password:{
        type:String
    },
    created_at:Date,
    status:Boolean,
    role:String
})



const User = mongoose.model('User', userSchema);

module.exports = User;