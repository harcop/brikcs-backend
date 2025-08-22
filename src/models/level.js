const { Schema, model } = require('mongoose');
const { ObjectId, Mixed } = Schema.Types;

const _schema = new Schema({
    categoryId: {
        type: ObjectId,
        lowercase: true,
        required: [true, 'please provide categoryId']
    },
    title: {
        type: String,
        lowercase: true,
        required: [true, 'please provide title']
    },
    mode: {
        type: String,
        lowercase: true,
        enum: ['easy', 'medium', 'hard']
    },
    rate: {
        type: Number,
        default: 1
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
    functionBody: {
        type: String,
        required: [true, 'please provide function body'] // helloWorld() {}
    },
    hints: [{
        type: String
    }],
    constrains: [{
        type: String
    }],
    testCases: [{
        type: new Schema({
            input: [{
                type: Mixed
            }],
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
    // delete obj.testCases;
    return obj;
};

module.exports = model('Level', _schema);