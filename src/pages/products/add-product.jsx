import InputImg from "@/Components/imgInput";
import { GetCategory } from "@/RTK/Slices/CategorySlice";
import { GetColors } from "@/RTK/Slices/ColorSlice";
import { AddNewProduct } from "@/RTK/Slices/ProductSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as filestack from "filestack-js";
import { GetBadges } from "@/RTK/Slices/BadgesSlice";
const client = filestack.init("AKjiyRQRqTUyrowyXJeAcz"); // Replace with your Filestack API key

function AddProduct() {
  const dispatch = useDispatch();
  const Category = useSelector((state) => state.category.category);
  const Colors = useSelector((state) => state.colors.colors);
  const badges = useSelector((state) => state.badges.badges);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  // consts information product
  const [Quickveiw, setQuickveiw] = useState(false);
  const [ProdctName, setProdctName] = useState("");
  const [ProdctCategory, setProdctCategory] = useState("");
  const [ProdctBrand, setProdctBrand] = useState("");
  const [ProdctWeight, setProdctWeight] = useState("");
  const [ProdctGender, setProdctGender] = useState("");
  const [ProdctState, setProdctState] = useState("");
  const [ProdctSizes, setProdctSizes] = useState([]);
  const [ProdctColors, setProdctColors] = useState([]);
  const [ProdctDescription, setProdctDescription] = useState("");
  const [ProdctStock, setProdctStock] = useState(0);
  const [ProdctPrice, setProdctPrice] = useState(0);
  const [ProdctDiscount, setProdctDiscount] = useState(0);
  const [ProdctBadge, setProdctBadge] = useState([]);
  console.log(ProdctSizes);
  useEffect(() => {
    dispatch(GetCategory());
    dispatch(GetColors());
    dispatch(GetBadges());
  }, []);
  console.log(ProdctBadge);
  console.log(badges);
  const handleUpload = async (event) => {
    const files = event.target.files;

    if (files.length === 0) {
      alert("Please select files!");
      return;
    }

    setUploading(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const response = await client.upload(file);
        console.log("Uploaded file:", response);
        uploadedUrls.push(response.url); // Store uploaded file URL
      }
      setImageUrls((prevUrls) => [...prevUrls, ...uploadedUrls]); // Add new URLs to the existing state
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload one or more files");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (urlToRemove) => {
    setImageUrls((prevUrls) => prevUrls.filter((url) => url !== urlToRemove));
  };
  console.log(imageUrls);
  const handelSize = (size) => {
    setProdctSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        // If the size is already in the array, remove it
        return prevSizes.filter((item) => item !== size);
      } else {
        // Otherwise, add the size
        return [...prevSizes, size];
      }
    });
  };
  const handelColors = (color) => {
    setProdctColors((prevColor) => {
      if (prevColor.includes(color)) {
        // If the size is already in the array, remove it
        return prevColor.filter((item) => item !== color);
      } else {
        // Otherwise, add the size
        return [...prevColor, color];
      }
    });
  };
  const handleBadgeChange = (id) => {
    const selectedBadge = badges.find((badge) => badge.id === id);
    setProdctBadge(selectedBadge);
  };
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
    title: ProdctName,
    price: ProdctPrice,
    discount: ProdctDiscount,
    description: ProdctDescription,
    images: imageUrls,
    category: ProdctCategory,
    color: ProdctColors,
    size: ProdctSizes,
    stock: ProdctStock,
    weight: ProdctWeight,
    gender: ProdctGender,
    state: ProdctState,
    brand: ProdctBrand,
    badge: ProdctBadge,
  };

  const handelAddProduct = (even) => {
    even.preventDefault();
    dispatch(AddNewProduct(DataObject));
    setQuickveiw(true);
    // Toast.fire({
    //   icon: "success",
    //   title: "Product has been Saved",
    // });
  };

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row mb-7">
        <h2 className="main-title">Add Product</h2>
        <div className="direction-head flex items-center gap-1 text-gray-500 dark:text-gray-300 text-small sm:text-xs">
          <Link href="/">Dashboard</Link> <i class="bx bx-chevron-right"></i>
          Products
          <i class="bx bx-chevron-right"></i>Add Product <a href=""></a>
        </div>
      </div>
      <div className="flex gap-5 flex-col lg:flex-row">
        {Quickveiw ? (
          <div className="box-content flex-1 lg:max-w-80 ">
            <h2 className="text-textblack dark:text-gray-100 pb-2 font-semibold mb-5 ">
              Quick Preview
            </h2>

            <div className="flex justify-center items-center w-full h-80 rounded-md overflow-hidden bg-gray-100">
              {imageUrls[0] ? (
                <img src={imageUrls[0]} alt="preview-img" />
              ) : (
                <i class="bx bx-image-alt text-5xl text-gray-500 dark:text-gray-300"></i>
              )}
            </div>
            <h2 className="text-md my-3 font-semibold dark:text-gray-100">
              {ProdctName ? ProdctName : "Title Product"}
            </h2>
            <div className="flex flex-col gap-2">
              <span className="text-xs dark:text-gray-100">Price:</span>
              <div className="flex gap-5 dark:text-gray-200">
                <del className="text-gray-500 ">{ProdctPrice}$</del>
                <span>
                  {ProdctPrice - (ProdctDiscount / 100) * ProdctPrice}$
                </span>
              </div>
            </div>
            <div className="mt-5">
              <span className="text-xs dark:text-gray-100">Sizes:</span>
              <div className="flex gap-3 flex-wrap mt-2">
                {ProdctSizes.map((e) => (
                  <div
                    key={e}
                    className="flex justify-center items-center w-9 h-9 text-xs text-gray-500 dark:text-gray-200 p-3 border rounded-md uppercase">
                    {e}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <span className="text-xs dark:text-gray-200">Colors:</span>
              <div className="flex gap-3 flex-wrap mt-2">
                {ProdctColors.map((e) => (
                  <div
                    key={e.name}
                    style={{ backgroundColor: e.colorCode }}
                    className="flex justify-center items-center w-7 h-7 text-xs text-gray-500 p-3 border rounded-full uppercase"></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div class="box-content min-w-60   animate-pulse md:p-6 dark:border-gray-400">
            <h2 className="text-textblack dark:text-gray-300 pb-2 font-semibold mb-5 ">
              Quick Preview
            </h2>
            <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-400">
              <svg
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                class="w-10 h-10 text-gray-200 dark:text-gray-600">
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
              </svg>
            </div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
            <div class="flex items-center mt-4">
              <div>
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-2"></div>
                <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
              </div>
            </div>
            <span class="sr-only">Loading...</span>
          </div>
        )}

        <div className="flex gap-5 w-full flex-col flex-1">
          <div className="box-content">
            <div className="main-img mb-4">
              <h2 className="text-textblack dark:text-gray-300 pb-2 font-semibold mb-5 ">
                Upload Images
              </h2>

              <InputImg handleUpload={handleUpload} uploading={uploading} />
            </div>
            <div className="other-img ">
              {imageUrls.length > 0 && (
                <>
                  <h3 className="text-xs text-gray-500 mb-2">All Images</h3>
                  <div className="flex gap-2">
                    {imageUrls.map((url, index) => (
                      <div
                        className="group relative flex justify-center items-center overflow-hidden w-32 h-32 rounded-md "
                        key={index}>
                        <img
                          src={url}
                          alt={`Uploaded ${index + 1}`}
                          style={{
                            maxWidth: "150px",
                            maxHeight: "150px",
                            objectFit: "cover",
                          }}
                        />
                        <button
                          onClick={() => handleRemove(url)}
                          className="absolute translate-center text-white text-xl bg-black bg-opacity-20 w-full h-full scale-0 group-hover:scale-100 transition duration-200">
                          <i className="bx bx-x"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <form
            className="box-content flex-1"
            onSubmit={(even) => handelAddProduct(even)}>
            <h2 className="text-textblack dark:text-gray-300 border-b pb-2 font-semibold mb-5 ">
              Product Information
            </h2>
            <div className="flex gap-2 w-full mb-4">
              <div className=" w-full ">
                <label for="product_name" class="label-style">
                  Product Name
                </label>
                <input
                  type="text"
                  id="product_name"
                  class="input-style"
                  placeholder="item name"
                  required
                  onChange={(e) => setProdctName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label for="Categories" class="label-style">
                  Product Categories
                </label>
                <select
                  onChange={(e) => setProdctCategory(e.target.value)}
                  id="Categories"
                  placeholder="Choose a Categories"
                  class="input-style">
                  <option selected disabled>
                    Choose a Categories
                  </option>
                  {Category.map((e) => {
                    return (
                      <option key={e.id} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full mb-4">
              <div className="w-full ">
                <label for="Brand" class="label-style">
                  Brand
                </label>
                <input
                  type="text"
                  id="Brand"
                  class="input-style"
                  placeholder="Brand Name"
                  required
                  onChange={(e) => setProdctBrand(e.target.value)}
                />
              </div>
              <div className="w-full ">
                <label for="Weight" class="label-style">
                  Weight
                </label>
                <input
                  type="text"
                  id="Weight"
                  class="input-style"
                  placeholder="in Gm & Kg"
                  required
                  onChange={(e) => setProdctWeight(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label for="Gender" class="label-style">
                  Gender
                </label>
                <select
                  onChange={(e) => setProdctGender(e.target.value)}
                  id="Gender"
                  class="input-style">
                  <option selected disabled>
                    Select Gender
                  </option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>
              <div className="w-full">
                <label for="State" class="label-style">
                  State
                </label>
                <select
                  onChange={(e) => setProdctState(e.target.value)}
                  id="State"
                  class="input-style">
                  <option selected disabled>
                    Select State
                  </option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="w-full">
                <label for="Categories" class="label-style">
                  Badges
                </label>
                <select
                  onChange={(e) => handleBadgeChange(e.target.value)}
                  id="Badge"
                  placeholder="Choose a Badges"
                  class="input-style">
                  <option selected disabled>
                    Choose a Badges
                  </option>
                  <option value="none">None</option>
                  {badges.map((e) => {
                    return (
                      <option key={e.id} value={e.id}>
                        {e.badge_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="size-content mb-4">
              <span className="label-style">Sizes:</span>
              <div className="flex flex-col justify-between flex-wrap gap-3 ">
                <div class="flex items-center  pr-2">
                  <input
                    onChange={(e) => handelSize(e.target.value)}
                    checked={ProdctSizes.includes("xs")}
                    id="checkbox-xs"
                    type="checkbox"
                    value="xs"
                    class="checkbox-style"
                  />
                  <label
                    for="checkbox-xs"
                    class="text-sm font-norma cursor-pointer text-gray-500 uppercase">
                    xs
                  </label>
                </div>
                <div class="flex items-center  pr-2">
                  <input
                    onChange={(e) => handelSize(e.target.value)}
                    checked={ProdctSizes.includes("s")}
                    id="checkbox-s"
                    type="checkbox"
                    value="s"
                    class="checkbox-style"
                  />
                  <label
                    for="checkbox-s"
                    class="text-sm font-norma cursor-pointer text-gray-500 uppercase">
                    s
                  </label>
                </div>
                <div class="flex items-center  pr-2">
                  <input
                    onChange={(e) => handelSize(e.target.value)}
                    checked={ProdctSizes.includes("m")}
                    id="checkbox-m"
                    type="checkbox"
                    value="m"
                    class="checkbox-style"
                  />
                  <label
                    for="checkbox-m"
                    class="text-sm font-norma cursor-pointer text-gray-500 uppercase">
                    m
                  </label>
                </div>
                <div class="flex items-center  pr-2">
                  <input
                    onChange={(e) => handelSize(e.target.value)}
                    checked={ProdctSizes.includes("lg")}
                    id="checkbox-lg"
                    type="checkbox"
                    value="lg"
                    class="checkbox-style"
                  />
                  <label
                    for="checkbox-lg"
                    class="text-sm font-norma cursor-pointer text-gray-500 uppercase">
                    lg
                  </label>
                </div>
                <div class="flex items-center  pr-2">
                  <input
                    onChange={(e) => handelSize(e.target.value)}
                    checked={ProdctSizes.includes("xl")}
                    id="checkbox-xl"
                    type="checkbox"
                    value="xl"
                    class="checkbox-style"
                  />
                  <label
                    for="checkbox-xl"
                    class="text-sm font-norma cursor-pointer text-gray-500 uppercase">
                    xl
                  </label>
                </div>
                <div class="flex items-center  pr-2">
                  <input
                    onChange={(e) => handelSize(e.target.value)}
                    checked={ProdctSizes.includes("xxl")}
                    id="checkbox-xxl"
                    type="checkbox"
                    value="xxl"
                    class="checkbox-style"
                  />
                  <label
                    for="checkbox-xxl"
                    class="text-sm font-norma cursor-pointer text-gray-500 uppercase">
                    xxl
                  </label>
                </div>
                <div class="flex items-center ">
                  <input
                    onChange={(e) => handelSize(e.target.value)}
                    checked={ProdctSizes.includes("3xl")}
                    id="checkbox-3xl"
                    type="checkbox"
                    value="3xl"
                    class="checkbox-style"
                  />
                  <label
                    for="checkbox-3xl"
                    class="text-sm font-norma cursor-pointer text-gray-500 uppercase">
                    3xl
                  </label>
                </div>
              </div>
            </div>
            <div className="color-content mb-4">
              <span className="block text-xs mb-2 text-gray-500">Colors:</span>
              <div className="flex gap-3 flex-wrap ">
                {Colors.map((e) => {
                  return (
                    <div
                      class="group relative flex justify-center items-center"
                      key={e.id}>
                      <input
                        onChange={() => handelColors(e)}
                        id={e.name}
                        type="checkbox"
                        value="3xl"
                        style={{ backgroundColor: e.colorCode }}
                        class={`w-6 h-6 appearance-none  cursor-pointer  border border-gray-300  dark:border-none checked:outline-2 checked:outline checked:outline-gray-200 dark:checked:outline-gray-100 rounded-full`}
                      />
                      <label
                        className="absolute -top-5 left-1/2 -translate-x-2/4 text-small text-white bg-textblack p-1 rounded-sm hidden group-hover:block"
                        htmlFor={e.name}>
                        {e.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full mb-4">
              <label for="Description" class="label-style">
                Description
              </label>
              <textarea
                onChange={(e) => setProdctDescription(e.target.value)}
                class="!h-32 input-style"
                name="Description"
                placeholder="Short desctiption about the product"
                id="Description"></textarea>
            </div>
            <div className="w-full mb-4">
              <label for="stock" class="label-style">
                Stock
              </label>
              <input
                onChange={(e) => setProdctStock(e.target.value)}
                class="input-style"
                type="number"
                name="Stock"
                placeholder="quantity"
                id="Stock"
              />
            </div>
            <div className="price-content flex gap-4 mb-6">
              <div className="relative w-full">
                <label for="Price" class="label-style">
                  Price
                </label>
                <input
                  onChange={(e) => setProdctPrice(e.target.value)}
                  class="input-style"
                  type="number"
                  name="Price"
                  placeholder="000"
                  id="Price"
                />
                <span className="absolute top-1/2 -translate-y-2/4 text-gray-400 -left-3 text-xs">
                  $
                </span>
              </div>
              <div className="relative w-full">
                <label for="Discount" class="label-style">
                  Discount
                </label>
                <input
                  onChange={(e) => setProdctDiscount(e.target.value)}
                  class="h-10 bg-gray-50 border dark:bg-inputDark dark:border-none dark:text-gray-100 outline-none border-gray-300 text-gray-500 text-xs rounded-md  block w-full p-2.5 "
                  type="number"
                  name="Discount"
                  placeholder="000"
                  id="Discount"
                />
                <span className="absolute top-1/2 -translate-y-2/4 text-gray-400 -left-3 text-xs">
                  %
                </span>
              </div>
            </div>
            <div className="submit-content flex justify-end gap-2">
              <button
                type="submit"
                className="p-2 rounded-sm text-xs bg-main  text-white">
                Create Product
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
export default AddProduct;
