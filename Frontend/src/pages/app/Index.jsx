import { useOutletContext, useLoaderData  } from 'react-router-dom'
import { getReciclados } from '../../data/userServices'

export async function loader() { 
    const datos = await getReciclados()
    return datos
}

const Index = () => {
    const reciclados = useLoaderData()
    
    return (
       <div className='max-w-[600px] mx-auto'>
        <div className='h-1/2 bg-neutral-300 p-3 flex flex-col text-xl'>
            <h2 className='text-neutral-800 text-2xl text-center'>Resumen</h2>
            <div className='flex h-1/2'>
                <div className="w-1/2 flex justify-center items-center">
                    <img src="/img/botella.png" alt=""  className='w-1/2 max-w-16'/>
                </div>
                <div className='w-1/2 text-xl flex flex-col justify-center items-center'>
                    <p className='text-center'>Botellas recicladas</p>
                    <p  className='font-bold text-2xl text-lime-600'>{reciclados.Suma}</p>
                </div>
            </div>
            <div className='flex h-1/2'>
                <div className="w-1/2 flex justify-center items-center">
                    <img src="/img/qr.png" alt=""  className='w-1/2 max-w-16'/>
                </div>
                <div className='w-1/2 text-xl flex flex-col justify-center items-center'>
                    <p className='text-center'>Veces que has reciclado</p>
                    <p className='font-bold text-2xl text-lime-600'>{reciclados.Total}</p>
                </div>
            </div>
        </div>
        <div className='bg-neutral-300 p-3 space-y-2 mt-2'>
            <h2 className='text-neutral-800 text-2xl text-center'>Historial</h2>
            {
                reciclados.reciclado.map((reciclado) => {
                    return (
                        <div key={reciclado.Oid} className='flex justify-between items-center p-3 bg-white rounded-lg shadow-lg'>
                            <p>{reciclado.Fecha}</p>
                            <p><span className='text-lime-600 font-bold'>{reciclado.Cantidad}</span> botellas recicladas </p>
                        </div>
                    )
                })
            }
        </div>
       </div>
       
    )
}
export default Index