import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function FinishTable() {
  const [finishes, setFinishes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFinishes = async () => {
      try {
        const response = await axios.get("/api/finishes");
        setFinishes(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch finishes");
      }
    };

    fetchFinishes();
  }, []);

  const handleDelete = async (finishID) => {
    try {
      await axios.delete(`/api/finishes/${finishID}`);
      setFinishes(finishes.filter((finish) => finish._id !== finishID));
    } catch (err) {
      console.error(err);
      setError("Failed to delete finish");
    }
  };

  const handleEdit = (finishID) => {
    navigate(`/editfinishes/${finishID}`);
  };

  return (
    <>
    <div className="text-center align-middle justify-center">
        <NavLink
          to="/addfinish"
          className="text-white font-medium my-4 align-middle justify-center mx-auto bg-gray-800 hover:bg-gray-700 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-gray-700 me-2 mb-2"
        >
          ADD FINISH
        </NavLink>
      </div>
      <div className="relative mt-6 overflow-x-auto sm:rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Size
              </th>
              <th scope="col" className="px-6 py-3">
                Finish
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {finishes.map((finish) => (
              <tr
                key={finish._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {finish.category?.name}
                </td>
                <td className="h-10 ">
                  {finish.subcategory?.size}
                </td>
                <td className="h-10 pl-7">
                  {finish.name}
                </td>
                <td className="flex items-center text-center px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleEdit(finish._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-6"
                    onClick={() => handleDelete(finish._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </>
  );
}

export default FinishTable;
