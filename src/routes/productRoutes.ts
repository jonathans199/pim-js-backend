import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import { addProduct, disableProduct, getProducts, updateProduct } from '../controllers/productController.js'

const router = Router()

router.route('/create').post(auth, addProduct)
router.route('/update').patch(auth, updateProduct)
router.route('/disable/:product_id').patch(auth, disableProduct)
router.route('/').get(auth, getProducts)

export default router
