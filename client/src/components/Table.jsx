import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Table() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-beige-three.vercel.app/api/categories"
        );
        setCategories(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`https://e-commerce-beige-three.vercel.app/api/categories/${categoryId}`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to delete category");
    }
  };

  const handleEdit = (categoryId) => {
    navigate(`/editcategory/${categoryId}`);
  };

  return (
    <>
      <div>
        <div className="text-center align-middle justify-center">
          <NavLink
            to="/addcategory"
            className="text-white font-medium my-4 align-middle justify-center mx-auto bg-gray-800 hover:bg-gray-700 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-gray-700 me-2 mb-2"
          >
            ADD NEW CATEGORY
          </NavLink>
        </div>
        {error && <p className="text-center text-red-500 font-bold">{error}</p>}
        <div className="relative mt-6 overflow-x-auto sm:rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sr.No
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr
                  key={category._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">
                    {index + 1}
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {category.name}
                  </th>
                  <td className="px-6 py-4">
                    {category?.image && (
                      <img
                        src={`https://e-commerce-beige-three.vercel.app/uploads/${category.image}`}
                        alt={category.name}
                        className="w-8 h-8 rounded-lg"
                      />
                    )}
                  </td>
                  <td className="flex items-center text-center px-6 py-4">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEdit(category._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ms-6"
                      onClick={() => handleDelete(category._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
