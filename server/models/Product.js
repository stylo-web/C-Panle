import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true,
    },
    finish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Finish',
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    // singleImage: {
    //     type: String,
    //     required: true
    // }

});

const Product = mongoose.model('Product', productSchema);
export default Product;
