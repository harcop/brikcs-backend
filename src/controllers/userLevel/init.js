const UserLevelModel = require('../../models/userLevel'); 
const { db } = require('../../../db');

module.exports = class Init {
    static loadUserLevel (req, res) {
        db.then(async () => {
            const { userId } = res.locals;
            console.log(userId, 'this is userID');
            const { levelId, language, codeBody, queryType } = req.body;
            const query = { 
                userId,
                levelId,
                language 
            };

            //check if relation exists
            const findUserLevelId = await UserLevelModel.findOne(query);

            if (!findUserLevelId) {
                const _UserLevel = new UserLevelModel({
                    ...req.body,
                    userId
                });
                return _UserLevel.save({ validateBeforeSave: false }); 
            }

            if (queryType === 'save') {
                return UserLevelModel.findOneAndUpdate(query, { codeBody }, { new: true }); 
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