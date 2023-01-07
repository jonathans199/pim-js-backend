import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true },
    sku: { type: String, required: true },
    images: { type: Array },
    description: { type: String, required: true },
    price: { type: String, required: true },
    sold_on: { type: String, required: true },
    sold_price: { type: String, required: true },
    enabled: { type: Boolean, required: true },
    web_enabled: { type: Boolean, default: true, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)
