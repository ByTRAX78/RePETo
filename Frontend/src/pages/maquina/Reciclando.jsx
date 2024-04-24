import { useState, useEffect } from "react"
import { Form, redirect } from "react-router-dom"
import { getReciclando, terminarReciclado } from "../../data/maquinaServices"
import {ToastContainer, toast} from 'react-toastify';
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css';

export async function action() { 
    const data = await terminarReciclado()
    console.log(data);
    if(data.status){
        return redirect(`/maquina/recompensa/${data.reciclado}`)
    }
    Swal.fire({ 
        icon: 'error',
        title: 'Error',
        text: 'No se ingresaron botellas',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#a31f0d'
    })
    return redirect('/maquina')
}

const Reciclando = () => {
    const [total, setTotal] = useState(0)
    
    async function loopGetReciclando() { 
        const data = await getReciclando()
        setTotal(data.Total)
    }

    useEffect(() => {
       if(total > 0){ 
            toast.success('Botella ingresada', {
                position: "bottom-right",
                autoClose: 1200,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
       }
     }, [total])

    useEffect(() => { 
        loopGetReciclando();

        // Establece un intervalo para consultar el servicio cada 5 segundos
        const interval = setInterval(loopGetReciclando, 1000);
    
        // Limpia el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <ToastContainer className='text-3xl'/>
            <div className="text-white flex flex-col justify-center items-center h-full text-7xl ">
                <p className="text-white">Botellas ingresadas</p>
                <p className="font-bold text-9xl text-lime-300">{total}</p>
            </div>
            <Form method="POST" noValidate>
                <input className="px-32 text-3xl block w-full mx-auto text-white bg-lime-600 rounded-md py-3 font-bold hover:bg-lime-800 transition-colors" type="submit" value='Terminar' />
            </Form>
        </div>
    )
}
export default Reciclando