const router = require('express')();
const Challenge = require('../../controllers/challenge/init');

const { verifyToken } = require('../../middleware/token');

/**
 * @swagger
 * /challenge/solve:
 *  post:
 *      security:
 *          - BearerAuth: []
 *      summary: api to solve the problem
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
 *                      $ref: '#/components/schemas/solve-challenge'
 */
router.post('/solve', verifyToken, Challenge.solve);


module.exports = router;