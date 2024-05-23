import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import {
  useMutation
} from '@tanstack/react-query'
import queryClient from "./query";
import { showError } from "../notify";


const useSignIn = () => {
  const navigate = useNavigate()

  const {
    isPending,
    mutate,
  } = useMutation({
    mutationFn: ({ email, password }) => {
      return signInWithEmailAndPassword(auth, email, password)
    },
    onSuccess: (userCredentials) => {
      queryClient.setQueryData(["user"], userCredentials.user)
      return navigate("/calendario")
    },
    onError: (error) => {
      if (error.message === "INVALID_LOGIN_CREDENTIALS") {
        return showError("Credenciales inválidas")
      }
      return showError("Error al iniciar sesión")
    }
  })

  return {
    isLoading: isPending,
    signIn: mutate,
  }
}

export default useSignIn;