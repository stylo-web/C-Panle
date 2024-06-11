import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Subcategory from '../models/SubCategory.js';



// Get all Subcategories for a specific Category
export const getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate('category', 'name');
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Fetch subcategories by category ID
export const getSubcategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        // const id = mongoose.Schema.ObjectId(categoryId)
        const subcategories = await Subcategory.find({ category: categoryId });
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const addSubcategory = async (req, res) => {
    try {
        const { categoryId, size } = req.body;

        // Ensure categoryId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).send({ message: 'Invalid category ID' });
        }

        const subcategory = new Subcategory({
            category: categoryId,
            size
        });

        await subcategory.save();
        res.status(201).send(subcategory);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


// Update Subcategory
// controllers/subcategoryController.js


export const updateSubcategory = async (req, res) => {
    const { subcategoryId } = req.params;
    const { size } = req.body;
    try {
        // Find the subcategory to edit and update its size
        const subcategory = await Subcategory.findByIdAndUpdate(subcategoryId, { size }, { new: true });

        if (!subcategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }
        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Delete Subcategory

export const deleteSubcategory = async (req, res) => {
    const { subcategoryId } = req.params;

    try {
        // Find the subcategory to delete
        const subcategory = await Subcategory.findById(subcategoryId);

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        // Find all categories that reference this subcategory
        const categories = await Category.find({ subcategory: subcategoryId });

        // Remove the subcategory reference from each category
        for (const category of categories) {
            category.subcategory.pull(subcategoryId);
            await category.save();
        }

        // Delete the subcategory
        await Subcategory.findByIdAndDelete(subcategoryId);

        res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
