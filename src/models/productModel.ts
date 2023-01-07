import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    product_id: { type: Number, required: true },
    sku: { type: String, required: true },
    created_by: { type: Object, required: true },
    updated_by: { type: { user_id: Number, username: String } },
    images: { type: Array },
    description: { type: String, required: true },
    price: { type: String, required: true },
    in_stock: { type: Number, default: 0 },
    sold_price: { type: String },
    enabled: { type: Boolean, default: false, required: true },
    web_enabled: { type: Boolean, default: true, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)
