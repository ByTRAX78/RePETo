import { Outlet, Link, redirect } from 'react-router-dom'

import { authMe } from '../data/authUsers'

export async function loader(){ 
    const response = await authMe()
    if(response.status){
        return redirect('/')
    }
    return null
}

const AuthLayout = () => {
    return (
        <>
            <div className='flex justify-between flex-row-reverse p-8'>
                <Link to='/' className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6'>
                    <img src="/img/REPETO-LOGO.png" alt="Logo de repeto"/>
                </Link>
            </div>
            <div className='container mx-auto w-4/5 md:w-2/3 lg:w-1/2 xl:w-2/5 my-5 space-y-3'>
                <Outlet></Outlet>
            </div>
        </>
    )
}
export default AuthLayout