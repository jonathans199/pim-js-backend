import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, default: 'user', required: true },
    department: { type: String, required: true },
    username: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    status: { type: String, default: 'Pending', required: true },
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
