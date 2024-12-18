import { GetOrders } from "@/RTK/Slices/OrdersSlice";
import { GetProduct } from "@/RTK/Slices/ProductSlice";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default function Home() {
  const Orders = useSelector((state) => state.orders.orders);
  const [options2, setOptions2] = useState({
    title: {
      text: "Earnings",
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        color: "gray",
        fontSize: "14px",
        fontWeight: "bold",
      },
    },

    plotOptions: {
      pie: {},
    },
    fill: {
      colors: ["#6a6cf6", "#6eb4fe", "#aeff9e"],
    },
    labels: ["Revenue", "Profit", "SciFi"],
    dataLabels: {
      style: {
        fontSize: "8px",
      },
    },
  });
  const [series2, setSeries2] = useState([54, 21.1, 24.7]);
  const [options, setOptions] = useState({
    title: {
      text: "Performance",
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        color: "gray",
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    grid: {
      show: true,
      borderColor: "#eeeeee21",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 400,
          cssClass: "dark:!fill-gray-100 text-small sm:!text-xs",
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
        color: "#78909C",
        offsetX: 0,
        offsetY: 0,
      },
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
          fontSize: "10px",
          fontWeight: 400,
          cssClass: "dark:!fill-gray-100 text-small sm:!text-xs",
        },
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      crosshairs: {
        show: false,
      },
      axisTicks: {
        show: false,
        borderType: "solid",
        color: "#78909C",
        height: 6,
        offsetX: 0,
        offsetY: 0,
      },
    },
    stroke: {
      show: true,
      curve: "straight",
      lineCap: "butt",
      colors: undefined,
      width: 0,
      dashArray: 0,
    },
    plotOptions: {
      bar: {
        barHeight: "80%",
        borderRadius: 5, // Here is the issue ...
        columnWidth: "40%",
        dataLabels: {
          enabled: false,
        },
      },
    },
    dataLabels: {
      enabled: false, // This globally disables data labels if set outside `plotOptions.bar`
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Website visitors",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 52, 69, 77, 22],
      color: ["#6a6cf6"],
      radius: 2,
    },
  ]);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetProduct());
    dispatch(GetOrders());
  }, []);
  console.log(products);
  return (
    <div className="dashboard">
      <div className="wapper-top flex gap-3 flex-col lg:flex-row mb-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
          <div className="box-content dark:text-gray-100 ">
            <div className="flex justify-between gap-3 w-full mb-3">
              <i className="bx bx-shopping-bag p-4 text-2xl text-main bg-main bg-opacity-25 rounded-lg"></i>
              <div>
                <h3 className="text-gray-500 text-xs mb-1">Total Orders</h3>
                <h2>13,500</h2>
              </div>
            </div>
            <div className="flex justify-between p-3 bg-gray-100 dark:bg-inputDark rounded-md ">
              <div className="flex items-center text-xs gap-2 text-green-700">
                <i className="bx bxs-up-arrow"></i>
                2.3%
              </div>
              <a className="text-xs text-textblack dark:text-gray-100" href="#">
                Veiw More
              </a>
            </div>
          </div>
          <div className="box-content dark:text-gray-100  ">
            <div className="flex justify-between gap-3 w-full mb-3">
              <i class="bx bx-award  p-4 text-2xl text-main bg-main bg-opacity-25 rounded-lg"></i>
              <div>
                <h3 className="text-gray-500 text-xs mb-1">New Leads</h3>
                <h2>9,500</h2>
              </div>
            </div>
            <div className="flex justify-between p-3 bg-gray-100 dark:bg-inputDark rounded-md ">
              <div className="flex items-center text-xs gap-2 text-green-700">
                <i className="bx bxs-up-arrow"></i>
                8.3%
              </div>
              <a className="text-xs text-textblack dark:text-gray-100" href="#">
                Veiw More
              </a>
            </div>
          </div>
          <div className="box-content  dark:text-gray-100  ">
            <div className="flex justify-between gap-3 w-full mb-3">
              <i class="bx bxs-backpack  p-4 text-2xl text-main bg-main bg-opacity-25 rounded-lg"></i>
              <div>
                <h3 className="text-gray-500 text-xs mb-1">Deals</h3>
                <h2>976</h2>
              </div>
            </div>
            <div className="flex justify-between p-3 bg-gray-100 dark:bg-inputDark rounded-md ">
              <div className="flex items-center text-xs gap-2 text-red-700">
                <i className="bx bxs-down-arrow"></i>
                0.3%
              </div>
              <a className="text-xs text-textblack dark:text-gray-100" href="#">
                Veiw More
              </a>
            </div>
          </div>
          <div className="box-content dark:text-gray-100 ">
            <div className="flex justify-between gap-3 w-full mb-3">
              <i class="bx bx-dollar-circle p-4 text-2xl text-main bg-main bg-opacity-25 rounded-lg"></i>
              <div>
                <h3 className="text-gray-500 text-xs mb-1">Booked Revenue</h3>
                <h2>123.6K</h2>
              </div>
            </div>
            <div className="flex justify-between p-3 bg-gray-100 dark:bg-inputDark rounded-md ">
              <div className="flex items-center text-xs gap-2 text-red-700">
                <i className="bx bxs-down-arrow"></i>
                10.6%
              </div>
              <a className="text-xs text-textblack dark:text-gray-100" href="#">
                Veiw More
              </a>
            </div>
          </div>
        </div>
        <div className="box-content flex-1 overflow-x-hidden cursor-crosshair	">
          <Chart
            options={options}
            series={series}
            type="bar"
            width="100%"
            height="250"
          />
        </div>
      </div>
      <div className="wapper-midlle flex gap-3 flex-col lg:flex-row mb-3">
        <div className="box-content dark:!fill-gray-100 flex-1  overflow-x-hidden">
          <Chart
            options={options2}
            series={series2}
            type="donut"
            width="100%"
            height="250"
          />
          <div className="flex justify-between">
            <div>
              <div className="flex justify-center items-center gap-1 mb-2 dark:text-gray-100">
                <span className="w-2 h-2 rounded-full bg-main"></span>
                <span className="text-small text-gray-500 ">Revenue</span>
              </div>
              <span className="dark:text-gray-100">38,802$</span>
            </div>
            <div>
              <div className="flex justify-center items-center gap-1 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#6eb4fe]"></span>
                <span className="text-small text-gray-500 ">Profit</span>
              </div>
              <span className="dark:text-gray-100">28,120$</span>
            </div>
          </div>
        </div>
        <div className="box-content overflow-x-auto flex-1 !h-auto">
          <h2 className="font-semibold text-gray-500 text-sm">Top Customers</h2>
          <table className="product-list-table min-w-min w-full">
            <thead>
              <tr>
                <td>Name</td>
                <td>Total Mony</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center gap-1">
                    <div className="img-content mr-3  min-w-10 h-10 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full"
                        src="https://remosnextjs.vercel.app/images/avatar/user-1.png"
                        alt="user-img"
                        srcset=""
                      />
                    </div>
                    <div>
                      <div className="">Devon Lane</div>
                      <div className="text-small text-gray-400">
                        73 Purchases
                      </div>
                    </div>
                  </div>
                </td>
                <td>120$</td>
              </tr>
              <tr>
                <td>
                  <div className="flex items-center gap-1">
                    <div className="img-content mr-3  min-w-10 h-10 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full"
                        src="https://remosnextjs.vercel.app/images/avatar/user-4.png"
                        alt="user-img"
                        srcset=""
                      />
                    </div>
                    <div>
                      <div className="">Albert Flores</div>
                      <div className="text-small text-gray-400">
                        73 Purchases
                      </div>
                    </div>
                  </div>
                </td>
                <td>90$</td>
              </tr>
              <tr>
                <td>
                  <div className="flex items-center gap-1">
                    <div className="img-content mr-3  min-w-10 h-10 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full"
                        src="https://remosnextjs.vercel.app/images/avatar/user-5.png"
                        alt="user-img"
                        srcset=""
                      />
                    </div>
                    <div>
                      <div className="">Ronald Richards</div>
                      <div className="text-small text-gray-400">
                        73 Purchases
                      </div>
                    </div>
                  </div>
                </td>
                <td>80$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="wapper-bottom">
        <div className="box-content overflow-x-auto">
          <h2 className="font-semibold text-gray-500 text-sm">Recent Orders</h2>
          <table className="product-list-table min-w-min w-full">
            <thead>
              <tr>
                <td>Order ID</td>
                <td>Created at</td>
                <td>Customer</td>
                <td>Email ID</td>
                <td>Total</td>
                <td>Items</td>
                <td>Address</td>
                <td>Payment Type</td>
              </tr>
            </thead>
            <tbody>
              {Orders.slice(0, 5).map((e) => {
                return (
                  <tr key={e.id}>
                    <td>#{String(e.id).slice(0, 6)}</td>
                    <td>{e.order_date}</td>
                    <td>{e.customer.name}</td>
                    <td>{e.customer.email}</td>
                    <td>{e.total_amount}$</td>
                    <td>{e.items.length}</td>
                    <td>
                      {e.customer.shipping_address.street}
                      {"-"}
                      {e.customer.shipping_address.city}
                    </td>
                    <td>{e.payment.payment_method}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {Orders.length === 0 ? (
            <span className="block text-center mt-4 text-xs text-gray-500">
              There is no product with this name
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
