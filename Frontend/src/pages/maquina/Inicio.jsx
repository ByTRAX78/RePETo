import { Link } from "react-router-dom"
import { iniciarReciclado } from "../../data/maquinaServices"

export default function Inicio() {



  return (
    <div className="h-full flex justify-center items-center">
      <Link onClick={iniciarReciclado} to='/maquina/reciclando' className="block bg-lime-600 py-10 px-40 text-white text-7xl hover:bg-lime-800">Inicia</Link>
    </div>
  )
}
