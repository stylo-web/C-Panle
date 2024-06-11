import Category from "../models/Category.js";


export const getAllData = async (req, res) => {
    try {
        const categories = await Category.find().populate({
            path: 'subcatgory',
            populate: {
                path: 'finish'
            }
        }).lean();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
