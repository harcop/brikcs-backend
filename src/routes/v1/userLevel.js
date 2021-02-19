const router = require('express')();
const Init = require('../../controllers/userLevel/init');

const { verifyToken } = require('../../middleware/token');

/**
 * @swagger
 * /user-level/load-user-level:
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
 *                      $ref: '#/components/schemas/create-user-level'
 */
router.post('/load-user-level', verifyToken, Init.loadUserLevel);

module.exports = router;