import InputImg from "@/Components/imgInput";
import { AddNewCategory, GetCategory } from "@/RTK/Slices/CategorySlice";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as filestack from "filestack-js";
const client = filestack.init("AKjiyRQRqTUyrowyXJeAcz"); // Replace with your Filestack API key

function AddCategory() {
  const dispatch = useDispatch();
  const ToDate = new Date();
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [Quickveiw, setQuickveiw] = useState(false);
  // consts information Category
  const [CategoryName, setCategoryName] = useState("");
  const [CategoryDescription, setCategoryDescription] = useState("");
  const [CategoryStock, setCategoryStock] = useState(0);
  const [CategoryCreation, setCategoryCreation] = useState(
    ToDate.toDateString()
  );
  console.log(CategoryCreation);

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
    name: CategoryName,
    image: imageUrls,
    description: CategoryDescription,
    stock: CategoryStock,
    creationAt: CategoryCreation,
  };

  const handelAddCategory = (even) => {
    even.preventDefault();
    dispatch(AddNewCategory(DataObject));
    setQuickveiw(true);
    Toast.fire({
      icon: "success",
      title: "Category has been Saved",
    });
  };

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row mb-7">
        <h2 className="main-title">Add new Category</h2>
        <div className="direction-head flex items-center gap-1 text-gray-500 dark:text-gray-100 text-small sm:text-xs">
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
                <i class="bx bx-image-alt text-5xl text-gray-500"></i>
              )}
            </div>
            <h2 className="text-md my-3 font-semibold dark:text-gray-100">
              {CategoryName ? CategoryName : "Title Category"}
            </h2>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2 mb-3">
                <span className="text-xs dark:text-gray-100 ">Quantity:</span>
                <div className="flex gap-5 text-xs text-gray-500 dark:text-gray-100">
                  {CategoryStock ? CategoryStock : "Category Stock"}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs dark:text-gray-100">Creation At:</span>
                <div className="flex gap-5 text-xs text-gray-500 dark:text-gray-100">
                  {CategoryCreation ? CategoryCreation : "Category Stock"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div class="box-content min-w-60   animate-pulse md:p-6 dark:border-gray-400">
            <h2 className="text-textblack dark:text-gray-100 pb-2 font-semibold mb-5 ">
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
              <h2 className="text-textblack dark:text-gray-100 pb-2 font-semibold mb-5 ">
                Upload Images
              </h2>
              <InputImg handleUpload={handleUpload} uploading={uploading} />
            </div>
            <div className="other-img ">
              {imageUrls.length > 0 && (
                <>
                  <h3 className="text-xs text-gray-500 dark:text-gray-100 mb-2">
                    Main Image
                  </h3>
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
            onSubmit={(even) => handelAddCategory(even)}>
            <h2 className="text-textblack dark:text-gray-100 border-b pb-2 font-semibold mb-5 ">
              Category Information
            </h2>
            <div className="flex gap-2 w-full mb-4">
              <div className=" w-full ">
                <label
                  for="product_name"
                  class="block mb-2 text-xs dark:text-gray-100 text-gray-500 ">
                  Category Name
                </label>
                <input
                  type="text"
                  id="product_name"
                  class=" h-10 bg-gray-50 border dark:text-gray-100 dark:bg-inputDark dark:border-none outline-none border-gray-300 text-gray-500 text-xs rounded-md  block w-full p-2.5 "
                  placeholder="item name"
                  required
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full mb-4">
              <label
                for="Description"
                class="block mb-2 text-xs dark:text-gray-100  text-gray-500 ">
                Description
              </label>
              <textarea
                onChange={(e) => setCategoryDescription(e.target.value)}
                class="h-32 bg-gray-50 border outline-none dark:text-gray-100 dark:bg-inputDark dark:border-none border-gray-300 text-gray-500 text-xs rounded-md  block w-full p-2.5 "
                name="Description"
                placeholder="Short desctiption about the product"
                id="Description"></textarea>
            </div>
            <div className="w-full mb-4">
              <label
                for="stock"
                class="block mb-2 text-xs dark:text-gray-100 text-gray-500 ">
                Stock
              </label>
              <input
                onChange={(e) => setCategoryStock(e.target.value)}
                class="h-10 bg-gray-50 border outline-none dark:text-gray-100 dark:bg-inputDark dark:border-none border-gray-300 text-gray-500 text-xs rounded-md  block w-full p-2.5 "
                type="number"
                name="Stock"
                placeholder="quantity"
                id="Stock"
              />
            </div>
            <div className="submit-content flex justify-end gap-2">
              <button
                type="submit"
                className="p-2 rounded-sm text-xs bg-main  text-white">
                Create Category
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
export default AddCategory;
