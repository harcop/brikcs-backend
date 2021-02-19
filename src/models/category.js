const { Schema, model } = require('mongoose');

const _schema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'please provide name']
    },
    mode: {
        type: String,
        lowercase: true,
        enum: ['easy', 'medium', 'hard'],
        required: [true, 'please provide mode']
    },
    status: {
        type: Boolean,
        default: false // indicate if the category is available
    },
    icon: {
        type: String
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

module.exports = model('Category', _schema);
// Algorithm, git, firebase