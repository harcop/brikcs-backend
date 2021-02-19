const LevelModel = require('../../models/level'); 
const { db } = require('../../../db');

module.exports = class Init {
    static createLevel (req, res) {
        db.then(() => {
            const { name } = req.body;
            //check if name doesn't exist
            const _level = new LevelModel({
                ...req.body
            });
            return _level.save({ validateBeforeSave: false });
        })
        .then(response => {
            if (!response) {
                throw 'error creating level';
            }
            res.status(200).json({
                message: 'done',
                response
            });
        })
        .catch(message => {
            res.status(404).json({
                error: true,
                message
            });
        });
    }
};