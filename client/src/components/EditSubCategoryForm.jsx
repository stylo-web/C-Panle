import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditSubCategoryForm() {
  const { id } = useParams();
  const [size, setSize] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://e-commerce-beige-three.vercel.app/api/subcategories/${id}`, {
        size,
      });
      navigate("/subcategory");
    } catch (err) {
      console.error(err);
      setError("Failed to update subcategory");
    }
  };

  return (
    <div className="ml-60 pr-64">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm my-40 mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 rounded-lg w-full"
      >
        <div>
          <h1 className=" text-center font-bold text-2xl mb-9">UPDATE SIZE </h1>
        </div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          CATEGORY
        </label>
        <select
          className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-5"
          name="finish"
          required
        >
          <option value="">Select Category</option>
          <option></option>
        </select>
        <div className="mb-5">
          <label
            htmlFor="size"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            SIZE
          </label>
          <input
            id="size"
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="bg-gray-50 border text-black border-gray-300 text-sm rounded-lg block w-full p-2.5  outline-none"
          />
        </div>
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

export default EditSubCategoryForm;
