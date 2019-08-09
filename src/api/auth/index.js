'use strict'

import controllers from './controllers'
import passport from 'passport'

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []
 * /api/auth/login:
 *   post:
 *     tags:
 *       - public
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: email
 *         description: email to use for login.
 *         required: true
 *         schema:
 *           type: string
 *           example: admin@super.com
 *       - in: body
 *         name: password
 *         description: User's password.
 *         required: true
 *         schema:
 *           type: string
 *           example: a23456
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request from client
 *       404:
 *         description: Resource not found
 *       403:
 *         description: Forbidden access
 *       401:
 *         description: Need authorization
 *       500:
 *         description: Server error
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - public
 *     description: Register to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: firstName
 *         description: first name of user.
 *         required: true
 *         schema:
 *           type: string
 *           example: Ramadhani
 *       - in: body
 *         name: lastName
 *         description: last name of user.
 *         required: false
 *         schema:
 *           type: string
 *           example: Putri
 *       - in: body
 *         name: username
 *         description: username of user(will show to public).
 *         required: true
 *         schema:
 *           type: string
 *           example: ramadhani.putri
 *       - in: body
 *         name: phone
 *         description: phone number of user.
 *         required: true
 *         schema:
 *           type: string
 *           example: +6285245754
 *       - in: body
 *         name: email
 *         description: email to use for login.
 *         required: true
 *         schema:
 *           type: string
 *           example: admin@super.com
 *       - in: body
 *         name: password
 *         description: User's password.
 *         required: true
 *         schema:
 *           type: string
 *           example: ab23456
 */

export default (app) => {
  app.post('/auth/signup', controllers.signup)
  app.post('/auth/login', controllers.login)
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }))
  return app
}
