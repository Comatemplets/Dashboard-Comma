import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct } from "@/RTK/Slices/ProductSlice";

function VeiwProduct() {
  const router = useRouter();
  const { product_id } = router.query;
  const Products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetProduct());
  }, []);

  const Product = Products.filter((e) => {
    return e.id == product_id; // Find the product that matches the ID from the URL
  });
  return (
    <>
      {Product.map((Product) => {
        return (
          <div>
            <div className="flex justify-between flex-col md:flex-row mb-7">
              <h2 className="main-title">Product Details</h2>
              <div className="direction-head flex items-center gap-1 text-gray-500 dark:text-gray-100 text-small sm:text-xs">
                <Link href="/">Dashboard</Link>
                <i class="bx bx-chevron-right"></i>
                Products
                <i class="bx bx-chevron-right"></i>
                {Product.title}
              </div>
            </div>
            <div class="box-content">
              <div class="pt-6">
                {/* <!-- Image gallery --> */}
                <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                  <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={Product.images[2]}
                        alt="Model wearing plain black basic tee."
                        class="size-full object-cover object-center"
                      />
                    </div>
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={Product.images[1]}
                        alt="Model wearing plain gray basic tee."
                        class="size-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img
                      src={Product.images[0]}
                      alt="Model wearing plain white basic tee."
                      class="size-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* <!-- Product info --> */}
                <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                  <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
                      {Product.title}
                    </h1>
                  </div>

                  {/* <!-- Options --> */}
                  <div class="mt-4 lg:row-span-3 lg:mt-0 dark:text-gray-100">
                    <h2 class="sr-only">Product information</h2>
                    <p class="text-3xl tracking-tight text-gray-900 dark:text-gray-100">
                      ${Product.price}
                    </p>

                    {/* <!-- Reviews --> */}
                    <div class="mt-6">
                      <h3 class="sr-only">Reviews</h3>
                      <div class="flex items-center">
                        <div class="flex items-center">
                          {/* <!-- Active: "text-gray-900", Default: "text-gray-200" --> */}
                          <svg
                            class="size-5 shrink-0 text-gray-900 dark:text-gray-100"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon">
                            <path
                              fill-rule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <svg
                            class="size-5 shrink-0 text-gray-900 dark:text-gray-100"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon">
                            <path
                              fill-rule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <svg
                            class="size-5 shrink-0 text-gray-900 dark:text-gray-100"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon">
                            <path
                              fill-rule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <svg
                            class="size-5 shrink-0 text-gray-900 dark:text-gray-100"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon">
                            <path
                              fill-rule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <svg
                            class="size-5 shrink-0 text-gray-200 dark:text-gray-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon">
                            <path
                              fill-rule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <p class="sr-only">4 out of 5 stars</p>
                        <a
                          href="#"
                          class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          117 reviews
                        </a>
                      </div>
                    </div>

                    <form class="mt-10">
                      {/* <!-- Colors --> */}
                      <div>
                        <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Color
                        </h3>

                        <fieldset aria-label="Choose a color" class="mt-4">
                          <div class="flex items-center space-x-3">
                            {/* <!-- Active and Checked: "ring ring-offset-1" --> */}
                            {Product.color.map((e) => {
                              return (
                                <label
                                  aria-label="White"
                                  class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                                  <input
                                    type="radio"
                                    name="color-choice"
                                    value="White"
                                    class="sr-only"
                                  />
                                  <span
                                    aria-hidden="true"
                                    style={{ backgroundColor: e.colorCode }}
                                    class="size-8 rounded-full border border-black/10"></span>
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>
                      </div>

                      {/* <!-- Sizes --> */}
                      <div class="mt-10">
                        <div class="flex items-center justify-between">
                          <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Size
                          </h3>
                          <a
                            href="#"
                            class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Size guide
                          </a>
                        </div>

                        <fieldset aria-label="Choose a size" class="mt-4">
                          <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                            {/* <!-- Active: "ring-2 ring-indigo-500" --> */}

                            {Product.size.map((e) => {
                              return (
                                <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                                  <input
                                    type="radio"
                                    name="size-choice"
                                    value={e}
                                    class="sr-only"
                                  />
                                  <span>{e}</span>
                                  {/* <!--
                            Active: "border", Not Active: "border-2"
                            Checked: "border-indigo-500", Not Checked: "border-transparent"
                          --> */}
                                  <span
                                    class="pointer-events-none absolute -inset-px rounded-md"
                                    aria-hidden="true"></span>
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>
                      </div>

                      <button
                        type="submit"
                        class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-main px-8 py-3 text-base font-medium text-white hover:bg-main focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2">
                        Add to bag
                      </button>
                    </form>
                  </div>

                  <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    {/* <!-- Description and details --> */}
                    <div>
                      <h3 class="sr-only">Description</h3>

                      <div class="space-y-6">
                        <p class="text-base text-gray-900 dark:text-gray-100">
                          {Product.description}
                        </p>
                      </div>
                    </div>

                    <div class="mt-10">
                      <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Highlights
                      </h3>

                      <div class="mt-4">
                        <ul
                          role="list"
                          class="list-disc space-y-2 pl-4 text-sm">
                          <li class="text-gray-400">
                            <span class="text-gray-600 dark:text-gray-100">
                              Hand cut and sewn locally
                            </span>
                          </li>
                          <li class="text-gray-400">
                            <span class="text-gray-600 dark:text-gray-100">
                              Dyed with our proprietary colors
                            </span>
                          </li>
                          <li class="text-gray-400">
                            <span class="text-gray-600 dark:text-gray-100">
                              Pre-washed &amp; pre-shrunk
                            </span>
                          </li>
                          <li class="text-gray-400">
                            <span class="text-gray-600 dark:text-gray-100">
                              Ultra-soft 100% cotton
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="mt-10">
                      <h2 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Details
                      </h2>

                      <div class="mt-4 space-y-6">
                        <p class="text-sm text-gray-600 dark:text-gray-100">
                          The 6-Pack includes two black, two white, and two
                          heather gray Basic Tees. Sign up for our subscription
                          service and be the first to get new, exciting colors,
                          like our upcoming &quot;Charcoal Gray&quot; limited
                          release.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default VeiwProduct;
