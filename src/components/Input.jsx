import { forwardRef } from "react"
import { cn } from "../lib/utils"

const Input = forwardRef(({
  icon,
  className,
  error,
  ...props
}, ref) => {
  return (
    <div className={cn("relative flex items-center mt-8 w-full", className)}>
      <span className="absolute top-3.5">
        {icon}
      </span>

      <div className="w-full">
        <input {...props} ref={ref} className="block w-full py-3 bg-secondary-dark border rounded-lg px-11 text-gray-300 border-gray-600 focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        {error && (
          <span className="text-red-500 text-sm font-semibold">
            {error}
          </span>
        )}
      </div>
    </div>
  )
})

Input.displayName = "Input"

export default Input