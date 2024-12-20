import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import { AddNewBadge, DeleteBadge, GetBadges } from "@/RTK/Slices/BadgesSlice";
const Compact = dynamic(
  () => import("@uiw/react-color").then((mod) => mod.Compact),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

function Badges() {
  const colors = useSelector((state) => state.colors.colors);
  const badges = useSelector((state) => state.badges.badges);
  const ToDate = new Date();
  const [hex, setHex] = useState("#fff");
  const dispatch = useDispatch();

  const [BadgeName, setBadgeName] = useState("");
  const [BadgeType, setBadgeType] = useState("");
  const [BadgeCreation, setBadgeCreation] = useState(ToDate.toDateString());
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
    badge_name: BadgeName,
    badge_type: BadgeType,
    color: hex,
    creationAt: BadgeCreation,
  };

  const handelAddCategory = (even) => {
    even.preventDefault();
    dispatch(AddNewBadge(DataObject));
    // Toast.fire({
    //   icon: "success",
    //   title: "Badge has been Saved",
    // });
    dispatch(GetBadges());
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
        dispatch(DeleteBadge(id));
        dispatch(GetBadges());
      }
    });
  };
  useEffect(() => {
    dispatch(GetBadges());
  }, []);
  return (
    <>
      <div className="flex justify-between flex-col md:flex-row mb-7">
        <h2 className="main-title">Manage Badges</h2>
        <div className="direction-head flex items-center gap-1 text-gray-500 dark:text-gray-100 text-small sm:text-xs">
          <Link href="/">Dashboard</Link>
          <i class="bx bx-chevron-right"></i>Badges <a href=""></a>
        </div>
      </div>
      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="box-content flex-1  ">
          <h2 className="text-textblack dark:text-gray-100 pb-2 font-semibold mb-5 ">
            Badge List
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {badges.map((e) => {
              return (
                <div
                  key={e.id}
                  className="box-color dark:bg-inputDark shadow overflow-hidden p-3 rounded-md">
                  <div className=" relative w-full h-56 sm:h-36 mb-2 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
                    <span
                      className="absolute top-2 right-2 badge text-small text-gray-100 p-2 px-3 rounded-sm font-semibold"
                      style={{ backgroundColor: e.color }}>
                      {e.badge_name}
                    </span>
                  </div>
                  <div className="flex justify-between p-2">
                    <div>
                      <span className="text-xs  dark:text-gray-100">
                        Badge name
                      </span>
                      <h2 className="font-semibold mt-1 dark:text-gray-400 text-xs mb-1">
                        {e.badge_name}
                      </h2>
                      <span className="text-xs  dark:text-gray-100">
                        Badge type
                      </span>
                      <h2 className="font-semibold mt-1 dark:text-gray-400 text-xs mb-1">
                        {e.badge_type}
                      </h2>
                      <span className="text-xs  dark:text-gray-100">
                        Creation At
                      </span>
                      <h2 className="font-semibold mt-1 dark:text-gray-400 text-xs mb-1">
                        {e.creationAt}
                      </h2>
                    </div>
                    <button
                      onClick={() => handelDelete(e.id, e.name)}
                      className="group relative mr-2 dark:text-gray-100 ">
                      <i class="bx bx-trash-alt"></i>
                      <span className="absolute scale-0 group-hover:scale-100 top-7 text-small text-gray-100 dark:text-textblack bg-black dark:bg-gray-100 p-1 left-1/4 -translate-x-1/2 transition duration-200">
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
              Add Badge
            </h2>

            <div className=" w-full mb-5">
              <label
                for="Badge_name"
                class="block mb-2 text-xs dark:text-gray-100 text-gray-500 ">
                Badge Name
              </label>
              <input
                type="text"
                id="product_name"
                class="input-style"
                placeholder="item name"
                required
                onChange={(e) => setBadgeName(e.target.value)}
              />
            </div>
            <div className="w-full mb-5">
              <label
                for="Badge_type"
                class="block mb-2 text-xs dark:text-gray-100 text-gray-500 ">
                Badge Type
              </label>
              <input
                type="text"
                id="product_name"
                class="input-style"
                placeholder="item type"
                required
                onChange={(e) => setBadgeType(e.target.value)}
              />
            </div>

            <div className="w-full mb-5">
              <label
                for="color_input"
                class="block mb-2 text-xs dark:text-gray-100 text-gray-500 ">
                Badge Color
              </label>
              <Compact
                style={{ marginLeft: 20 }}
                color={hex}
                onChange={(color) => {
                  setHex(color.hex);
                }}
              />
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
export default Badges;
