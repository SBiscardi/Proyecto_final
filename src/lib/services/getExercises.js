const API_KEY = import.meta.env.VITE_API_KEY

const getExercises = async (search = "") => {
  const response = await fetch(`https://api.api-ninjas.com/v1/exercises?name=${search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": API_KEY
    }
  })
  const data = await response.json()
  return data
}

export default getExercises