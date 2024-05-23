import Button from "@mui/material/Button"
import Input from "../components/Input"
import { Controller } from "react-hook-form"
import InputFile from "../components/InputFile"
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useForm } from "react-hook-form"
import useSignUp from "../lib/services/useSignUp"
import CircularProgress from '@mui/material/CircularProgress';

const imageTypes = ["image/png", "image/jpeg", "image/jpg"]

const signUpSchema = z.object({
  username: z.string().min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" }),
  email: z.string().email("El correo electrónico no es válido").refine(
    (email) => email.endsWith("@unab.edu.co"),
    { message: "El correo electrónico debe ser de la UNAB" }
  ),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  confirmPassword: z.string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .refine((data) => data !== data.password, { message: "Las contraseñas no coinciden" }),
  photo: z.any().refine((data) => {
    if (!data) return true
    return imageTypes.includes(data.type)
  }, {
    message: "El archivo debe ser una imagen",
  })
})

const SignUp = () => {
  const { isLoading, signUp } = useSignUp()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit = (data) => {
    if (isLoading) return
    signUp(data)
  }

  return (
    <main className="flex" style={{
      minHeight: "calc(100vh - 282px)",
    }} onSubmit={handleSubmit(onSubmit)}>
      <section className="container flex items-center justify-center px-6 m-auto">
        <form className="w-full max-w-md">
          <div className="flex items-center justify-center mt-6">
            <Link to="/iniciar-sesion" className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
              Iniciar sesión
            </Link>

            <Link to="/registrarse" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
              Registrarse
            </Link>
          </div>

          <Input
            {...register("username")}
            error={errors.username?.message}
            placeholder="Nombre de usuario"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />

          <Input
            {...register("email")}
            error={errors.email?.message}
            placeholder="Correo electrónico"
            type="email"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />

          <Input
            {...register("password")}
            error={errors.password?.message}
            type="password"
            placeholder="Contraseña"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />

          <Input
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            className="mt-4"
            type="password"
            placeholder="Contraseña"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
          <Controller
            name="photo"
            render={({ field }) => (
              <InputFile
                {...field}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.files[0])
                }}
              />
            )}
            control={control}
          />

          <div className="mt-6">
            <Button
              type="submit"
              disabled={isLoading}
              style={{
                fontWeight: 600
              }} variant="contained" className="w-full font-medium tracking-wide text-white capitalize">
              Registrarse
              {isLoading && (
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
            <div className="mt-6 text-center ">
              <Link to="/iniciar-sesion" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                ¿Ya tienes una cuenta?
              </Link>
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}

export default SignUp