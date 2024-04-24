import { Link, useLoaderData } from 'react-router-dom'

import { authMe } from '../data/authUsers'

export async function loader(){ 
    const response = await authMe()
    return response.status
}

const Home = () => {
    const IsUserLogged = useLoaderData()
    const date = new Date();
    const year = date.getFullYear();

    return (
        <>
            <div className="h-screen bg-[url('/img/fondo.jpg')] bg-cover bg-center ">
                <div className=" h-full from-transparent to-black/90 bg-gradient-to-b flex items-center flex-col justify-between md:justify-evenly">
                    <div className='flex justify-center w-full mt-10'>
                        <Link to='/' className='w-2/3 md:w-1/2 lg:w-1/3 mx-auto'>
                            <img src="img/REPETO-LOGO.png" alt="Logo de repeto"/>
                        </Link>
                    </div>
                    <div className='w-3/4 lg:w-2/3 xl:w-1/3 text-center text-white'>
                        <div className="flex flex-col items-center justify-center md:flex-row text-xl gap-3 mb-10">
                            {IsUserLogged ? (
                                <Link to='/app' className='text-white px-11 py-3 bg-lime-600 rounded-2xl w-full hover:bg-lime-800 transition-colors'>Abrir app</Link>
                            ) : (
                                <>
                                    <Link to='/auth/login' className='text-white px-11 py-3 bg-lime-600 rounded-2xl w-full hover:bg-lime-800 transition-colors'>Iniciar Sesión</Link>
                                    <div className='md:hidden flex items-center w-full px-10'>
                                        <hr className='w-1/2 bg-white'/>
                                        <p className='mx-2 text-sm'>ó</p>
                                        <hr className='w-1/2 bg-white'/>
                                    </div>
                                    <Link to='/auth/signup' className='text-white px-11 py-3 bg-lime-600 rounded-2xl w-full hover:bg-lime-800 transition-colors'>Registrarse</Link>
                                </>
                           )}
                        </div>
                        <p className='text-lg'>Todos los derechos reservados @{year}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home