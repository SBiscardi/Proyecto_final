const cards = [
  {
    label: "Equipos de alto rendimiento",
    imgPath: "/maquinas-ultima-tecnologia.jpg"
  },
  {
    label: "Area de pesas y maquinas",
    imgPath: "/zona-de-musculacion.webp"
  },
  {
    label: "Areas de cardio",
    imgPath: "/zona-de-cardio.webp"
  },
  {
    label: "Clases grupales",
    imgPath: "/salon-grupal.jpeg"
  }
]

const Explore = () => {
  return (
    <section className="space-y-8 w-full">
      <h2 className="text-3xl font-semibold text-center text-balance">
        Explora nuestras instalaciones con la mejor <span className="text-blue-400">tecnología</span> y el mejor <span className="text-blue-400">equipo</span>.
      </h2>
      <ul className="mt-6 gap-4 grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <li key={card.label} className="shadow border-2 border-transparent rounded hover:border-blue-400 transition-colors">
            <img src={card.imgPath} alt={card.label} className="w-full rounded-t" width={300} height={210} />
            <p className="p-2 font-semibold text-center text-balance text-black rounded-b bg-white">{card.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Explore