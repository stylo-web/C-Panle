import Category from "../models/Category.js";
import fs from 'fs/promises';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const imagePath = req.file.path; // assuming you are using a middleware like multer for file uploads

        // Extract the original filename
        const imageName = path.basename(imagePath);

        const newCategory = new Category({ name, image: imageName });
        const savedCategory = await newCategory.save();

        res.status(201).json({ message: 'Category added successfully', category: savedCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Category
export const getCategory = async (req, res) => {
    try {
        const category = await Category.find();

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Category by ID
export const getSingleCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Delete category image from uploads folder if it exists
        if (category.image) {
            try {
                await fs.unlink(path.join(__dirname, '../uploads', category.image));
            } catch (error) {
                console.error(`Failed to delete image file: ${error.message}`);
            }
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Edit Category
export const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updateData = { name };

        // Find the existing category to get the old image
        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // If there's a new image file, update the image and delete the old one
        if (req.file) {
            const imageName = path.basename(req.file.path);
            updateData.image = imageName;

            // Delete the old image file if it exists
            if (existingCategory.image) {
                const oldImagePath = path.join(__dirname, '..', 'uploads', existingCategory.image);
                try {
                    await fs.unlink(oldImagePath);
                } catch (error) {
                    console.error(`Failed to delete old image file: ${error.message}`);
                }
            }
        }

        // Update the category
        const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

