import { Link, useActionData, Form, redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

import { forgotPassword } from '../../data/authUsers'

import Error from '../../components/Error'


export async function action({request}) {
    const formData = await request.formData()
    const correo = formData.get('correo')
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(correo)) return 'Correo inválido'
    const respuesta = await forgotPassword({'correo': correo})
    if(!respuesta.status) return respuesta.mensaje	
    Swal.fire({ 
        icon: 'success', 
        title: 'Correo enviado', 
        text: 'Se ha enviado un correo a tu dirección de correo electrónico, sigue las instrucciones para recuperar tu contraseña',
        confirmButtonColor: '#65a30d'
    })
    return redirect('/')
 }

const ForgotPassword = () => {
    const error = useActionData()

    return (
        <>
            <h1 className="text-3xl font-bold text-center text-neutral-700">Recupera tu contraseña</h1>
            <p className="text-neutral-700 text-center text-lg">Ingresa tu correo electrónico, para mandar el correo de recuperación</p>
            {error &&  <Error>{error}</Error>}
            <Form method="POST" noValidate className="space-y-5 text-xl">
                <div>
                    <label className="text-neutral-700" htmlFor="correo">Correo electrónico</label>
                    <input className="block w-full p-1 bg-neutral-200 rounded-md" type="text" id="correo" name="correo"/>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-3">
                    <Link to="/auth/signup" className="block text-center text-lime-600 hover:text-lime-800 transition-colors">¿Aun no tienes cuenta? Crea una</Link>
                    <Link to="/auth/login" className="block text-center text-lime-600 hover:text-lime-800 transition-colors">¿Ya tienes cuenta? Inicia Sesión</Link>
                </div>
                <input className="block w-2/3 mx-auto text-white bg-lime-600 rounded-md py-3 font-bold hover:bg-lime-800 transition-colors" type="submit" value='Enviar correo' />
            </Form>
        </>
    )
}
export default ForgotPassword