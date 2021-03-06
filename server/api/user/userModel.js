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
        select: false
    },

    email: {
        type: String,
        select: false
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
        default: 'http://localhost:5000/default-avatar.jpg'
    },

    resetPasswordToken: {
        type: String,
        select: false
    },

    resetPasswordTokenExpiration: {
        type: Date,
        select: false
    }, 

    googleId: {
        type: String,
        select: false
    }
   
});


UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = this.encryptPassword(this.password);
    next();
});

UserSchema.post('save', function(error, doc, next) {
    if (error.name === 'BulkWriteError' && error.code === 11000) {
        return next(new Error('Duplicate username'));
    }
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
