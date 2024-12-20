// Navbar.js
import React, { useContext, useEffect, useRef, useState } from "react";
import DarkModeToggle from "../DarkModeToggle";

export const MobileContext = React.createContext(null);

function Navbar() {
  const { mobileClass, setMobileClass } = useContext(MobileContext);
  const [isMessageMenuOpen, setIsMessageMenuOpen] = useState(false);
  const [isAlertMenuOpen, setIsAlertMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const messageMenuRef = useRef(null);
  const alertMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

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
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar-top bg-white dark:bg-boxDark m-4 drop-shadow-sm rounded-md relative z-10">
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
            <div className="flex relative ">
              <DarkModeToggle />
              <div ref={alertMenuRef}>
                <button
                  onClick={() => setIsAlertMenuOpen((prev) => !prev)}
                  type="button"
                  className="w-9 h-9 relative cursor-pointer  nav-btn rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800  p-2 text-textblack hover:text-main ">
                  <span className="flex justify-center items-center  absolute w-1.5 h-1.5 bg-main rounded-full  top-1 right-1 "></span>
                  <span className="sr-only">View notifications</span>
                  <i className="bx bx-bell text-md dark:text-gray-100"></i>
                </button>
                {isAlertMenuOpen && (
                  <div className="box-content absolute top-16 sm:right-0 -right-8 sm:min-w-60 min-w-52 dark:text-gray-100  ">
                    <h2 className="mb-3">Notifications</h2>
                    <ul className="flex flex-col gap-3">
                      <li className="flex gap-2 ">
                        <span className="flex justify-center p-5 items-center w-8 h-8 rounded-full bg-main bg-opacity-20 text-main">
                          <i className="bx bxs-discount"></i>
                        </span>
                        <div className="text-small flex flex-col m">
                          <div>Discount available</div>
                          <div className="text-gray-400  ">
                            Morbi sapien massa, ultricies at rhoncus at,
                            ullamcorper nec diam
                          </div>
                        </div>
                      </li>
                      <li className="flex gap-2 ">
                        <span className="flex justify-center p-5 items-center w-8 h-8 rounded-full bg-main bg-opacity-20 text-main">
                          <i class="bx bx-user-voice"></i>
                        </span>
                        <div className="text-small flex flex-col m">
                          <div>Account has been verified</div>
                          <div className="text-gray-400  ">
                            Morbi sapien massa, ultricies at rhoncus at,
                            ullamcorper nec diam
                          </div>
                        </div>
                      </li>
                      <li className="flex gap-2 ">
                        <span className="flex justify-center p-5 items-center w-8 h-8 rounded-full bg-main bg-opacity-20 text-main">
                          <i class="bx bxs-package"></i>
                        </span>
                        <div className="text-small flex flex-col m">
                          <div>Order shipped successfully</div>
                          <div className="text-gray-400  ">
                            Morbi sapien massa, ultricies at rhoncus at,
                            ullamcorper nec diam
                          </div>
                        </div>
                      </li>
                      <li className="flex gap-2 ">
                        <span className="flex justify-center p-5 items-center w-8 h-8 rounded-full bg-main bg-opacity-20 text-main">
                          <i class="bx bxs-truck"></i>
                        </span>
                        <div className="text-small flex flex-col m">
                          <div>
                            Order pending:
                            <span className="text-main"> ID 305830</span>
                          </div>
                          <div className="text-gray-400  ">
                            Morbi sapien massa, ultricies at rhoncus at,
                            ullamcorper nec diam
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
              <div ref={messageMenuRef}>
                <button
                  onClick={() => setIsMessageMenuOpen((prev) => !prev)}
                  type="button"
                  className="w-9 h-9 relative cursor-pointer  nav-btn rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800  p-2 text-textblack hover:text-main ">
                  <span className="flex justify-center items-center absolute w-1.5 h-1.5 bg-main rounded-full top-1 right-1 "></span>
                  <span className="sr-only">View message</span>
                  <i class="bx bx-message-square-dots text-md dark:text-gray-100"></i>
                </button>
                {isMessageMenuOpen && (
                  <div className="box-content absolute top-16 sm:right-0 -right-8 sm:min-w-60 min-w-52 dark:text-gray-100  ">
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
                            src="https://remosnextjs.vercel.app/images/avatar/user-11.png"
                            alt=""
                            srcset=""
                            className="w-full h-full"
                          />
                        </span>
                        <div className="text-small flex flex-col flex-1">
                          <a href="#">Cameron Williamson</a>
                          <div className="text-gray-400  ">Hello!</div>
                        </div>
                      </li>
                      <li className="flex gap-2 ">
                        <span className="overflow-hidden w-8 h-8 rounded-full ">
                          <img
                            src="https://remosnextjs.vercel.app/images/avatar/user-13.png"
                            alt=""
                            srcset=""
                            className="w-full h-full"
                          />
                        </span>
                        <div className="text-small flex flex-col flex-1">
                          <a href="#">Eleanor Pena</a>
                          <div className="text-gray-400  ">
                            Interested in this loads?
                          </div>
                        </div>
                      </li>
                      <li className="flex gap-2 ">
                        <span className="overflow-hidden w-8 h-8 rounded-full ">
                          <img
                            src="https://remosnextjs.vercel.app/images/avatar/user-1.png"
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
              <div ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  type="button"
                  className="relative w-8 h-8 flex rounded-full  text-sm focus:outline-none  "
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-full rounded-full"
                    src="https://remosnextjs.vercel.app/images/avatar/user-1.png"
                    alt=""
                  />
                </button>
                {isProfileMenuOpen && (
                  <div className="box-content absolute top-16 right-0 min-w-40 dark:text-gray-100  ">
                    <h2 className="mb-3">Welcome Gaston!</h2>
                    <ul className="flex flex-col gap-3">
                      <li className="flex gap-2 items-center text-xs text-textblack dark:text-gray-100 dark:hover:bg-inputDark hover:bg-gray-100 rounded-md cursor-pointer ">
                        <span className="flex justify-center p-2 ">
                          <i class="bx bx-user-circle text-lg"></i>
                        </span>
                        <div className="">
                          <div>Profile</div>
                        </div>
                      </li>
                      <li className="flex gap-2 items-center text-xs text-textblack dark:text-gray-100 dark:hover:bg-inputDark hover:bg-gray-100 rounded-md cursor-pointer ">
                        <span className="flex justify-center p-2 ">
                          <i class="bx bx-envelope text-lg"></i>
                        </span>
                        <div className="">
                          <div>Masseges</div>
                        </div>
                      </li>
                      <li className="flex gap-2 items-center text-xs text-textblack dark:text-gray-100 dark:hover:bg-inputDark hover:bg-gray-100 rounded-md cursor-pointer ">
                        <span className="flex justify-center p-2 ">
                          <i class="bx bx-wallet text-lg"></i>
                        </span>
                        <div className="">
                          <div>Pricing</div>
                        </div>
                      </li>
                      <li className="flex gap-2 items-center text-xs text-textblack dark:text-gray-100 dark:hover:bg-inputDark hover:bg-gray-100 rounded-md cursor-pointer ">
                        <span className="flex justify-center p-2 ">
                          <i class="bx bx-help-circle text-lg"></i>
                        </span>
                        <div className="">
                          <div>Help</div>
                        </div>
                      </li>
                      <li className="flex gap-2 items-center text-xs text-red-700 cursor-pointer ">
                        <span className="flex justify-center p-2 ">
                          <i class="bx bx-log-out text-lg"></i>
                        </span>
                        <div className="">
                          <div>Log out</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
