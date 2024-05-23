const rules = [
  {
    title: "Limpieza y orden",
    description: "Siempre debes limpiar y desinfectar los equipos después de usarlos. Mantén las pesas, las máquinas y las áreas de entrenamiento organizadas y libres de desorden. Esto ayuda a mantener un entorno seguro y agradable para todos los usuarios.",
  },
  {
    title: "Uso adecuado del equipo",
    description: "Aprende a utilizar correctamente el equipo y sigue las instrucciones de seguridad. Si no estás seguro de cómo utilizar una máquina o equipo, pide ayuda a un instructor o personal del gimnasio.",
  },
  {
    title: "Puntualidad",
    description: "Realiza reservas anticipadas para asegurar tu acceso al gimnasio en momentos de alta demanda. Además, cumple con el tiempo máximo de uso permitido en las áreas o equipos, especialmente durante las horas pico, para dar la oportunidad a otros miembros de disfrutar del gimnasio.",
  },
  {
    title: "Higiene personal",
    description: "Mantén una buena higiene personal al ir al gimnasio. Usa ropa y calzado adecuados, y lleva una toalla para limpiar tu sudor. También es importante utilizar desodorante y respetar las normas de higiene, como lavarte las manos antes y después de entrenar."
  }
]

const Rules = () => {
  return (
    <section>
      <h2 className="text-center text-balance text-3xl font-semibold">
        Recuerda tener un buen uso del gimnasio
      </h2>
      <p className="text-center text-balance my-2 text-gray-300 font-semibold">
        Reglas importantes para el uso del gimnasio
      </p>
      <ul className="flex flex-col gap-4 w-full max-w-4xl">
        {rules.map((rule, index) => (
          <li key={index} className="rounded bg-gray-600 p-4">
            <h3 className="font-semibold text-xl">{rule.title}</h3>
            <p className="text-gray-300 text-pretty">{rule.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Rules;