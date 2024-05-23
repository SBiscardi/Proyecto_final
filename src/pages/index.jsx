import Carousel from "../components/Carousel";
import Explore from "../components/Explore";
import Rules from "../components/Rules";
import Time from "../components/Time";
import Button from "@mui/material/Button"
import useUser from "../lib/services/useUser";

const Page = () => {
  const user = useUser()

  return (
    <main>
      <div className="relative">
        <img src="main.jpg" alt="Gimnasio" className="w-full object-cover" style={{
          height: "calc(100vh - 102px)",
        }} />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 max-w-7xl m-auto items-end justify-center flex flex-col">
        <h1 className="text-white text-center text-[4rem] font-semibold">
            Entrena con nosotros
          </h1>
          <p className="text-white text-balance text-4xl font-semibold text-end">
            Nosotros te ayudamos a alcanzar tus metas
            con el mejor equipo y la mejor tecnología.
          </p>
          <p className="text-white text-balance text-2xl text-end mt-4">
            La clave es la constancia y la disciplina en el entrenamiento <br /> diario para alcanzar tus metas.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex items-center flex-col gap-4 pt-8 text-white space-y-24 pb-8">
        <Carousel />
        <Explore />
        <Button size="large" href={
          user ? "/calendario" :"/registrarse"
        } variant="contained" style={{
          fontWeight: 600,
          width: "100%",
          maxWidth: "600px",
          padding: "0.5rem",
          fontSize: "1.2rem",
        }}>
          {user
            ? "¡Comienza tu rutina!"
            : "¡Regístrate ahora!"
          }
        </Button>
        <Rules />
        <Time />
      </div>
    </main>
  );
}

export default Page