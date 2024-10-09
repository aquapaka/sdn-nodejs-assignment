import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  products: [{type: mongoose.Types.ObjectId, ref: 'Product'}]
}, {
  timestamps: true
})

const Categories = mongoose.model("Category", categorySchema);

export default Categories;
