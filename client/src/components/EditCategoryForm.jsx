import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCategoryForm() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `/api/categories/${id}`
        );
        const category = response.data.category;
        setFormdata(category);
        setName(category.name); // Pre-fill the name field
      } catch (err) {
        console.error("Error fetching category:", err);
        setError("Failed to fetch category");
      }
    };
    fetchCategory();
  }, [id]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.patch(
        `/api/categories/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to update category");
    }
  };

  return (
    <div className="ml-60 pr-64">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm my-40 mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 rounded-lg w-full"
      >
        <h1 className=" text-center font-bold text-2xl mb-9">
          UPDATE CATEGORY
        </h1>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            CATEGORY NAME
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            id="name"
            className="bg-gray-50 border text-black border-gray-300 text-sm rounded-lg block w-full p-2.5  outline-none"
          />
        </div>

        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="user_avatar"
          >
            UPLOAD FILE
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
            aria-describedby="user_avatar_help"
            id="user_avatar"
          />
          {formdata.image && (
            <div className="mt-3">
              <lable className="block mb-2 text-sm font-medium text-gray-900">CURRENT IMAGE:</lable>
              <img
                src={`/uploads/${formdata.image}`}
                alt="Current Category"
                className="w-24 h-24 object-cover rounded-lg mt-2"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="text-white font-medium my-4 align-middle justify-center mx-auto bg-gray-800 hover:bg-gray-700 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-gray-700 me-2 mb-2"
        >
          SUBMIT
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default EditCategoryForm;
