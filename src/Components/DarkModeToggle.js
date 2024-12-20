import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    // Get the theme from localStorage on component mount
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleToggle = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <label class="w-9 h-9 relative cursor-pointer  nav-btn rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800  p-2 text-textblack hover:text-main ">
      <input
        checked={isDarkMode}
        onChange={handleToggle}
        class="peer hidden"
        id="toggle"
        type="checkbox"
      />
      <i className="bx bx-sun text-md absolute  hover:text-main top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2  dark:text-gray-100 hidden opacity-0 peer-checked:opacity-100 peer-checked:block transition duration-200"></i>
      <i className="bx bx-moon text-md absolute  hover:text-main  top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2  dark:text-gray-100 peer-checked:opacity-0 peer-checked:hidden transition duration-200  "></i>
    </label>
  );
};

export default DarkModeToggle;
