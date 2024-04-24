import { Link, useLoaderData } from "react-router-dom"
import QRCODE from 'react-qr-code'


export async function loader({params}) {
    return params.codigo
}

const Recompensa = () => {
    const codigo = useLoaderData()
    console.log(codigo);
      return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <p className="text-5xl text-neutral-100">Adquire tu recompensa con el siguiente QR </p>
            <QRCODE className="p-5 m-5 bg-white" value={`${import.meta.env.VITE_SERVER_URL}/canjear/${codigo}`} />
            <Link to="/maquina" className="px-32 text-center text-3xl block mx-auto text-white bg-lime-600 rounded-md py-3 font-bold hover:bg-lime-800 transition-colors">Ir a inicio</Link>
        </div>
    )
}
export default Recompensa