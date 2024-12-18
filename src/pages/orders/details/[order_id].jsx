import { GetOrders } from "@/RTK/Slices/OrdersSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function OrderDetails() {
  const router = useRouter();
  const { order_id } = router.query;

  // State for current page
  const Orders = useSelector((state) => state.orders.orders);

  const Order = Orders.find((e) => {
    return e.id == order_id; // Find the product that matches the ID from the URL
  });

  console.log("Rendered Order:", Order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetOrders());
  }, []);

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row mb-7">
        <h2 className="main-title">Orders Details</h2>
        <div className="direction-head flex items-center gap-1 text-gray-500 dark:text-gray-100 text-small sm:text-xs">
          <Link href="/">Dashboard</Link> <i class="bx bx-chevron-right"></i>
          <Link href="/orders">Orders List</Link>{" "}
          <i class="bx bx-chevron-right"></i>
          Order Details
        </div>
      </div>
      <div className="flex gap-3 flex-col lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="box-content flex justify-between items-start mb-3 flex-col sm:flex-row sm:items-center gap-3">
            <div>
              <h1 className="mb-2 text-xl dark:text-gray-100">
                Order No #{Order?.id}
              </h1>
              <span className="text-gray-500 text-xs">
                Place on {Order?.order_date}
              </span>
            </div>
            <span className="text-gray-500 text-xs">
              Total Amount: {Order?.total_amount}
            </span>
          </div>
          <div className="box-content overflow-x-auto">
            <table className="product-list-table min-w-min w-full">
              <thead>
                <tr>
                  <td>Product</td>
                  <td>Product Code</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>shipping Cost</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {Order?.items.map((e) => {
                  return (
                    <tr key={e.id}>
                      <td>
                        {" "}
                        <div className="flex items-center gap-1">
                          <div className="img-content mr-3  min-w-10 h-10 rounded-lg overflow-hidden">
                            <img
                              className="w-full h-full"
                              src={e.image || ""}
                              alt="product-img"
                              srcset=""
                            />
                          </div>
                          <div className="">{e.product_name}</div>
                        </div>
                      </td>
                      <td className="">{e.product_id}</td>
                      <td>{e.quantity}</td>

                      <td>{e.subtotal}$</td>
                      <td>{Order?.shipping?.cost}$</td>
                      <td>
                        {(Order?.shipping?.cost + e.subtotal).toFixed(2)}$
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full flex-1">
          <div className="box-content mb-3">
            <h2 className="p-2 border-b mb-2 font-semibold text-sm dark:text-gray-100">
              Customer Details
            </h2>
            <div>
              <div className="flex items-center gap-1 mb-3">
                <div className="img-content mr-3  min-w-10 h-10 rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full"
                    src={Order?.customer?.image || ""}
                    alt="product-img"
                    srcset=""
                  />
                </div>
                <div className="dark:text-gray-100">
                  <div className="text-xs">{Order?.customer?.name}</div>
                  <div className="text-xs text-gray-500">
                    {Order?.customer?.email}
                  </div>
                </div>
              </div>
              <div className="mb-3 dark:text-gray-100">
                <div className="text-xs font-semibold mb-1 ">
                  Contact Number
                </div>
                <div className="text-xs text-gray-500">
                  {Order?.customer?.phone}
                </div>
              </div>
              <div className="mb-3 dark:text-gray-100">
                <div className="text-xs font-semibold  mb-1">
                  Shipping Address
                </div>
                <div className="text-xs text-gray-500 ">
                  {Order?.customer?.shipping_address?.city}{" "}
                  {Order?.customer?.shipping_address?.street}
                </div>
              </div>
            </div>
          </div>
          <div className="box-content mb-3">
            <h2 className="p-2 border-b mb-2 font-semibold text-sm dark:text-gray-100">
              Payment Information
            </h2>
            <div>
              <div className="flex items-center gap-1 mb-3">
                <div className="img-content mr-3  min-w-10 h-10 rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full"
                    src="https://techzaa.in/larkon/admin/assets/images/card/mastercard.svg"
                    alt="product-img"
                    srcset=""
                  />
                </div>
                <div className="dark:text-gray-100">
                  <div className="text-xs">
                    {Order?.payment?.payment_method}
                  </div>
                  <div className="text-xs text-gray-500">
                    XXXX XXXX XXXX {Order?.payment?.card_last4_digits}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mb-3 dark:text-gray-100">
                <div className="text-xs font-semibold mb-1 ">
                  Transaction ID
                </div>
                <div className="text-xs text-gray-500">
                  {Order?.payment?.transaction_id}
                </div>
              </div>
              <div className="flex gap-2 mb-3 dark:text-gray-100">
                <div className="text-xs font-semibold mb-1 ">
                  Card Holder Name
                </div>
                <div className="text-xs text-gray-500">
                  {Order?.payment?.card_holder}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
