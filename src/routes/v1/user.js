const router = require('express')();
const Init = require('../../controllers/user/init');

/**
 * @swagger
 * /user/load-user:
 *  post:
 *      security:
 *          - BearerAuth: []
 *      summary: api to load user in to the system
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: error
 *          403:
 *              description: forbidden
 *      requestBody:
 *          description: user details
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          email:
 *                              type: string
 *                              required: true
 */
router.post('/load-user', Init.loadUser);

module.exports = router;