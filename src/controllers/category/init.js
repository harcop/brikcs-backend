const CategoryModel = require('../../models/category'); 
const { db } = require('../../../db');

module.exports = class Init {
    static createCategory (req, res) {
        db.then(async () => {
            const { name } = req.body;
            //check if name doesn't exist
            const checkName = await CategoryModel.exists({ name });
            
            if (checkName) {
                throw 'name already exists';
            }

            const _category = new CategoryModel({
                ...req.body
            });
            return _category.save({ validateBeforeSave: false });
        })
        .then(response => {
            if (!response) {
                throw 'error creating category';
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