function InputImg(props) {
  return (
    <form class="flex items-center  justify-center w-full">
      <label
        for="dropzone-file"
        class="flex flex-col items-center min-h-36 justify-center w-full p-2 border-2 dark:bg-inputDark text-gray-400 dark:text-gray-100 hover:text-main dark:hover:text-main dark:hover:border-main  border-dashed rounded-lg cursor-pointer border-gray-300 dark:border-gray-100 hover:border-main bg-background">
        {props.uploading ? (
          <div>
            <div class="flex flex-row gap-2">
              <div class="w-2 h-2 rounded-full bg-main animate-bounce"></div>
              <div class="w-2 h-2 rounded-full bg-main animate-bounce [animation-delay:-.3s]"></div>
              <div class="w-2 h-2 rounded-full bg-main animate-bounce [animation-delay:-.5s]"></div>
            </div>
            <h3 className="mt-3 text-center text-xs">Loading ...</h3>
          </div>
        ) : (
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-7 h-7 mb-4  "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-small sm:text-xs ">
              <span class="font-semibold">Click to upload</span>
            </p>
            <p class="text-small text-center ">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        )}

        <input
          id="dropzone-file"
          type="file"
          class="hidden"
          onChange={props.handleUpload}
          accept="image/*"
        />
      </label>
    </form>
  );
}
export default InputImg;
