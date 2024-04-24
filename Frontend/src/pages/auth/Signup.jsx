import { Form, useActionData, redirect, Link } from "react-router-dom"
import Swal from "sweetalert2"
import Error from "../../components/Error"
import { newUser } from "../../data/authUsers"

export async function action({request}) {
    const formData = await request.formData()
    const nombre = formData.get('nombre')
    const primerApellido = formData.get('primerApellido')
    const segundoApellido = formData.get('segundoApellido')
    const correo = formData.get('correo')
    const password = formData.get('password')
    const password2 = formData.get('password2')
    const acepto = formData.get('acepto')
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    //Validación
    let errores = []
    if(nombre.length < 3) { 
        errores.push('El nombre debe tener al menos 3 caracteres')
    }
    if(primerApellido.length < 3) { 
        errores.push('El primer apellido debe tener al menos 3 caracteres')
    }
    if(!regex.test(correo)){
        errores.push('Correo no válido')
    }
    if(password.length < 8) {
        errores.push('La contraseña debe tener al menos 8 caracteres')
    }
    if(password.length > 16) {
        errores.push('La contraseña no debe tener más de 16 caracteres')
    }
    if(password != password2) {
        errores.push('Las contraseñas no coinciden')
    }
    if(acepto !== 'on') {
        errores.push('Debes aceptar los términos y condiciones de Repeto')
    }
    if(Object.keys(errores).length) {
        return errores
    }
    const datos = {
        'NombreUsuario' : correo, 
        'Correo': correo, 
        'Contrasenia': password,
        "Nombre": nombre,
        "PrimerApellido": primerApellido,
        "SegundoApellido": segundoApellido
    }
    const respuesta = await newUser(datos)
    if(!respuesta.status){  
        return [respuesta.mensaje]
    }
    Swal.fire({ 
        icon: 'success', 
        title: 'Se ha creado tu cuenta', 
        text: 'Inicia sesión con tus credenciales',
        confirmButtonColor: '#65a30d'
    })
    return redirect('/auth/login')
}

const Signup = () => {
    const errores = useActionData()

    return (
        <>
            <h1 className="text-3xl font-bold text-center text-neutral-700">Crea tu cuenta</h1>
            <p className="text-neutral-700 text-center text-lg">Llena todos los campos, para crear tu cuenta</p>
            {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
            <Form method="POST" noValidate className="space-y-5 text-xl">
                <div>
                    <label className="text-neutral-700" htmlFor="nombre">Nombre</label>
                    <input className="block w-full p-1 bg-neutral-200 rounded-md" type="text" id="nombre" name="nombre"/>
                </div>
                <div>
                    <label className="text-neutral-700" htmlFor="primerApellido">Primer apellido</label>
                    <input className="block w-full p-1 bg-neutral-200 rounded-md" type="text" id="primerApellido" name="primerApellido"/>
                </div>
                <div>
                    <label className="text-neutral-700" htmlFor="segundoApellido">Segundo apellido</label>
                    <input className="block w-full p-1 bg-neutral-200 rounded-md" type="text" id="segundoApellido" name="segundoApellido"/>
                </div>
                <div>
                    <label className="text-neutral-700" htmlFor="correo">Correo eletrónico</label>
                    <input className="block w-full p-1 bg-neutral-200 rounded-md" type="text" id="correo" name="correo"/>
                </div>
                <div>
                    <label className="text-neutral-700" htmlFor="password">Contraseña</label>
                    <input className="block w-full p-1 bg-neutral-200 rounded-md" type="password" id="password" name="password"/>
                </div>
                <div>
                    <label className="text-neutral-700" htmlFor="password2">Repite tu Contraseña</label>
                    <input className="block w-full p-1 bg-neutral-200 rounded-md" type="password" id="password2" name="password2"/>
                </div>
                <div className="flex gap-3 items-start justify-center">
                    <input className="mt-1 block p-1 rounded-md" type="checkbox" id="acepto" name="acepto"/>
                    <label className="text-neutral-700 text-justify leading-none" htmlFor="acepto">Acepto el aviso de privacidad, los términos y condiciones de Repeto</label>
                </div>
                <Link to="/auth/login" className="block text-center text-lime-600 hover:text-lime-800 transition-colors">¿Ya tienes cuenta? Inicia sesión</Link>
                <input className="block w-2/3 mx-auto text-white bg-lime-600 rounded-md py-3 font-bold hover:bg-lime-800 transition-colors" type="submit" value='Registrarme' />
            </Form>
        </>
    )
}
export default Signup