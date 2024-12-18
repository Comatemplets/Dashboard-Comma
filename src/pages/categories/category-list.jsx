import Pagination from "@/Components/Pagination/Pagination";
import { DeleteCategory, GetCategory } from "@/RTK/Slices/CategorySlice";
import { DeleteProduct, GetProduct } from "@/RTK/Slices/ProductSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function CategoryList() {
  const [showpageNum, setShowpageNum] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // State for current page
  const Category = useSelector((state) => state.category.category);

  console.log("Rendered products:", Category);
  const dispatch = useDispatch();
  const handelDelete = (id, CategoryName) => {
    Swal.fire({
      title: "Are you sure delete?",
      text: CategoryName,
      showCancelButton: true,
      confirmButtonColor: "#6a6cf6",
      cancelButtonColor: "#404040",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "swal-toast-dark", // Custom Tailwind class
        title: "swal-toast-title",
        timerProgressBar: "swal-progress-bar",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: CategoryName,
          customClass: {
            popup: "swal-toast-dark", // Custom Tailwind class
            title: "swal-toast-title",
            timerProgressBar: "swal-progress-bar",
          },
        });
        dispatch(DeleteCategory(id));
        dispatch(GetProduct());
      }
    });
  };
  useEffect(() => {
    dispatch(GetCategory());
  }, []);

  const CategoryBySearch = Category.filter((item) => {
    return item.name.toLowerCase().includes(searchText.toLowerCase());
  });
  const CategoryPerPage = showpageNum; // Category to display per page

  // Calculate index range for Category on the current page
  const indexOfLastProduct = currentPage * CategoryPerPage;
  const indexOfFirstProduct = indexOfLastProduct - CategoryPerPage;

  // Get the Category to display on the current page
  const currentCategory = CategoryBySearch.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row mb-7">
        <h2 className="main-title">Categories List</h2>
        <div className="direction-head flex items-center gap-1 text-gray-500 dark:text-gray-100 text-small sm:text-xs">
          <Link href="/">Dashboard</Link> <i class="bx bx-chevron-right"></i>
          Categories
          <i class="bx bx-chevron-right"></i>Product List <a href=""></a>
        </div>
      </div>
      <div className="box-content overflow-x-auto">
        <div className="btns-wapper flex justify-end sm:justify-between gap-3 mb-3">
          <div className="search-content relative w-3/4 hidden sm:block">
            <input
              className="p-2 border rounded-md outline-none w-full text-xs text-gray-500 dark:text-gray-100  dark:bg-inputDark dark:border-none"
              type="text"
              name=""
              id=""
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <i class="bx bx-search text-lg absolute top-2/4 -translate-y-2/4 right-5 text-gray-300"></i>
          </div>

          <div className="flex">
            <select
              onClick={(e) => setShowpageNum(e.target.value)}
              className="text-xs text-gray-500 dark:text-gray-100 dark:bg-inputDark dark:border-none p-2 mr-2 border outline-none rounded-md  "
              name=""
              id="">
              <option value="10">Showing</option>
              <option value="10">10</option>
              <option value="16">16</option>
              <option value="20">20</option>
            </select>
            <Link
              className="flex items-center justify-center gap-1 min-w-16 md:min-w-36 text-xs bg-main text-white p-2 rounded-md"
              href={"/categories/add-category"}>
              <i class="bx bx-plus"></i>
              Add Category
            </Link>
          </div>
        </div>
        <table className="product-list-table min-w-min w-full">
          <thead>
            <tr>
              <td>ID</td>
              <td>Categories</td>
              <td>Creation</td>
              <td>Stock</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {currentCategory.map((e) => {
              return (
                <tr key={e.id}>
                  <td>#{String(e.id).slice(0, 6)}</td>
                  <td className="">
                    <div className="flex items-center gap-1">
                      <div className="img-content mr-3  min-w-10 h-10 rounded-lg overflow-hidden">
                        <img
                          className="w-full h-full"
                          src={e.image || ""}
                          alt="product-img"
                          srcset=""
                        />
                      </div>
                      <div className="font-semibold">{e.name}</div>
                    </div>
                  </td>
                  <td>{e.creationAt}</td>

                  <td>{e.stock}</td>
                  <td>
                    <div className="flex items-center">
                      <Link
                        href={`/categories/edit/${e.id}`}
                        className="flex items-center gap-1 text-xs p-2 mr-2 text-green-700 border border-green-200 bg-green-100 dark:border-green-400 dark:bg-inputDark dark:text-green-400 rounded-md ">
                        <i class="bx bxs-edit"></i>
                        Edit
                      </Link>
                      <button
                        onClick={() => handelDelete(e.id, e.name)}
                        className="flex items-center gap-1 text-xs p-2 mr-2 text-red-700 border border-red-200 bg-red-100 dark:border-red-400 dark:bg-inputDark dark:text-red-400 rounded-md ">
                        <i class="bx bx-x"></i>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {CategoryBySearch.length === 0 ? (
          <span className="block text-center mt-4 text-xs text-gray-500">
            There is no product with this name
          </span>
        ) : (
          ""
        )}
        {/* Pagination Component */}
        <Pagination
          totalProducts={CategoryBySearch.length}
          productsPerPage={CategoryPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default CategoryList;
