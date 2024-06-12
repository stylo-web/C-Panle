import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProductForm() {
  const { productId } = useParams();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [finishes, setFinishes] = useState([]);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    finish: "",
    images: [],
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get(
          "https://e-commerce-beige-three.vercel.app/api/categories"
        );
        setCategories(categoryResponse.data);

      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, [ productId]);

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setFormData({
      ...formData,
      category: categoryId,
      subcategory: "",
      finish: "",
    });
    try {
      const subcategoryResponse = await axios.get(
        `https://e-commerce-beige-three.vercel.app/api/${categoryId}`
      );
      setSubcategories(subcategoryResponse.data);
      setFinishes([]);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch subcategories");
    }
  };

  const handleSubcategoryChange = async (e) => {
    const subcategoryId = e.target.value;
    setFormData({ ...formData, subcategory: subcategoryId, finish: "" });
    try {
      const finishResponse = await axios.get(
        `https://e-commerce-beige-three.vercel.app/api/${subcategoryId}/finishes`
      );
      setFinishes(finishResponse.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch finishes");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("category", formData.category);
      formDataToSubmit.append("subcategory", formData.subcategory);
      formDataToSubmit.append("finish", formData.finish);
      formData.images.forEach((file) => {
        formDataToSubmit.append("images", file);
      });

      await axios.post("https://e-commerce-beige-three.vercel.app/api/products", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Form submitted successfully");
      navigate("/products/all");
    } catch (err) {
      console.error(err);
      setError("Failed to submit the form");
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 font-bold">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-sm my-14 mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 rounded-lg w-full"
      >
        <div>
          <h1 className=" text-center font-bold text-2xl mb-9">PRODUCT</h1>
        </div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Category
        </label>
        <select
          id="category"
          className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-5"
          name="category"
          value={formData.category}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 text-sm font-medium text-gray-900">
          Subcategory
        </label>
        <select
          className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-5"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleSubcategoryChange}
          required
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>
              {subcategory.size}
            </option>
          ))}
        </select>

        <label className="block mb-2 text-sm font-medium text-gray-900">
          Finish
        </label>
        <select
          className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-5"
          name="finish"
          value={formData.finish}
          onChange={handleChange}
          required
        >
          <option value="">Select Finish</option>
          {finishes.map((finish) => (
            <option key={finish._id} value={finish._id}>
              {finish.name}
            </option>
          ))}
        </select>

        <label className="block text-sm font-medium text-gray-900">
          Images
        </label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none my-5"
          aria-describedby="user_avatar_help"
        />

        <button
          type="submit"
          className="text-white font-medium my-4 align-middle justify-center mx-auto bg-gray-800 hover:bg-[#24292F]/60 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
