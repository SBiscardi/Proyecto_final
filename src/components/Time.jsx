const Time = () => {
  return <section className="flex gap-12 w-full items-center justify-center flex-col md:flex-row">
    <img src="/OIG.jpg" width={300} height={300} alt="Horario" className="object-cover" />
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-5xl text-balance leading-tight">
        Horario <br /> disponible
      </h2>
      <p className="text-pretty text-gray-300">
        Abierto de lunes a viernes de 6:00 a.m. a 10:00 p.m. <br />
        Sábados de 8:00 a.m. a 4:00 p.m. <br />
        Domingos de 9:00 a.m. a 2:00 p.m.
      </p>
    </div>
  </section>
}

export default Time