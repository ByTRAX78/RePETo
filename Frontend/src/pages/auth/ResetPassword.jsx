import { useLoaderData, useActionData, Form, redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

import { resetPassword } from '../../data/authUsers'

import Error from '../../components/Error'


export async function action({request}) { 
    const formData = await request.formData()
    const password = formData.get('password')
    const password2 = formData.get('password2')
    const token = formData.get('token')
    let errores = []
    if(password.length < 8) {
        errores.push('La contraseña debe tener al menos 8 caracteres')
    }
    if(password.length > 16) {
        errores.push('La contraseña no debe tener más de 16 caracteres')
    }
    if(password != password2) {
        errores.push('Las contraseñas no coinciden')
    }
    if(Object.keys(errores).length) {
        return errores
    }
    const datos = { 'Contrasenia': password}
    const respuesta = await resetPassword(datos, token)
    if(!respuesta.status){  
        return [respuesta.mensaje]
    }
    Swal.fire({ 
        icon: 'success', 
        title: 'Se ha cambiado tu contraseña', 
        text: 'Inicia sesión con tu nueva contraseña',
        confirmButtonColor: '#65a30d'
    })
    return redirect('/auth/login')
}

export function loader({params}) { 
    return params.token
}

const ResetPassword = () => {
    const token = useLoaderData()
    const errores = useActionData()
    return (
        <>
            <h1 className="text-3xl font-bold text-center text-neutral-700">Reestablecer contraseña</h1>
            <p className="text-neutral-700 text-center text-lg">Crea una nueva contraseña</p>
            {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
            <Form method="POST" noValidate className="space-y-5 text-xl">
                <div>
                    <label className="text-neutral-700" htmlFor="password">Nueva Contraseña</label>
                    <input className="block w-full p-1 bg-neutral-200 rounded-md" type="password" id="password" name="password"/>
                </div>
                <div>
                    <label className="text-neutral-700" htmlFor="password2">Confirma Contraseña</label>
                    <input className="block w-full p-1 bg-neutral-200 rounded-md" type="password" id="password2" name="password2"/>
                </div>
                <input type="hidden" name='token' value={token}/>
                <input className="block w-2/3 mx-auto text-white bg-lime-600 rounded-md py-3 font-bold hover:bg-lime-800 transition-colors" type="submit" value='Guardar Contraseña' />
            </Form>
        </>
    )
}
export default ResetPassword