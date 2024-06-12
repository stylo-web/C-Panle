import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/categoryService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubCategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [size, setSize] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.log("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `https://e-commerce-beige-three.vercel.app/api/${selectedCategory}/subcategories`,
        { categoryId: selectedCategory, size }
      );
      console.log("Subcategory added successfully");
      setSize("");
      setSelectedCategory("");
      navigate("/subcategory");
    } catch (error) {
      console.log("Failed to add subcategory:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm my-40 mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 rounded-lg w-full"
      >
        <h1 className=" text-center font-bold text-2xl mb-9">SUBCATEGORY</h1>
        <div>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            SELECT AN OPTION
          </label>
          <select
            value={selectedCategory._id}
            onChange={(e) => setSelectedCategory(e.target.value)}
            id="category"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-5"
          >
            <option value="">Choose a category</option>
            {categories.map((category) => (
              <option
                className=" m-4 font-bold"
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor=""
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            SIZE
          </label>
          <input
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="bg-gray-50 border text-black border-gray-300 text-sm rounded-lg block w-full p-2.5  outline-none"
          />
        </div>
        <button
          type="submit"
          className="text-white font-medium my-4 align-middle justify-center mx-auto bg-gray-800 hover:bg-[#24292F]/60 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default SubCategoryForm;
