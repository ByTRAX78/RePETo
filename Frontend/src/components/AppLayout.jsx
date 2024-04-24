import { useLoaderData, redirect, Outlet, Link, useLocation} from "react-router-dom"
import { authMe, getMe } from "../data/authUsers"

export async function loader() { 
    const response = await authMe()
    if(!response.status){
        return redirect('/auth/login')
    }
    const user = await getMe()
    if(user.status){ 
        return user.persona
    }
    return null
}

const AppLayout = () => {
    const user = useLoaderData()
    const location = useLocation();
    const isHome = location.pathname === '/app';
    const isPerfil = location.pathname === '/app/perfil';
    const isRecompensas = location.pathname === '/app/recompensas';
    return (
        <>
            <div className="h-screen flex flex-col justify-between lg:block lg:h-auto">
                <div className="bg-lime-600 text-white p-3 md:p-5 lg:p-7 flex justify-between">
                    <Link to='/' className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6'>
                        <img src="/img/REPETO-LOGO.png" alt="Logo de repeto"/>
                    </Link>
                    <Link to='/app/recompensas' className="text-center">
                        <p>Monedas Ecológicas</p>
                        <div className="flex justify-center items-center">
                            <p className="font-bold text-xl">{user?.TotalReciclado * 10}</p>
                            <img src="/img/hoja.png" alt="Moneda Ecológica" className="w-5 h-5"/>
                        </div>
                    </Link>
                </div>
                <div className="p-3 md:p-5 lg:p-7 overflow-y-scroll no-scrollbar lg:overflow-y-auto h-full w-full">
                    <Outlet context={{user}}/>
                </div>
                <div className=" bg-neutral-200 flex justify-around lg:hidden rounded-lg">
                    <div className={`w-1/3 border-r-2 border-neutral-400 p-3 ${isPerfil && 'bg-lime-600'}`}>
                        <Link to='/app/perfil'>
                            <img src="/img/user.png" alt="Perfil Logo" className={`w-[50px] m-auto ${isPerfil && 'filter invert'}`}/>
                        </Link>
                    </div>
                    <div className={`w-1/3 border-r-2 border-neutral-400 p-3 ${isHome && 'bg-lime-600'}`}>
                        <Link to='/app'>
                            <img src="/img/home.png" alt="Home Logo" className={`w-[50px] m-auto ${isHome && 'filter invert'}`}/>
                        </Link>
                    </div>
                    <div className={`w-1/3 p-3 ${isRecompensas && 'bg-lime-600'}`}>
                        <Link to='/app/recompensas'>
                            <img src="/img/recompensa.png" alt="Recompensa Logo" className={`w-[50px] m-auto ${isRecompensas && 'filter invert'}`}/>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AppLayout