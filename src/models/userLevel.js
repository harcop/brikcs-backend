const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const _schema = new Schema({
    userId: {
        type: ObjectId,
        required: [true, 'please provide user ID']
    },
    categoryId: {
        type: ObjectId,
        required: [true, 'please provide categoryId']
    },
    levelId: {
        type: ObjectId,
        required: [true, 'please provide level Id']
    },
    language: {
        type: String,
        lowercase: true,
        default: 'javascript'
    },
    functionBody: {
        type: String,
        required: [true, 'please provide function Body']
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