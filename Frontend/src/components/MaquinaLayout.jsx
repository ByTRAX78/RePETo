import { Outlet } from 'react-router-dom'


const MaquinaLayout = () => {
    return (
        <div className='h-screen bg-[url("/img/fondo.jpg")]'>
            <div className='h-full w-full bg-black/50 flex flex-col  justify-center items-center'>
                <div className='w-full md:w-1/2 lg:w-1/3 mx-auto block'>
                    <img src="/img/REPETO-LOGO.png" alt="Logo de repeto"/>
                </div>
                <div className='h-2/3 overflow-y-scroll no-scrollbar'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default MaquinaLayout