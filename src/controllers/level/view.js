const LevelModel = require('../../models/level'); 
const UserLevelModel = require('../../models/userLevel'); 
const { db } = require('../../../db');

module.exports = class View {
    static view (req, res) {
        const _scope = {};
        db.then(() => {

            const { levelId, categoryId } = req.query;
            const query = {};
            let queryType = 'find';

            if (categoryId) {
                query.categoryId = categoryId;
            }
            if (levelId) {
                query._id = levelId;
                queryType = 'findOne';
            }
            _scope.queryType = queryType;

            return LevelModel[queryType](query);
        })
        .then(response => {
            const errorCheck = _scope.queryType === 'find' ? response.length : response;
            
            if (!errorCheck) {
                throw 'no level found';
            }
            res.status(200).json({
                message: 'found',
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

    static viewUserLevel (req, res) {
        db.then(async () => {
            const { userId } = res.locals;
            const { categoryId } = req.params;
            if (!categoryId) {
                throw 'please provide categoryId';
            }
            const findUserLevel = await UserLevelModel.find({ categoryId,
                userId,
                status: true });

            const userLevelIds = findUserLevel.map(level => {
                return level.levelId;
            });
            const query = {};
            const _scope = {
                userTaken: []
            };
            if (userLevelIds.length) {
                const findTakenLevel = await LevelModel.find({ _id: { $in: userLevelIds } });
                _scope.userTaken = findTakenLevel.map(level => {
                    level.status = true;
                    return level;
                });
                query._id = { $ne: userLevelIds }; 
            }
            const findCategoryLevelWithoutUserLevels = await LevelModel.find(query);

            const allLevels = [
                ..._scope.userTaken,
                ...findCategoryLevelWithoutUserLevels
            ];
            return allLevels;
        })
        .then(response => {
            if (!response.length) {
                throw 'no level found';
            }
            res.status(200).json({
                message: 'found',
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