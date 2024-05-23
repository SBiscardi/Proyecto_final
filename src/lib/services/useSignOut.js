import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import queryClient from "./query";

const useSignOut = () => {
  const navigate = useNavigate();

  const signOutUser = async () => {
    await signOut(auth);
    queryClient.setQueryData(["user"], null);
    navigate("/iniciar-sesion");
  };

  return signOutUser;
}

export default useSignOut;