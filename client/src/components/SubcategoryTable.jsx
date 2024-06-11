import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function SubcategoryTable() {
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const location = useLocation();
  // const { categoryId, subcategoryId } = useParams();
  // const [subcategory, setSubcategory] = useState(location.state.subcategory);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          "/api/subcategories"
        );
        setSubcategories(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch subcategories");
      }
    };

    fetchSubcategories();
  }, []);

  const handleDelete = async (subcategoryId) => {
    try {
      await axios.delete(
        `/api/subcategories/${subcategoryId}`
      );
      setSubcategories(
        subcategories.filter((subcategory) => subcategory._id !== subcategoryId)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to delete subcategory");
    }
  };

  const handleEdit = (subcategoryId) => {
    navigate(`/editsubcategory/${subcategoryId}`);
  };

  return (
    <>
    
      {error && <p className=" text-center text-red-500 font-bold">{error}</p>}
      <NavLink
          to="/addsubcategory"
          className="text-white font-medium my-4 align-middle justify-center mx-auto bg-gray-800 hover:bg-gray-700 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-gray-700 me-2 mb-2"
        >
          ADD SIZE
        </NavLink>
      <div className="relative mt-6 overflow-x-auto sm:rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                size
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((subcategory) => (
              <tr
                key={subcategory._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  key={subcategory._id}
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {subcategory.category ? subcategory.category.name : ""}
                </th>
                <td className="h-10 " key={subcategory.size}>
                  {subcategory.size}
                </td>
                <td className="flex items-center text-center px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleEdit(subcategory._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-6"
                    onClick={() => handleDelete(subcategory._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" text-center align-middle justify-center">
       
      </div>
    </>
  );
}

export default SubcategoryTable;
