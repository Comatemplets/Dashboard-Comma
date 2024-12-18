import Link from "next/link";

export default function SignUp() {
  return (
    <div class="box-content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-64 sm:w-96 flex flex-col p-4 rounded-md text-black bg-white">
      <div class="text-2xl font-bold mb-2 text-[#1e0e4b] dark:text-gray-100 text-center">
        Welcome to our <span class="text-[#7747ff]">App</span>
      </div>
      <div class="text-sm dark:text-gray-100 font-normal mb-4 text-center text-[#1e0e4b]">
        Register for our great service
      </div>
      <form class="flex flex-col gap-3">
        <div class="block relative">
          <label
            for="username"
            class="block label-style text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            class="rounded input-style border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
          />
        </div>
        <div class="block relative">
          <label
            for="email"
            class="block label-style text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            class="rounded input-style border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
          />
        </div>
        <div class="block relative">
          <label
            for="password"
            class="block label-style text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
            Password
          </label>
          <input
            type="text"
            id="password"
            class="rounded input-style border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
        </div>
        <div class="block relative">
          <label
            for="Confirmpassword"
            class="block label-style text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
            Confirm password
          </label>
          <input
            type="text"
            id="Confirmpassword"
            class="rounded input-style border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
        </div>
        <button
          type="submit"
          class="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">
          Submit
        </button>
      </form>
      <div class="text-sm text-center mt-[1.6rem] dark:text-gray-100">
        if you have an account?{" "}
        <Link class="text-sm text-[#7747ff]" href="/login">
          Login here !
        </Link>
      </div>
    </div>
  );
}
