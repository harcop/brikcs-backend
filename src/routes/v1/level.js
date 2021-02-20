const router = require('express')();
const Init = require('../../controllers/level/init');
const View = require('../../controllers/level/view');

const { verifyToken } = require('../../middleware/token');

/**
 * @swagger
 * /level/create-level:
 *  post:
 *      security:
 *          - BearerAuth: []
 *      summary: api to create level in to the system
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: error
 *          403:
 *              description: forbidden
 *      requestBody:
 *          description: level details
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/create-level'
 */
router.post('/create-level', Init.createLevel);


/**
 * @swagger
 * /level/view?categoryId?levelId:
 *  get:
 *      parameters:
 *          - in: query
 *            name: categoryId
 *          - in: query
 *            name: levelId
 *      security:
 *          - BearerAuth: []
 *      summary: api to view level in the system
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: error
 *          403:
 *              description: forbidden
 */
router.get('/view', verifyToken, View.view);


/**
 * @swagger
 * /level/view-user-level/{categoryId}:
 *  get:
 *      parameters:
 *          - in: path
 *            name: categoryId
 *            required: true
 *      security:
 *          - BearerAuth: []
 *      summary: api to view user level in the system
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: error
 *          403:
 *              description: forbidden
 */
router.get('/view-user-level/:categoryId', verifyToken, View.viewUserLevel);


router.post('/load-level', Init.loadLevel);
module.exports = router;