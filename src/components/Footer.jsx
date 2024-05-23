const Footer = () => {
  return (
    <footer className="mx-auto bg-secondary-dark text-white w-full">
      <div className="max-w-7xl flex flex-col sm:flex-row items-center justify-between p-4 h4:text-lg mx-auto gap-4">
        <div className="w-fit">
          <h4 className="font-bold text-lg">Nuestros medios</h4>
          <ul>
            <li><a target="_blank" href="http://video.unab.edu.co/">Unab tv</a></li>
            <li><a target="_blank" href="http://periodico15unab.blogspot.com.co/">Periodico 15</a></li>
            <li><a target="_blank" href="https://unab.edu.co/nosotros/soy-autonomo-tv">Soy autonomo TV</a></li>
            <li><a target="_blank" href="http://www.unabradio.com/">UNAB radio</a></li>
          </ul>
        </div>
        <div className="w-fit">
          <h4 className="font-bold text-lg">Sitios UNAB</h4>
          <ul>
            <li><a target="_blank" href="https://www.unab.edu.co/">Unab</a></li>
            <li><a target="_blank" href="http://www.institutocaldas.edu.co/">Instituto Caldas</a></li>
            <li><a target="_blank" href="https://unabvirtual.unab.edu.co/">UnabVirtual</a></li>
            <li><a target="_blank" href="http://www.ulibro.com/">Ulibro</a></li>
          </ul>
        </div>
        <div className="w-fit">
          <h4 className="font-bold text-lg">Redes sociales</h4>
          <ul>
            <li><a target="_blank" href="#">Facebook</a></li>
            <li><a target="_blank" href="#">Twitter</a></li>
            <li><a target="_blank" href="#">Instagram</a></li>
            <li><a target="_blank" href="#">Youtube</a></li>
            <li><a target="_blank" href="#">Linkedin</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer