import { Router } from 'express'
import { auth } from '../middleware/auth'
import { createUser, getUsers, login, updateUser, disableUser } from '../controllers/userController.js'

const router = Router()

/**
 * @swagger
 * /signup:
 *  post:
 *    description: create a new user
 *    parameters:
 *    -  name: title
 *       description: title
 *       in: formData
 *       required: true
 *       type: String
 *    responses:
 *    201:
 *      description: Created
 */
router.route('/create').post(createUser)

/**
 * @swagger
 * /login:
 *  post:
 *    description: sign up a new user
 *    parameters:
 *    -  name: title
 *       description: title
 *       in: formData
 *       required: true
 *       type: String
 *    responses:
 *    201:
 *      description: Created
 */
router.route('/login').post(login)

/**
 * @swagger
 * /update:
 *  patch:
 *    description: sign up a new user
 *    parameters:
 *    -  name: title
 *       description: title
 *       in: formData
 *       required: true
 *       type: String
 *    responses:
 *    201:
 *      description: Created
 */
router.route('/update').patch(auth, updateUser)

/**
 * @swagger
 * /disable/:user_id:
 *  patch:
 *    description: sign up a new user
 *    parameters:
 *    -  name: title
 *       description: title
 *       in: formData
 *       required: true
 *       type: String
 *    responses:
 *    201:
 *      description: Created
 */
router.route('/disable/:user_id').patch(auth, disableUser)

/**
 * @swagger
 * /:
 *  get:
 *    description: Get all users
 *    security:
 *      - bearerAuth: []
 *    authorization: test
 *    responses:
 *      200:
 *        description: Success
 */
router.route('/').get(auth, getUsers)

export default router
