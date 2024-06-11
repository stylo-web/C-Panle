import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CategoryForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "/api/categories",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Category added successfully");
      setName("");
      setImage(null);
      navigate("/");
    } catch (error) {
      setMessage("Error adding category");
    }
  };

  return (
    <>
      <div className="ml-60 pr-64">
        <form
          onSubmit={handleSubmit}
          className="max-w-sm my-40 mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 rounded-lg w-full"
        >
          <div>
            <h1 className=" text-center font-bold text-2xl mb-9">CATEGORY</h1>
          </div>
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
          </div>

          <button
            type="submit"
            className="text-white font-medium my-4 align-middle justify-center mx-auto bg-gray-800 hover:bg-[#24292F]/60 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/30 me-2 mb-2 mt-6"
          >
            SUBMIT
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default CategoryForm;
