import logoImg from "@/images/Comma-store.png";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { MobileContext } from "../Navbar/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter();
  const [IsActive, SetIsActive] = useState("dashboard");
  const [SubActive, SetSubActive] = useState("");
  const setActiveLinks = (link) => {
    SetIsActive(link); // Update the active link in state
    sessionStorage.setItem("activeLink", link); // Store the active link in sessionStorage
  };
  const setSubActiveLinks = (link) => {
    SetSubActive(link); // Update the active link in state
    sessionStorage.setItem("SubactiveLink", link); // Store the active link in sessionStorage
  };

  useEffect(() => {
    const savedActiveLink = sessionStorage.getItem("activeLink");
    if (savedActiveLink) {
      SetIsActive(savedActiveLink);
    }
    const savedSubActiveLink = sessionStorage.getItem("SubactiveLink");
    if (savedSubActiveLink) {
      SetSubActive(savedSubActiveLink);
    }
  }, []);
  const { mobileClass, setMobileClass } = useContext(MobileContext);

  return (
    <div
      className={`sidebar ${mobileClass} fixed bg-white dark:border-none dark:bg-boxDark h-screen top-0 -left-full sm:left-0 w-72  shadow-sm z-10 transition-all ease-in duration-300 border-r border-gray-100 `}>
      <button
        className="flex justify-end pr-5 pt-5  w-full sm:hidden "
        onClick={() => setMobileClass("")}>
        <i class="bx bx-menu-alt-right text-lg text-textblack dark:text-gray-100   hover:text-main dark:hover:text-main  "></i>
      </button>
      <div className="wapper-sidebar  w-full h-full p-5 overflow-y-scroll no-scrollbar  ">
        <div className="logo-icon mb-8 flex  items-center">
          <Image className="w-10 m-auto" src={logoImg} alt="logo-icon" />
        </div>
        <ul className="links-sidebar  flex justify-center flex-col gap-4 my-3">
          <li
            className={`link-sidebar relative ${
              IsActive === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveLinks("dashboard")}>
            <Link
              className=" flex justify-between items-center w-full "
              href="/">
              <div className=" flex items-center">
                <i class="bx bx-category text-lg"></i>
                <span className="link-title ml-2">Dashboard</span>
              </div>
            </Link>
          </li>
          <li
            className={`link-sidebar relative ${
              IsActive === "Products" ? "active" : ""
            }`}
            onClick={() => setActiveLinks("Products")}>
            <a className=" flex justify-between items-center w-full cursor-pointer">
              <div className="flex items-center">
                <i class="bx bx-shopping-bag text-lg"></i>
                <span className="link-title ml-2">Products</span>
              </div>
              <i className=" fa-solid fa-chevron-down text-xs "></i>
            </a>
            <ul className="mega-list  origin-top scale-y-0  h-0 ">
              <li
                className={`flex justify-start items-center ml-5 relative ${
                  SubActive === "addproduct" ? "active" : ""
                }`}
                onClick={() => setSubActiveLinks("addproduct")}>
                <Link
                  className="flex justify-start"
                  href="/products/add-product">
                  Add Product
                </Link>
              </li>
              <li
                className={`flex justify-start items-center ml-5 relative ${
                  SubActive === "productlist" ? "active" : ""
                }`}
                onClick={() => setSubActiveLinks("productlist")}>
                <Link
                  className="flex justify-start"
                  href="/products/product-list">
                  Product List
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={`link-sidebar relative ${
              IsActive === "categories" ? "active" : ""
            }`}
            onClick={() => setActiveLinks("categories")}>
            <a className=" flex justify-between items-center w-full cursor-pointer">
              <div className="flex items-center">
                <i class="bx bx-list-ul text-lg"></i>
                <span className="link-title ml-2">Categories</span>
              </div>
              <i className="fa-solid fa-chevron-down text-xs  "></i>
            </a>
            <ul className="mega-list  origin-top scale-y-0  h-0 ">
              <li
                className={`flex justify-start items-center ml-5 relative ${
                  SubActive === "categorylist" ? "active" : ""
                }`}
                onClick={() => setSubActiveLinks("categorylist")}>
                <Link
                  className="flex justify-start"
                  href="/categories/category-list">
                  Category List
                </Link>
              </li>
              <li
                className={`flex justify-start items-center ml-5 relative ${
                  SubActive === "newcategory" ? "active" : ""
                }`}
                onClick={() => setSubActiveLinks("newcategory")}>
                <Link
                  className="flex justify-start"
                  href="/categories/add-category">
                  Add New Category
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={`link-sidebar relative ${
              IsActive === "colors" ? "active" : ""
            }`}
            onClick={() => setActiveLinks("colors")}>
            <Link
              href={"/colors"}
              className=" flex justify-between items-center w-full cursor-pointer">
              <div className="flex items-center">
                <i class="bx bx-color-fill text-lg"></i>
                <span className="link-title ml-2">Colors</span>
              </div>
            </Link>
          </li>
          <li
            className={`link-sidebar relative ${
              IsActive === "badges" ? "active" : ""
            }`}
            onClick={() => setActiveLinks("badges")}>
            <Link
              href={"/badges"}
              className=" flex justify-between items-center w-full cursor-pointer">
              <div className="flex items-center">
                <i className="bx bx-badge text-lg"></i>
                <span className="link-title ml-2">Badges</span>
              </div>
            </Link>
          </li>
          <li
            className={`link-sidebar relative ${
              IsActive === "orders" ? "active" : ""
            }`}
            onClick={() => setActiveLinks("orders")}>
            <Link
              href={"/orders"}
              className=" flex justify-between items-center w-full cursor-pointer ">
              <div className="flex items-center">
                <i class="bx bx-cart-download text-lg"></i>
                <span className="link-title ml-2">Orders</span>
              </div>
            </Link>
          </li>

          <li
            className={`link-sidebar relative ${
              IsActive === "pages" ? "active" : ""
            }`}
            onClick={() => setActiveLinks("pages")}>
            <a className=" flex justify-between items-center w-full cursor-pointer">
              <div className="flex items-center">
                <i class="bx bxs-edit text-lg"></i>
                <span className="link-title ml-2">Pages</span>
              </div>
              <i className="fa-solid fa-chevron-down text-xs  "></i>
            </a>
            <ul className="mega-list  origin-top scale-y-0  h-0 ">
              <li
                className={`flex justify-start items-center ml-5 relative ${
                  SubActive === "login" ? "active" : ""
                }`}
                onClick={() => setSubActiveLinks("login")}>
                <Link className="flex justify-start" href="/login">
                  Login Page
                </Link>
              </li>
              <li
                className={`flex justify-start items-center ml-5 relative ${
                  SubActive === "signup" ? "active" : ""
                }`}
                onClick={() => setSubActiveLinks("signup")}>
                <Link className="flex justify-start" href="/signup">
                  Signup Page
                </Link>
              </li>
              <li
                className={`flex justify-start items-center ml-5 relative ${
                  SubActive === "page2" ? "active" : ""
                }`}
                onClick={() => setSubActiveLinks("page2")}>
                <Link className="flex justify-start" href="/notfound">
                  404 Error Page
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <h3 className="flex text-xs justify-start  uppercase font-semibold p-0 sm:p-3 text-gray-300">
          Support
        </h3>
        <ul className="links-sidebar flex flex-col gap-4 my-3">
          <li
            className={`link-sidebar relative ${
              IsActive === "help" ? "active" : ""
            }`}
            onClick={() => setActiveLinks("help")}>
            <a className=" flex justify-between items-center w-full " href="#">
              <div className="flex items-center">
                <i class="bx bx-help-circle text-lg"></i>
                <span className="link-title ml-2">Help Center</span>
              </div>
            </a>
          </li>
          <li
            className={`link-sidebar relative ${
              IsActive === "FAQs" ? "active" : ""
            }`}
            onClick={() => setActiveLinks("FAQs")}>
            <a className=" flex justify-between items-center w-full " href="#">
              <div className="flex items-center">
                <i class="bx bx-headphone text-lg"></i>
                <span className="link-title ml-2">FAQs</span>
              </div>
            </a>
          </li>
          <li
            className={`link-sidebar relative ${
              IsActive === "policy" ? "active" : ""
            }`}
            onClick={() => setActiveLinks("policy")}>
            <a className=" flex justify-between items-center w-full " href="#">
              <div className="flex items-center">
                <i class="bx bx-shield-quarter text-lg"></i>
                <span className="link-title ml-2">Privacy policy</span>
              </div>
            </a>
          </li>
        </ul>
        <div className="link-sidebar flex justify-start  mt-20 pt-4 border-gray-300 relative">
          <a
            className="flex items-center w-fit hover:text-main transition duration-150  gap-3 "
            href="#">
            <i class="bx bx-log-in-circle text-lg"></i>
            <h3 className="link-title ml-2">Log Out</h3>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
