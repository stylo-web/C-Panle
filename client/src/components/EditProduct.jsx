import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    finish: "",
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [finishes, setFinishes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-beige-three.vercel.app/api/${id}/products`
        );
        const product = response.data;
        setFormData({
          category: product.category._id,
          subcategory: product.subcategory._id,
          finish: product.finish._id,
          images: product.images,
        });
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-beige-three.vercel.app/api/categories"
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-beige-three.vercel.app/api/subcategories"
        );
        setSubcategories(response.data);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
        setError("Failed to fetch subcategories");
      }
    };

    const fetchFinishes = async () => {
      try {
        const response = await axios.get("https://e-commerce-beige-three.vercel.app/api/finishes");
        setFinishes(response.data);
      } catch (err) {
        console.error("Error fetching finishes:", err);
        setError("Failed to fetch finishes");
      }
    };

    fetchProduct();
    fetchCategories();
    fetchSubcategories();
    fetchFinishes();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("category", formData.category);
    formDataObj.append("subcategory", formData.subcategory);
    formDataObj.append("finish", formData.finish);
    formData.images.forEach((image, index) => {
      formDataObj.append(`images`, image);
    });

    try {
      await axios.patch(
        `https://e-commerce-beige-three.vercel.app/api/${id}/products`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/products/all");
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product");
    }
  };

  return (
    <div className="ml-60 pr-64">
      {error && <p className="text-red-500 font-bold">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-sm my-40 mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 rounded-lg w-full"
      >
        <div>
          <h1 className=" text-center font-bold text-2xl mb-9">UPDATE PRODUCT </h1>
        </div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Category
        </label>
        <select
          id="category"
          className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-5"
          name="category"
          value={formData.category}
          onChange={handleChange}
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
          onChange={handleChange}
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

        <label className="block mb-2 text-sm font-medium text-gray-900">
          Images
        </label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none my-5"
          aria-describedby="user_avatar_help"
        />

        {formData.images.length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-gray-500">Current Images:</p>
            <div className="flex ">
              {formData.images?.map((image, index) => (
                <img
                  key={index}
                  src={`https://e-commerce-beige-three.vercel.app/uploads/${image}`}
                  alt={`Image ${index + 1}`}
                  className="w-12 h-12 rounded-lg object-cover mt-2 mr-2"
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="text-white font-medium my-4 align-middle justify-center mx-auto bg-gray-800 hover:bg-gray-700 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-gray-700 me-2 mb-2"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
