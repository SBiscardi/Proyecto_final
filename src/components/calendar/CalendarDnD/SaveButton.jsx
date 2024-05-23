import Button from "@mui/material/Button"
import { showError, showSuccess } from "../../../lib/notify"
import CircularProgress from '@mui/material/CircularProgress';
import {
  useMutation
} from '@tanstack/react-query'
import useUser from "../../../lib/services/useUser";
import { addDoc, collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../lib/services/firebase";

const saveColumns = async (columns, userId) => {
  const exerciseData = {
    columns,
    userId
  }
  try {
    const userColumnsQuery = query(collection(db, "ejercicios_usuarios"), where("userId", "==", userId))
    const userColumnsSnapshot = await getDocs(userColumnsQuery)
    const userColumns = userColumnsSnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))
    if (userColumns.length > 0) {
      const userColumnsId = userColumns[0].id
      await updateDoc(doc(db, "ejercicios_usuarios", userColumnsId), exerciseData)
      console.log("Document updated with ID: ", userColumnsId);
      return userColumnsId
    }
    const docRef = await addDoc(collection(db, "ejercicios_usuarios"), exerciseData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const SaveButton = ({ disabled, columns }) => {
  const user = useUser()
  const {
    isPending,
    mutate,
  } = useMutation({
    mutationFn: async () => {
      await saveColumns(columns, user.id)
    },
    onSuccess: () => {
      showSuccess("Ejercicios guardados exitosamente")
    },
    onError: (error) => {
      console.error(error)
      showError("Error al guardar, intente de nuevo")
    }
  })

  const isDisabled = disabled || user === undefined || isPending
  return (
    <div className="w-full flex justify-center">
      <Button disabled={isDisabled} size="large" type="button" onClick={mutate} variant="contained" sx={{
        fontWeight: 600,
        minWidth: 300,
      }}>
        Guardar
        {(isPending) && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Button>
    </div>
  )
}

export default SaveButton