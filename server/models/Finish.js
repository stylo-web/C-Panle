import mongoose from 'mongoose';

const finisheschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    
});

const Finish = mongoose.model('Finish', finisheschema);
export default Finish;



