import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/categoryService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubCategoryForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [finishname, setFinishname] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
        if (categories) {
          const subcategories = await axios.get(
            `https://e-commerce-beige-three.vercel.app/api/${selectedCategory}`
          );
          setSubcategories(subcategories.data);
        }
      } catch (error) {
        console.log("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, [selectedCategory, selectedSubcategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `https://e-commerce-beige-three.vercel.app/api/${selectedSubcategory}/finishes`,
        {
          name: finishname,
          subcategoryId: selectedSubcategory,
          categoryId: selectedCategory,
        }
      );
      setFinishname("");
      setSelectedCategory("");
      setSelectedSubcategory("");

      navigate("/finishes");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm my-40 mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 rounded-lg w-full"
      >
        <h1 className=" text-center font-bold text-2xl mb-9">FINISH</h1>
        <div>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            SELECT AN OPTION
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            id="category"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-5"
          >
            <option value="">Choose a category</option>
            {categories &&
              categories.map((category) => (
                <option
                  className=" m-4 font-bold"
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}
          </select>
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            id="category"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-5"
          >
            <option value="">Choose a category</option>

            {subcategories &&
              subcategories.map((subcategory) => (
                <option
                  className=" m-4 font-bold"
                  key={subcategory._id}
                  value={subcategory._id}
                >
                  {subcategory.size}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="finish"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            FINISH
          </label>
          <input
            id="size"
            value={finishname}
            onChange={(e) => setFinishname(e.target.value)}
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
