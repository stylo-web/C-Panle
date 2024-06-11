// controllers/finishController.js

import Finish from '../models/Finish.js';
import Subcategory from '../models/SubCategory.js';

// Add Finish
export const addFinish = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        const { name, categoryId } = req.body;

        const subcategory = await Subcategory.findById(subcategoryId);
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        

        const finish = new Finish({ name, subcategory: subcategoryId, category: categoryId });
        const savedFinish = await finish.save();

        res.status(201).json(savedFinish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Finishes
export const getFinishes = async (req, res) => {
    try {
        const finishes = await Finish.find().populate('category', 'name').populate('subcategory','size');
        res.json(finishes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Fetch finishes by subcategory ID
export const getFinishesBySubcategoryId = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        const finishes = await Finish.find({ subcategory: subcategoryId });
        res.status(200).json(finishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Other existing controller functions...


// Update Finish
export const updateFinish = async (req, res) => {
    try {
        const { finishId } = req.params;
        const { name } = req.body;

        const updatedFinish = await Finish.findByIdAndUpdate(finishId, { name }, { new: true });
        if (!updatedFinish) {
            return res.status(404).json({ message: 'Finish not found' });
        }

        res.status(200).json(updatedFinish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Finish
export const deleteFinish = async (req, res) => {
    try {
        const { finishId } = req.params;

        const finish = await Finish.findById(finishId);
        if (!finish) {
            return res.status(404).json({ message: 'Finish not found' });
        }

        await Finish.findByIdAndDelete(finishId);

        res.status(200).json({ message: 'Finish deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
