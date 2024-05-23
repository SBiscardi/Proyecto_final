import { cn } from "../lib/utils"

const InputFile = ({
  value,
  ...props
}) => {
  return (
    <label htmlFor="dropzone-file" className={cn("flex items-center px-3 py-3 mx-auto mt-6 text-center bg-secondary-dark border-2 rounded-lg cursor-pointer border-gray-600",
      value ? "border" : "border-dashed")}>
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>

      <h2 className="mx-3 text-gray-400">
        {value?.name ? value.name : "Profile Photo"}
      </h2>

      <input id="dropzone-file" type="file" className="hidden" accept="image/*" {...props} />
    </label>
  )
}

export default InputFile