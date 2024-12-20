import InputImg from "@/Components/imgInput";
import { GetCategory } from "@/RTK/Slices/CategorySlice";
import { GetColors } from "@/RTK/Slices/ColorSlice";
import {
  AddNewProduct,
  GetProduct,
  UpdateProduct,
} from "@/RTK/Slices/ProductSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as filestack from "filestack-js";
import { useRouter } from "next/router";
import { GetBadges } from "@/RTK/Slices/BadgesSlice";
const client = filestack.init("AKjiyRQRqTUyrowyXJeAcz"); // Replace with your Filestack API key

function editProduct() {
  const router = useRouter();
  const { product_id } = router.query;
  const Products = useSelector((state) => state.products.products);
  const Product = Products.find(
    (e) => e.id == product_id // Find the product that matches the ID from the URL
  );
  const dispatch = useDispatch();
  const Category = useSelector((state) => state.category.category);
  const Colors = useSelector((state) => state.colors.colors);
  const badges = useSelector((state) => state.badges.badges);
  const [imageUrls, setImageUrls] = useState(
    Array.isArray(Product?.images) ? [...Product?.images] : []
  );
  const [uploading, setUploading] = useState(false);
  // consts information product
  const [Quickveiw, setQuickveiw] = useState(false);
  const [ProdctName, setProdctName] = useState(Product?.title || "");
  const [ProdctCategory, setProdctCategory] = useState(Product?.category || "");
  const [ProdctBrand, setProdctBrand] = useState(Product?.brand || "");
  const [ProdctWeight, setProdctWeight] = useState(Product?.weight || "");
  const [ProdctGender, setProdctGender] = useState(Product?.gender || "");
  const [ProdctState, setProdctState] = useState(Product?.state || "");
  const [ProdctSizes, setProdctSizes] = useState(
    Array.isArray(Product?.images) ? [...Product?.size] : []
  );
  const [ProdctColors, setProdctColors] = useState(
    Array.isArray(Product?.images) ? [...Product?.color] : []
  );
  const [ProdctDescription, setProdctDescription] = useState(
    Product?.description || ""
  );
  const [ProdctStock, setProdctStock] = useState(Product?.stock || "");
  const [ProdctPrice, setProdctPrice] = useState(Product?.price || 0);
  const [ProdctDiscount, setProdctDiscount] = useState(Product?.discount || 0);
  const [ProdctBadge, setProdctBadge] = useState([]);
  console.log(Products);
  useEffect(() => {
    dispatch(GetCategory());
    dispatch(GetColors());
    dispatch(GetProduct());
    dispatch(GetBadges());
  }, []);

  console.log(Product);
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
    id: Product?.id,
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

  const handelUpdateProduct = (even) => {
    even.preventDefault();
    dispatch(UpdateProduct(DataObject));
    setQuickveiw(true);
    // Toast.fire({
    //   icon: "success",
    //   title: "Product has been Update",
    // });
  };

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row mb-7">
        <h2 className="main-title">Edit Product</h2>
        <div className="direction-head flex items-center gap-1 text-gray-500 dark:text-gray-100 text-small sm:text-xs">
          <Link href="/">Dashboard</Link> <i class="bx bx-chevron-right"></i>
          Products
          <i class="bx bx-chevron-right"></i>Edit Product <a href=""></a>
        </div>
      </div>
      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="box-content flex-1 lg:max-w-80 ">
          <h2 className="text-textblack dark:text-gray-100  pb-2 font-semibold mb-5 ">
            Quick Preview
          </h2>

          <div className="flex justify-center items-center w-full h-80 rounded-md overflow-hidden bg-gray-100">
            {!imageUrls[0] ? (
              <img
                src={Product?.images?.[0] || "default-image.jpg"}
                alt="preview-img"
              />
            ) : (
              <img src={imageUrls[0]} alt="preview-img" />
            )}
          </div>
          <h2 className="text-md dark:text-gray-100  my-3 font-semibold">
            {ProdctName || Product?.title || "Default Title"}
          </h2>
          <div className="flex flex-col gap-2 dark:text-gray-100 ">
            <span className="text-xs">Price:</span>
            <div className="flex gap-5">
              <del className="text-gray-500">
                {ProdctPrice || Product?.price || "Default price"}$
              </del>
              <span>
                {ProdctPrice - (ProdctDiscount / 100) * ProdctPrice ||
                  Product?.price - (Product?.discount / 100) * Product?.price ||
                  "Default price"}
                $
              </span>
            </div>
          </div>
          <div className="mt-5 dark:text-gray-100 ">
            <span className="text-xs">Sizes:</span>
            <div className="flex gap-3 flex-wrap mt-2">
              {ProdctSizes?.length > 0 ? (
                ProdctSizes.map((e, index) => (
                  <div
                    key={`size-${index}`}
                    className="flex justify-center items-center w-9 h-9 text-xs text-gray-500 dark:text-gray-100  p-3 border rounded-md uppercase">
                    {e}
                  </div>
                ))
              ) : Array.isArray(Product?.size) && Product.size.length > 0 ? (
                Product.size.map((e, index) => (
                  <div
                    key={`size-${index}`}
                    className="flex justify-center items-center w-9 h-9 text-xs text-gray-500 dark:text-gray-100  p-3 border rounded-md uppercase">
                    {e}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-100  text-sm">
                  No sizes available
                </p>
              )}
            </div>
          </div>
          <div className="mt-5 dark:text-gray-100 ">
            <span className="text-xs">Colors:</span>
            <div className="flex gap-3 flex-wrap mt-2">
              {ProdctColors?.length > 0 ? (
                ProdctColors.map((e, index) => (
                  <div
                    key={e}
                    style={{ backgroundColor: e.colorCode }}
                    className="flex justify-center items-center w-7 h-7 text-xs text-gray-500 p-3 border rounded-full uppercase"></div>
                ))
              ) : Array.isArray(Product?.color) && Product.color.length > 0 ? (
                Product.color.map((e, index) => (
                  <div
                    key={e}
                    style={{ backgroundColor: e.colorCode }}
                    className="flex justify-center items-center w-7 h-7 text-xs text-gray-500 p-3 border rounded-full uppercase"></div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-100  text-sm">
                  No colors available
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-5 w-full flex-col flex-1">
          <div className="box-content">
            <div className="main-img mb-4">
              <h2 className="text-textblack pb-2 font-semibold mb-5 dark:text-gray-100">
                Upload Images
              </h2>

              <InputImg handleUpload={handleUpload} uploading={uploading} />
            </div>
            <div className="other-img ">
              {imageUrls.length > 0 && (
                <>
                  <h3 className="text-xs text-gray-500 mb-2 dark:text-gray-100">
                    All Images
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
            className="box-content flex-1 "
            onSubmit={(even) => handelUpdateProduct(even)}>
            <h2 className="text-textblack dark:text-gray-100  border-b pb-2 font-semibold mb-5 ">
              Product Information
            </h2>
            <div className="flex gap-2 w-full mb-4">
              <div className=" w-full ">
                <label for="product_name" class="label-style ">
                  Product Name
                </label>
                <input
                  type="text"
                  id="product_name"
                  class="input-style"
                  placeholder={Product?.title || "Item name"}
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
                      <option
                        key={e.id}
                        value={e.name}
                        selected={e.name === Product?.category}>
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
                  placeholder={Product?.brand || "Brand Name"}
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
                  placeholder={Product?.weight || "in Gm & Kg"}
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
                  value={Product?.gender || "Select Gender"}
                  className="input-style">
                  <option disabled value="Select Gender">
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
                  value={Product?.state || "Select Gender"}
                  id="State"
                  class="input-style">
                  <option selected disabled>
                    Select State
                  </option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>{" "}
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
                <div class="flex items-center pr-2">
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
                <div class="flex items-center pr-2">
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
                <div class="flex items-center pr-2">
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
                <div class="flex items-center pr-2">
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
                <div class="flex items-center pr-2">
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
                <div class="flex items-center pr-2">
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
              <span className="block text-xs mb-2 text-gray-500 dark:text-gray-100">
                Colors:
              </span>
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
                        value={e.name}
                        style={{ backgroundColor: e.colorCode }}
                        class={`w-6 h-6 appearance-none  cursor-pointer  border border-gray-300  dark:border-none checked:outline-2 checked:outline checked:outline-gray-200 dark:checked:outline-gray-100 rounded-full `}
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
                placeholder={
                  Product?.description || "Short desctiption about the product"
                }
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
                placeholder={Product?.stock || "quantity"}
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
                  placeholder={Product?.price || "000"}
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
                  class="input-style"
                  type="number"
                  name="Discount"
                  placeholder={Product?.discount || "000"}
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
                Edit Product
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
export default editProduct;
