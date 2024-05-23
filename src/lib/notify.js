import { toast } from "react-toastify"

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
}

export const showError = (msg, id) =>
  toast.error(msg, { ...toastConfig, toastId: id, delay: 50 })

export const showSuccess = (msg, id) =>
  toast.success(msg, { ...toastConfig, toastId: id, delay: 50 })
