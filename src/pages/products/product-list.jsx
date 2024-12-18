import Pagination from "@/Components/Pagination/Pagination";
import { DeleteProduct, GetProduct } from "@/RTK/Slices/ProductSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function ProductList() {
  const [showpageNum, setShowpageNum] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // State for current page
  const Products = useSelector((state) => state.products.products);

  console.log("Rendered products:", Products);
  const dispatch = useDispatch();
  const handelDelete = (id, productName) => {
    Swal.fire({
      title: "Are you sure delete?",
      text: productName,
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
          text: productName,
          customClass: {
            popup: "swal-toast-dark", // Custom Tailwind class
            title: "swal-toast-title",
            timerProgressBar: "swal-progress-bar",
          },
        });
        dispatch(DeleteProduct(id));
        dispatch(GetProduct());
      }
    });
  };
  useEffect(() => {
    dispatch(GetProduct());
  }, []);

  const ProductBySearch = Products.filter((item) => {
    return item.title.toLowerCase().includes(searchText.toLowerCase());
  });
  const productsPerPage = showpageNum; // Products to display per page

  // Calculate index range for products on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Get the products to display on the current page
  const currentProducts = ProductBySearch.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleState = (state) => {
    const stateStyles = {
      Published:
        "bg-green-50 text-green-700 ring-green-600/20 dark:border-green-500 dark:bg-inputDark dark:text-green-500",
      Draft:
        "bg-gray-50 text-gray-600 ring-gray-500/10 dark:border-gray-500 dark:bg-inputDark dark:text-gray-500",
      Inactive:
        "bg-red-50 text-red-700 ring-red-600/10 dark:border-red-500 dark:bg-inputDark dark:text-red-500",
    };

    return (
      <span
        class={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
          stateStyles[state] || stateStyles["Inactive"]
        }`}>
        {state}
      </span>
    );
  };
  return (
    <>
      <div className="flex justify-between flex-col md:flex-row mb-7">
        <h2 className="main-title">Product List</h2>
        <div className="direction-head flex items-center gap-1 text-gray-500 dark:text-gray-100 text-small sm:text-xs">
          <Link href="/">Dashboard</Link> <i class="bx bx-chevron-right"></i>
          Products
          <i class="bx bx-chevron-right"></i>Product List <a href=""></a>
        </div>
      </div>
      <div className="box-content overflow-x-auto">
        <div className="btns-wapper flex justify-end sm:justify-between gap-3 mb-3">
          <div className="search-content relative w-3/4 hidden sm:block">
            <input
              className="p-2 border rounded-md outline-none w-full text-xs dark:bg-inputDark dark:border-none text-gray-500 "
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
              className="flex items-center justify-center gap-1 w-28 text-xs bg-main text-white p-2 rounded-md"
              href={"/products/add-product"}>
              <i class="bx bx-plus"></i>
              Add Product
            </Link>
          </div>
        </div>
        <table className="product-list-table min-w-min w-full">
          <thead>
            <tr>
              <td>Product</td>
              <td>Category</td>
              <td>Price</td>
              <td>State</td>
              <td>Stock</td>
              <td>actions</td>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((e) => {
              return (
                <tr className="dark:text-gray-100" key={e.id}>
                  <td>
                    <div className="flex items-center gap-1">
                      <div className="img-content mr-3  min-w-10 h-10 rounded-lg overflow-hidden">
                        <img
                          className="w-full h-full"
                          src={e.images?.[0] || ""}
                          alt="product-img"
                          srcset=""
                        />
                      </div>
                      <div className="">{e.title}</div>
                    </div>
                  </td>
                  <td>{e.category}</td>
                  <td>{e.price}$</td>
                  <td>{handleState(e.state)}</td>
                  <td>{e.stock}</td>
                  <td>
                    <div className="flex items-center">
                      <Link
                        href={`/products/details/${e.id}`}
                        className="flex items-center gap-1 text-xs p-2 mr-2 text-blue-400 border border-blue-200 bg-blue-100 dark:border-blue-400 dark:bg-inputDark dark:text-blue-400 rounded-md ">
                        <i class="bx bx-show-alt"></i>
                        Veiw
                      </Link>
                      <Link
                        href={`/products/edit/${e.id}`}
                        className="flex items-center gap-1 text-xs p-2 mr-2 text-green-400 border border-green-200 bg-green-100 dark:border-green-400 dark:bg-inputDark dark:text-green-400 rounded-md ">
                        <i class="bx bxs-edit"></i>
                        Edit
                      </Link>
                      <button
                        onClick={() => handelDelete(e.id, e.title)}
                        className="flex items-center gap-1 text-xs p-2 mr-2 text-red-400  border border-red-200 bg-red-100 dark:border-red-400 dark:bg-inputDark dark:text-red-400 rounded-md ">
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
        {ProductBySearch.length === 0 ? (
          <span className="block text-center mt-4 text-xs text-gray-500">
            There is no product with this name
          </span>
        ) : (
          ""
        )}
        {/* Pagination Component */}
        <Pagination
          totalProducts={ProductBySearch.length}
          productsPerPage={productsPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default ProductList;
