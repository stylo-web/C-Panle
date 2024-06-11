import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
    category: {
        type: String || mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      },
      size: {
        type: String,
        required: true
      }
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);
export default Subcategory;
