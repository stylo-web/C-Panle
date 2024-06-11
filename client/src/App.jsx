import { Route, Routes } from "react-router-dom"
import Category from "./pages/Category"
import Subcategory from "./pages/Subcategory"
import Finish from "./pages/Finish"
import Layout from "./pages/Layout"
import CategoryForm from "./components/CategoryForm"
import SubCategoryForm from "./components/SubCategoryForm"
import FinishForm from "./components/FinishForm"
import EditCategoryForm from "./components/EditCategoryForm"
import EditSubCategoryForm from "./components/EditSubCategoryForm"
import ProductForm from "./components/ProductForm"
import AllProducts from "./pages/AllProducts"
import Editfinish from "./components/Editfinish"
import EditProduct from "./components/EditProduct"


function App() {

  return (
    <>
      <Layout />
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/finishes" element={<Finish />} />
        <Route path="/products/all" element={<AllProducts />} />
        <Route path="/addcategory" element={<CategoryForm />} />
        <Route path="/addsubcategory" element={<SubCategoryForm />} />
        <Route path="/addfinish" element={<FinishForm />} />
        <Route path="/addproduct" element={<ProductForm />} />
        <Route path="/editcategory/:id" element={<EditCategoryForm />} />
        <Route path="/editsubcategory/:id" element={<EditSubCategoryForm />} />
        <Route path="/editfinishes/:id" element={<Editfinish />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
      </Routes>
    </>
  )
}

export default App
