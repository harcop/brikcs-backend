const { Schema, model } = require('mongoose');

const _schema = new Schema({
    email: {
        type: String,
        lowercase: true,
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});


_schema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
};

module.exports = model('User', _schema);