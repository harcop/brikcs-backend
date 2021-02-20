const router = require('express')();
const Init = require('../../controllers/category/init');
const View = require('../../controllers/category/view');

const { verifyToken } = require('../../middleware/token');

/**
 * @swagger
 * /category/create-category:
 *  post:
 *      security:
 *          - BearerAuth: []
 *      summary: api to create category in to the system
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: error
 *          403:
 *              description: forbidden
 *      requestBody:
 *          description: category details
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/create-category'
 */
router.post('/create-category', Init.createCategory);


/**
 * @swagger
 * /category/view?categoryId:
 *  get:
 *      parameters:
 *          - in: query
 *            name: categoryId
 *      security:
 *          - BearerAuth: []
 *      summary: api to view category in to the system
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: error
 *          403:
 *              description: forbidden
 */
router.get('/view', View.view);

module.exports = router;