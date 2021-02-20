const UserLevelModel = require('../../models/userLevel'); 
const LevelModel = require('../../models/level'); 
const { db } = require('../../../db');

module.exports = class Init {
    static loadUserLevel (req, res) {
        db.then(async () => {
            const { userId } = res.locals;
            const { levelId, functionBody, queryType } = req.body;
            const query = { 
                userId,
                levelId
            };

            //check if relation exists
            const findUserLevelId = await UserLevelModel.findOne(query);

            if (!findUserLevelId) {
                const findLevel = await LevelModel.findOne({ _id: levelId }).lean();
                const { functionBody: newFunctionBody } = findLevel;

                const _UserLevel = new UserLevelModel({
                    ...req.body,
                    userId,
                    functionBody: newFunctionBody
                });
                return _UserLevel.save({ validateBeforeSave: false }); 
            }

            if (queryType === 'save') {
                return UserLevelModel.findOneAndUpdate(query, { functionBody }, { new: true }); 
            } else if (queryType === 'load') {
                return UserLevelModel.findOne(query);
            } 
            return false;
        })
        .then(response => {
            if (!response) {
                throw 'error creating UserLevel';
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