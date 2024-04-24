import { Link, useLoaderData } from 'react-router-dom'



export function loader() {
    return JSON.parse(localStorage.getItem('user'))
}

const Perfil = () => {
    const user = useLoaderData()
    return (
        <div className='px-5 space-y-4 max-w-[600px] mx-auto'>
            <h1 className=' text-neutral-800 text-2xl text-center'>Perfil</h1>
            <div className="flex justify-between text-xl">
                <p className='text-neutral-600'>Nombre:</p>
                <p className='text-neutral-800 font-bold'>{`${user.Nombre} ${user.PrimerApellido} ${user.SegundoApellido}`}</p>
            </div>
            <div className="flex justify-between text-xl">
                <p className='text-neutral-600'>Correo:</p>
                <p className='text-neutral-800 font-bold'>{user.Correo}</p>
            </div>
            <div className="flex justify-between text-xl">
                <p className='text-neutral-600'>Telefono:</p>
                <p className='text-neutral-800 font-bold'>{user.Telefono ?? 'Sin información'}</p>
            </div>
            <div className="flex justify-between text-xl">
                <p className='text-neutral-600'>Cuidad:</p>
                <p className='text-neutral-800 font-bold'>{user.Cuidad ?? 'Sin información'}</p>
            </div>

            <Link to={'/auth/login'} onClick={() => localStorage.removeItem('token')} className="w-full text-ce bg-red-700 py-3 text-white text-center hover:bg-red-900 max-w-96 mx-auto block">Cerrar Sesión</Link>
        </div>
    )
}
export default Perfil