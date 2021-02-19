const { Schema, model } = require('mongoose');
const { ObjectId, Mixed } = Schema.Types;

const _schema = new Schema({
    categoryId: {
        type: ObjectId,
        lowercase: true,
    },
    name: {
        type: String,
        lowercase: true,
    },
    mode: {
        type: String,
        lowercase: true,
        enum: ['easy', 'medium', 'hard']
    },
    status: {
        type: Boolean,
        default: false // indicate if the question is available
    },
    questionBody: {
        type: String,
        required: [true, 'please provide question body']
    },
    functionName: {
        type: String,
        required: [true, 'please provide function name'] // helloWorld()
    },
    testCases: [{
        type: new Schema({
            input: Mixed,
            expected: Mixed
        })
    }]
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
    // delete obj.functionName;
    delete obj.testCases;
    return obj;
};

module.exports = model('Level', _schema);