import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import { addProduct, disableProduct, getProducts, updateProduct } from '../controllers/productController.js'

const router = Router()

router.route('/new').post(auth, addProduct)
router.route('/update').patch(auth, updateProduct)
router.route('/disable/:ProductId').patch(auth, disableProduct)
router.route('/').get(auth, getProducts)

export default router
