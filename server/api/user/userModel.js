const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    bio: {
        type: String
    },

    memberSince: {
        type: Date,
        default: Date.now
    },

    avatar: {
        type: String,
        default: null
    },

    resetPasswordToken: {
        type: String
    },

    resetPasswordTokenExpiration: {
        type: Date
    }
   
});


UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = this.encryptPassword(this.password);
    next();
});
  
  
UserSchema.methods = {
    // check the passwords on signin
    authenticate: function(plainTextPword) {
        return bcrypt.compareSync(plainTextPword, this.password);
    },
    // hash the passwords
    encryptPassword: function(plainTextPword) {
        if (!plainTextPword) {
            return ''
        } else {
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainTextPword, salt);
        }
    }
};


module.exports = mongoose.model('user', UserSchema);
