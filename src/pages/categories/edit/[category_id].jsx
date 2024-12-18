import InputImg from "@/Components/imgInput";
import { GetCategory, UpdateCategory } from "@/RTK/Slices/CategorySlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as filestack from "filestack-js";
import { useRouter } from "next/router";
const client = filestack.init("AKjiyRQRqTUyrowyXJeAcz"); // Replace with your Filestack API key

function editCategory() {
  const ToDate = new Date();
  const router = useRouter();
  const { category_id } = router.query;
  const Category = useSelector((state) => state.category.category);
  const SingleCategory = Category.find(
    (e) => e.id == category_id // Find the product that matches the ID from the URL
  );
  console.log(SingleCategory);
  const dispatch = useDispatch();
  const [imageUrls, setImageUrls] = useState(SingleCategory?.image);
  const [uploading, setUploading] = useState(false);
  const [IsUploading, setIsUploading] = useState(false);
  const [IsUpdated, setIsUpdated] = useState(false);
  const [Quickveiw, setQuickveiw] = useState(false);
  // consts information SingleCategory
  const [CategoryName, setCategoryName] = useState(SingleCategory?.name || "");
  const [CategoryDescription, setCategoryDescription] = useState(
    SingleCategory?.description || ""
  );
  const [CategoryStock, setCategoryStock] = useState(
    SingleCategory?.stock || ""
  );
  const [CategoryCreation, setCategoryCreation] = useState(
    ToDate.toDateString()
  );

  useEffect(() => {
    dispatch(GetCategory());
  }, []);

  const handleUpload = async (event) => {
    const files = event.target.files;

    if (files.length === 0) {
      alert("Please select files!");
      return;
    }

    setUploading(true);

    try {
      for (const file of files) {
        const response = await client.upload(file);
        console.log("Uploaded file:", response);

        setImageUrls(response.url); // Add new URLs to the existing state
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload one or more files");
    } finally {
      setUploading(false);
      setIsUploading(true);
    }
  };

  const handleRemove = () => {
    setImageUrls("");
    setIsUploading(false);
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
    id: SingleCategory?.id,
    name: CategoryName,
    description: CategoryDescription,
    image: imageUrls,
    stock: CategoryStock,
    creationAt: CategoryCreation,
  };

  const handelUpdateCategory = (even) => {
    even.preventDefault();
    dispatch(UpdateCategory(DataObject));
    setIsUpdated(true);
    setQuickveiw(true);
    Toast.fire({
      icon: "success",
      title: "Category has been Update",
    });
  };

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row mb-7">
        <h2 className="main-title">Edit Category</h2>
        <div className="direction-head flex items-center gap-1 text-gray-500 dark:text-gray-100 text-small sm:text-xs">
          <Link href="/">Dashboard</Link> <i class="bx bx-chevron-right"></i>
          Categories
          <i class="bx bx-chevron-right"></i>Edit Category <a href=""></a>
        </div>
      </div>
      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="box-content flex-1 lg:max-w-80 ">
          <h2 className="text-textblack dark:text-gray-100 pb-2 font-semibold mb-5 ">
            Quick Preview
          </h2>

          <div className="flex justify-center items-center w-full h-80 rounded-md overflow-hidden bg-gray-100">
            {!imageUrls ? (
              <img
                src={SingleCategory?.image || "default-image.jpg"}
                alt="preview-img"
              />
            ) : (
              <img src={imageUrls} alt="preview-img" />
            )}
          </div>
          <h2 className="text-md my-3 font-semibold dark:text-gray-100">
            {CategoryName || SingleCategory?.name || "Default Title"}
          </h2>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 mb-3 dark:text-gray-100">
              <span className="text-xs ">Quantity:</span>
              <div className="flex gap-5 text-xs text-gray-500 dark:text-gray-100">
                {CategoryStock || SingleCategory?.stock || "Category Stock"}
              </div>
            </div>
            <div className="flex flex-col gap-2 dark:text-gray-100">
              <span className="text-xs">
                {IsUpdated ? "Updated At:" : "Creation At:"}
              </span>
              <div className="flex gap-5 text-xs text-gray-500 dark:text-gray-100">
                {IsUpdated ? CategoryCreation : SingleCategory?.creationAt}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 w-full flex-col flex-1">
          <div className="box-content">
            <div className="main-img mb-4">
              <h2 className="text-textblack dark:text-gray-100 pb-2 font-semibold mb-5 ">
                Upload Images
              </h2>

              <InputImg handleUpload={handleUpload} uploading={uploading} />
            </div>
            <div className="other-img ">
              {IsUploading && (
                <>
                  <h3 className="text-xs text-gray-500 dark:text-gray-100 mb-2">
                    Main Image
                  </h3>
                  <div className="flex gap-2">
                    <div className="group relative flex justify-center items-center overflow-hidden w-32 h-32 rounded-md ">
                      <img
                        src={imageUrls}
                        alt={`Uploaded `}
                        style={{
                          maxWidth: "150px",
                          maxHeight: "150px",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        onClick={() => handleRemove()}
                        className="absolute translate-center text-white text-xl bg-black bg-opacity-20 w-full h-full scale-0 group-hover:scale-100 transition duration-200">
                        <i className="bx bx-x"></i>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <form
            className="box-content flex-1"
            onSubmit={(even) => handelUpdateCategory(even)}>
            <h2 className="text-textblack dark:text-gray-100 border-b pb-2 font-semibold mb-5 ">
              Category Information
            </h2>
            <div className="flex gap-2 w-full mb-4">
              <div className=" w-full ">
                <label for="product_name" class="label-style">
                  Category Name
                </label>
                <input
                  type="text"
                  id="product_name"
                  class="input-style"
                  placeholder={SingleCategory?.name || "Item name"}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full mb-4">
              <label for="Description" class="label-style">
                Description
              </label>
              <textarea
                onChange={(e) => setCategoryDescription(e.target.value)}
                class="!h-32 input-style"
                name="Description"
                placeholder={
                  SingleCategory?.description ||
                  "Short desctiption about the product"
                }
                id="Description"></textarea>
            </div>
            <div className="w-full mb-4">
              <label for="stock" class="label-style">
                Stock
              </label>
              <input
                onChange={(e) => setCategoryStock(e.target.value)}
                class="input-style"
                type="number"
                name="Stock"
                placeholder={SingleCategory?.stock || "quantity"}
                id="Stock"
              />
            </div>

            <div className="submit-content flex justify-end gap-2">
              <button
                type="submit"
                className="p-2 rounded-sm text-xs bg-main  text-white">
                Edit Category
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
export default editCategory;
