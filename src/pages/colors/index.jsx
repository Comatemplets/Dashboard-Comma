import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AddNewColor, DeleteColor, GetColors } from "@/RTK/Slices/ColorSlice";
import dynamic from "next/dynamic";
const Compact = dynamic(
  () => import("@uiw/react-color").then((mod) => mod.Compact),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

function Colors() {
  const colors = useSelector((state) => state.colors.colors);
  const [hex, setHex] = useState("#fff");
  const dispatch = useDispatch();

  const [colorName, setColorName] = useState("");

  console.log(hex);

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor: "#6a6cf6",
    customClass: {
      popup: "swal-toast-dark", // Custom Tailwind class
      title: "swal-toast-title",
      timerProgressBar: "swal-progress-bar",
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const DataObject = {
    name: colorName,
    colorCode: hex,
  };

  const handelAddCategory = (even) => {
    even.preventDefault();
    dispatch(AddNewColor(DataObject));
    Toast.fire({
      icon: "success",
      title: "Color has been Saved",
    });
    dispatch(GetColors());
  };
  const handelDelete = (id, colorName) => {
    Swal.fire({
      title: "Are you sure delete?",
      text: colorName,
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
          customClass: {
            popup: "swal-toast-dark", // Custom Tailwind class
            title: "swal-toast-title",
            timerProgressBar: "swal-progress-bar",
          },
        });
        dispatch(DeleteColor(id));
        dispatch(GetColors());
      }
    });
  };
  useEffect(() => {
    dispatch(GetColors());
  }, []);
  return (
    <>
      <div className="flex justify-between flex-col md:flex-row mb-7">
        <h2 className="main-title">Manage Colors</h2>
        <div className="direction-head flex items-center gap-1 text-gray-500 dark:text-gray-100 text-small sm:text-xs">
          <Link href="/">Dashboard</Link>
          <i class="bx bx-chevron-right"></i>Colors <a href=""></a>
        </div>
      </div>
      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="box-content flex-1  ">
          <h2 className="text-textblack dark:text-gray-100 pb-2 font-semibold mb-5 ">
            Color List
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {colors.map((e) => {
              return (
                <div
                  key={e.id}
                  className="box-color dark:bg-inputDark shadow overflow-hidden p-3 rounded-md">
                  <div
                    className="h-56 sm:h-36 mb-2 rounded-md border dark:border-none"
                    style={{ backgroundColor: e.colorCode }}></div>
                  <div className="flex justify-between p-2">
                    <div>
                      <h2 className="font-semibold dark:text-gray-100 text-xs mb-1">
                        {e.name}
                      </h2>
                      <h2 className="text-xs dark:text-gray-100 ">
                        {e.colorCode}
                      </h2>
                    </div>
                    <button
                      onClick={() => handelDelete(e.id, e.name)}
                      className="group relative mr-2 dark:text-gray-100 ">
                      <i class="bx bx-trash-alt"></i>
                      <span className="absolute scale-0 group-hover:scale-100 -top-2 text-small text-gray-100 dark:text-textblack bg-black dark:bg-gray-100 p-1 left-1/4 -translate-x-1/2 transition duration-200">
                        Remove
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-5 w-full flex-col flex-1">
          <form
            className="box-content max-h-fit flex-1"
            onSubmit={(even) => handelAddCategory(even)}>
            <h2 className="text-textblack dark:text-gray-100 pb-2 font-semibold mb-5 ">
              Add Color
            </h2>
            <Compact
              style={{ marginLeft: 20 }}
              color={hex}
              onChange={(color) => {
                setHex(color.hex);
              }}
            />
            <div className="flex gap-2 w-full mb-4 mt-4">
              <div className=" w-full ">
                <label
                  for="product_name"
                  class="block mb-2 text-xs dark:text-gray-100 text-gray-500 ">
                  Color Name
                </label>
                <input
                  type="text"
                  id="product_name"
                  class="input-style"
                  placeholder="item name"
                  required
                  onChange={(e) => setColorName(e.target.value)}
                />
              </div>
            </div>

            <div className="submit-content flex justify-end gap-2">
              <button
                type="submit"
                className="p-2 rounded-sm text-xs bg-main  text-white">
                Create Color
              </button>
              <button className="p-2 rounded-sm text-xs bg-textblack  text-white">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Colors;
