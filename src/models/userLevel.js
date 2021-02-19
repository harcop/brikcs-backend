const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const _schema = new Schema({
    userId: {
        type: ObjectId
    },
    categoryId: {
        type: ObjectId
    },
    levelId: {
        type: ObjectId
    },
    language: {
        type: String,
        lowercase: true
    },
    codeBody: {
        type: String
    },
    status: {
        type: Boolean,
        default: false // indicate if the question has been solved
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

module.exports = model('UserLevel', _schema);