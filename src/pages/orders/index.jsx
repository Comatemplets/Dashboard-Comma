import Pagination from "@/Components/Pagination/Pagination";
import { DeleteCategory, GetCategory } from "@/RTK/Slices/CategorySlice";
import { DeleteOrders, GetOrders } from "@/RTK/Slices/OrdersSlice";
import { DeleteProduct, GetProduct } from "@/RTK/Slices/ProductSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function OrderList() {
  const [showpageNum, setShowpageNum] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // State for current page
  const Orders = useSelector((state) => state.orders.orders);

  console.log("Rendered products:", Orders);
  const dispatch = useDispatch();
  const handelDelete = (id, OrderId) => {
    Swal.fire({
      title: "Are you sure delete?",
      text: OrderId,
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
          text: OrderId,
          customClass: {
            popup: "swal-toast-dark", // Custom Tailwind class
            title: "swal-toast-title",
            timerProgressBar: "swal-progress-bar",
          },
        });
        dispatch(DeleteOrders(id));
        dispatch(GetOrders());
      }
    });
  };
  useEffect(() => {
    dispatch(GetOrders());
  }, []);

  const OrderBySearch = Orders.filter((item) => {
    return item.id.toLowerCase().includes(searchText.toLowerCase());
  });
  const OrderPerPage = showpageNum; // Order to display per page

  // Calculate index range for Order on the current page
  const indexOfLastOrder = currentPage * OrderPerPage;
  const indexOfFirstOrder = indexOfLastOrder - OrderPerPage;

  // Get the Order to display on the current page
  const currentOrder = OrderBySearch.slice(indexOfFirstOrder, indexOfLastOrder);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleState = (state) => {
    const stateStyles = {
      Completed:
        "bg-green-50 text-green-700 ring-green-600/20 dark:border-green-500 dark:bg-inputDark dark:text-green-500",
      Draft:
        "bg-gray-50 text-gray-600 ring-gray-500/10 dark:border-gray-500 dark:bg-inputDark dark:text-gray-500",
      Canceled:
        "bg-red-50 text-red-700 ring-red-600/10 dark:border-red-500 dark:bg-inputDark dark:text-red-500",
      Packaging:
        "bg-orange-50 text-orange-700 ring-orange-600/10 dark:border-orange-500 dark:bg-inputDark dark:text-orange-500",
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
        <h2 className="main-title">Orders List</h2>
        <div className="direction-head flex items-center gap-1 text-gray-500 dark:text-gray-100 text-small sm:text-xs">
          <Link href="/">Dashboard</Link> <i class="bx bx-chevron-right"></i>
          <Link href="/orders">Orders List</Link>{" "}
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
          </div>
        </div>
        <table className="product-list-table min-w-min w-full">
          <thead>
            <tr>
              <td>Order ID</td>
              <td>Created at</td>
              <td>Customer</td>
              <td>Total</td>
              <td>Items</td>
              <td>Order Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {currentOrder.map((e) => {
              return (
                <tr key={e.id}>
                  <td>#{String(e.id).slice(0, 6)}</td>
                  <td>{e.order_date}</td>
                  <td>{e.customer.name}</td>
                  <td>{e.total_amount}$</td>
                  <td>{e.items.length}</td>
                  <td>{handleState(e.order_status)}</td>
                  <td>
                    <div className="flex items-center">
                      <Link
                        href={`/orders/details/${e.id}`}
                        className="flex items-center gap-1 text-xs p-2 mr-2 text-blue-400 border border-blue-200 bg-blue-100 dark:border-blue-400 dark:bg-inputDark dark:text-blue-400 rounded-md ">
                        <i class="bx bx-show-alt"></i>
                        Veiw
                      </Link>
                      <button
                        onClick={() => handelDelete(e.id, `# ${e.id}`)}
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
        {OrderBySearch.length === 0 ? (
          <span className="block text-center mt-4 text-xs text-gray-500">
            There is no product with this name
          </span>
        ) : (
          ""
        )}
        {/* Pagination Component */}
        <Pagination
          totalProducts={OrderBySearch.length}
          productsPerPage={OrderPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default OrderList;
