import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFinishes = async () => {
      try {
        const response = await axios.get(
          "/api/products/all"
        );
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch finishes");
      }
    };

    fetchFinishes();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api//${productId}/products`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete product");
    }
  };

  const handleEdit = (productId) => {
    navigate(`/editproduct/${productId}`);
  };

  return (
    <>

      {error && <p className="text-red-500 text-center font-bold">{error}</p>}
      <div className="text-center align-middle justify-center">
        <NavLink
          to="/addproduct"
          className="text-white font-medium my-4 align-middle justify-center mx-auto bg-gray-800 hover:bg-gray-700 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-gray-700 me-2 mb-2"
        >
          ADD PRODUCT
        </NavLink>
      </div>
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
                Subcategory
              </th>
              <th scope="col" className="px-6 py-3">
                Finish
              </th>
              <th scope="col" className="px-6 py-3">
                Images
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr
                key={product._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">
                  {index + 1}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.category?.name}
                </td>
                <td className="h-10 pl-7">
                  {product.subcategory?.size}
                </td>
                <td className="h-10 pl-6">
                  {product.finish?.name}
                </td>
                <td className="px-6 py-4 flex flex-wrap">
                  {product.images.map((image, index) => (
                    <div className=" flex">
                      <img
                        key={index}
                        src={`/uploads/${image}`}
                        alt={`Product Image ${index + 1}`}
                        className="w-8 h-8 rounded-lg  mr-2 mt-1"
                      />
                    </div>
                  ))}
                </td>
                <td className="flex-wrap items-center text-start py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-6"
                    onClick={() => handleDelete(product._id)}
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

export default ProductTable;
