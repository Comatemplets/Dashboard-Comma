// Navbar.js
import React, { useContext, useEffect, useRef, useState } from "react";
import DarkModeToggle from "../DarkModeToggle";

export const MobileContext = React.createContext(null);

function Navbar() {
  const { mobileClass, setMobileClass } = useContext(MobileContext);
  const [isMessageMenuOpen, setIsMessageMenuOpen] = useState(false);
  const [isAlertMenuOpen, setIsAlertMenuOpen] = useState(false);

  const messageMenuRef = useRef(null);
  const alertMenuRef = useRef(null);

  // Function to close menus if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        messageMenuRef.current &&
        !messageMenuRef.current.contains(event.target)
      ) {
        setIsMessageMenuOpen(false);
      }
      if (
        alertMenuRef.current &&
        !alertMenuRef.current.contains(event.target)
      ) {
        setIsAlertMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar-top bg-white dark:bg-boxDark m-4 drop-shadow-sm rounded-md relative z-50">
      <div className="mx-auto max-w-7xl  px-3">
        <div className="relative flex h-16 items-center justify-between w-full">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden z-10">
            {/* Mobile menu button */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2  dark:text-gray-100   h dark:hover:text-main "
              onClick={() => setMobileClass("mobile-sidebar")}
              aria-controls="mobile-menu">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="absolute w-full inset-y-0 right-0 flex gap-2 items-center justify-end pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="search-input relative hidden sm:block w-full h-full mr-3">
              <input
                className="outline-none mr-3 text-xs w-full h-full pl-12 dark:bg-boxDark"
                type="text"
                placeholder="search"
              />
              <i className="bx bx-search text-lg absolute top-2/4 -translate-y-2/4 left-5 text-gray-300"></i>
            </div>
            <DarkModeToggle />
            <div className="flex relative ">
              <div ref={alertMenuRef}>
                <button
                  onClick={() => setIsAlertMenuOpen((prev) => !prev)}
                  type="button"
                  className="nav-btn relative rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800  w-fit p-2 text-textblack hover:text-main">
                  <span className="flex justify-center items-center  absolute w-1.5 h-1.5 bg-main rounded-full  top-1 right-1 "></span>
                  <span className="sr-only">View notifications</span>
                  <i className="bx bx-bell text-md dark:text-gray-100"></i>
                </button>
                {isAlertMenuOpen && (
                  <div className="box-content absolute top-16 right-0 min-w-60 dark:text-gray-100  ">
                    <h2 className="mb-3">Notifications</h2>
                    <ul className="flex flex-col gap-3">
                      <li className="flex gap-2 ">
                        <span className="flex justify-center p-5 items-center w-8 h-8 rounded-full bg-main bg-opacity-20 text-main">
                          <i className="bx bxs-discount"></i>
                        </span>
                        <div className="text-small flex flex-col m">
                          <dive>Discount available</dive>
                          <dive className="text-gray-400  ">
                            Morbi sapien massa, ultricies at rhoncus at,
                            ullamcorper nec diam
                          </dive>
                        </div>
                      </li>
                      <li className="flex gap-2 ">
                        <span className="flex justify-center p-5 items-center w-8 h-8 rounded-full bg-main bg-opacity-20 text-main">
                          <i className="bx bxs-discount"></i>
                        </span>
                        <div className="text-small flex flex-col m">
                          <dive>Discount available</dive>
                          <dive className="text-gray-400  ">
                            Morbi sapien massa, ultricies at rhoncus at,
                            ullamcorper nec diam
                          </dive>
                        </div>
                      </li>
                      <li className="flex gap-2 ">
                        <span className="flex justify-center p-5 items-center w-8 h-8 rounded-full bg-main bg-opacity-20 text-main">
                          <i className="bx bxs-discount"></i>
                        </span>
                        <div className="text-small flex flex-col m">
                          <dive>Discount available</dive>
                          <dive className="text-gray-400  ">
                            Morbi sapien massa, ultricies at rhoncus at,
                            ullamcorper nec diam
                          </dive>
                        </div>
                      </li>
                      <li className="flex gap-2 ">
                        <span className="flex justify-center p-5 items-center w-8 h-8 rounded-full bg-main bg-opacity-20 text-main">
                          <i className="bx bxs-discount"></i>
                        </span>
                        <div className="text-small flex flex-col m">
                          <dive>Discount available</dive>
                          <dive className="text-gray-400  ">
                            Morbi sapien massa, ultricies at rhoncus at,
                            ullamcorper nec diam
                          </dive>
                        </div>
                      </li>
                    </ul>
                    <button className="w-full p-3 bg-main text-gray-100 rounded-md text-xs mt-3">
                      Veiw All
                    </button>
                  </div>
                )}
              </div>
              <div ref={messageMenuRef}>
                <button
                  onClick={() => setIsMessageMenuOpen((prev) => !prev)}
                  type="button"
                  className=" nav-btn relative rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800  w-fit p-2 text-textblack hover:text-main">
                  <span className="flex justify-center items-center absolute w-1.5 h-1.5 bg-main rounded-full top-1 right-1 "></span>
                  <span className="sr-only">View message</span>
                  <i class="bx bx-message-square-dots text-md dark:text-gray-100"></i>
                </button>
                {isMessageMenuOpen && (
                  <div className="box-content absolute top-16 right-0 min-w-60 dark:text-gray-100  ">
                    <h2 className="mb-3">Massege</h2>
                    <ul className="flex flex-col gap-3">
                      <li className="flex gap-2 ">
                        <span className="overflow-hidden w-8 h-8 rounded-full ">
                          <img
                            src="https://remosnextjs.vercel.app/images/avatar/user-12.png"
                            alt=""
                            srcset=""
                            className="w-full h-full"
                          />
                        </span>
                        <div className="text-small flex flex-col flex-1">
                          <a href="#">Ralph Edwards</a>
                          <div className="text-gray-400  ">
                            Are you there? interested i this...
                          </div>
                        </div>
                      </li>
                      <li className="flex gap-2 ">
                        <span className="overflow-hidden w-8 h-8 rounded-full ">
                          <img
                            src="https://remosnextjs.vercel.app/images/avatar/user-12.png"
                            alt=""
                            srcset=""
                            className="w-full h-full"
                          />
                        </span>
                        <div className="text-small flex flex-col flex-1">
                          <a href="#">Ralph Edwards</a>
                          <div className="text-gray-400  ">
                            Are you there? interested i this...
                          </div>
                        </div>
                      </li>
                      <li className="flex gap-2 ">
                        <span className="overflow-hidden w-8 h-8 rounded-full ">
                          <img
                            src="https://remosnextjs.vercel.app/images/avatar/user-12.png"
                            alt=""
                            srcset=""
                            className="w-full h-full"
                          />
                        </span>
                        <div className="text-small flex flex-col flex-1">
                          <a href="#">Ralph Edwards</a>
                          <div className="text-gray-400  ">
                            Are you there? interested i this...
                          </div>
                        </div>
                      </li>
                      <li className="flex gap-2 ">
                        <span className="overflow-hidden w-8 h-8 rounded-full ">
                          <img
                            src="https://remosnextjs.vercel.app/images/avatar/user-12.png"
                            alt=""
                            srcset=""
                            className="w-full h-full"
                          />
                        </span>
                        <div className="text-small flex flex-col flex-1">
                          <a href="#">Ralph Edwards</a>
                          <div className="text-gray-400  ">
                            Are you there? interested i this...
                          </div>
                        </div>
                      </li>
                    </ul>
                    <button className="w-full p-3 bg-main text-gray-100 rounded-md text-xs mt-3">
                      Veiw All
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile dropdown */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative w-8 h-8 flex rounded-full bg-gray-800 text-sm focus:outline-none  "
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-full rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
