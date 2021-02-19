const CategoryModel = require('../../models/category'); 
const { db } = require('../../../db');

module.exports = class View {
    static view (req, res) {
        const _scope = {};
        
        db.then(() => {

            const { category } = req.query;
            const query = {};
            let queryType = 'find';

            if (category) {
                query.categoryId = category;
                queryType = 'findOne';
            }
            return CategoryModel[queryType](query);
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
};