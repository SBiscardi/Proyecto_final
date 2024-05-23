import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "./firebase";
import { useNavigate } from "react-router-dom";
import {
  useMutation,
} from '@tanstack/react-query'
import queryClient from "./query";
import { addDoc, collection } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { showError } from "../notify";

const uploadPhoto = async (photo) => {
  const storageRef = ref(storage, `images/${photo.name + Date.now()}`);
  await uploadBytes(storageRef, photo);
  const url = await getDownloadURL(storageRef);
  return url
}

const createUserInDB = async ({ email, id, username, photo }) => {
  const userData = {
    email,
    id,
    username
  }
  try {
    if (photo) {
      const photoURL = await uploadPhoto(photo)
      userData.photo = photoURL
    }
    const docRef = await addDoc(collection(db, "usuarios"), userData);
    console.log("Document written with ID: ", docRef.id);
    return userData
  } catch (e) {
    console.error("Error adding document: ", e);
    return null
  }
}
const useSignUp = () => {
  const navigate = useNavigate()

  const {
    isPending,
    mutate,
  } = useMutation({
    mutationFn: async ({ email, password, username, photo }) => {
      const authUser = await createUserWithEmailAndPassword(auth, email, password)
      const user = await createUserInDB({ email, id: authUser.user.uid, username, photo })

      return { user }
    },
    onSuccess: (userCredentials) => {
      console.log(userCredentials)
      queryClient.setQueryData(["user"], userCredentials.user)
      return navigate("/calendario")
    },
    onError: (error) => {
      console.error(error)
      showError("Error al crear usuario, intente de nuevo")
    }
  })

  return {
    isLoading: isPending,
    signUp: mutate,
  }
}

export default useSignUp;