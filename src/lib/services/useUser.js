import { onAuthStateChanged } from "firebase/auth";
import { auth, db    } from "./firebase";
import queryClient from "./query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { QueryObserver } from '@tanstack/react-query'

const getUserInDB = async (email) => {
  try {
    if(!email) return null
    const q = query(collection(db, "usuarios"), where("email", "==", email))
    const querySnapshot = await getDocs(q)
    const user = querySnapshot.docs.map((doc) => doc.data())[0]
    return user
  } catch (e) {
    console.error("Error adding document: ", e);
    return null
  }
}

const useUser = () => {
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return queryClient.setQueryData(["user"], user)
      }

      const userData = await getUserInDB(user.email)
      queryClient.setQueryData(["user"], userData)
    })
  }, [])

  useEffect(() => {
    const observer = new QueryObserver(queryClient, { queryKey: ['user'] })

    observer.subscribe((result) => {
      if (result.status !== "success") return
      setCurrentUser(result.data)
    })
  }, [])

  return currentUser
}

export default useUser;