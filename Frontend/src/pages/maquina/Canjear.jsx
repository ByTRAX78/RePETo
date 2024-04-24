import {useLoaderData, redirect} from "react-router-dom"
import { asignarReciclado } from "../../data/maquinaServices"
import Swal from "sweetalert2"

export async function loader({params}) {  
    const token = JSON.parse(localStorage.getItem('token'))
    if(token){ 
        const data = await asignarReciclado({'Reciclado': params.codigo}, token)
        if(data.status){
            Swal.fire({
                icon: 'success',
                title: 'Código canjeado',
                text: 'Se ha canjeado el código correctamente',
                confirmButtonColor: '#65a30d'
            })
            return redirect('/app')
        }
    } else {
        localStorage.setItem('redirect', '/canjear/'+params.codigo)
        return redirect('/auth/login')
    }
    
    return params.codigo
}

const Canjear = () => {
    const codigo = useLoaderData()
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-3xl text-red-600">Código canjeado</h1>
            <p>{codigo}</p>
        </div>
    )
}
export default Canjear