export async function newUser(datos){
    try {
        const url = import.meta.env.VITE_API_URL + '/api/auth/registro'
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        return await respuesta.json()
    } catch (error) {
        console.log(error);
        return {error: true, message: 'Error al conectar con el servidor'}
    }
}

export async function loginUser(datos){ 
    try {
        const url = import.meta.env.VITE_API_URL + '/api/auth/login'
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        return await respuesta.json()
    } catch (error) {
        console.log(error);
        return {error: true, message: 'Error al conectar con el servidor'}
    }
}

export async function forgotPassword(datos){
    try {
        const url = import.meta.env.VITE_API_URL + '/api/auth/forgot-password'
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        return await respuesta.json()
    } catch (error) {
        console.log(error);
        return {error: true, message: 'Error al conectar con el servidor'}
    }
}

export async function resetPassword(datos){ 
    try {
        const url = import.meta.env.VITE_API_URL + '/api/auth/reset-password'
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        return await respuesta.json()
    } catch (error) {
        console.log(error);
        return {error: true, message: 'Error al conectar con el servidor'}
    }
}

export async function authMe(){
    const token = JSON.parse(localStorage.getItem('token'))
    if(token){
        try {
            const url = import.meta.env.VITE_API_URL + '/api/auth/me'
            const respuesta = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `${token}`
                }
            })
            const data = await respuesta.json()
            return data
        }
        catch (error) {
            console.log(error);
            return {status: false, message: 'Error al conectar con el servidor'}
        }
    }
    return {status: false, message: 'Sin usuario'}
}

export async function getMe(){
    const token = JSON.parse(localStorage.getItem('token'))
    if(token){
        try {
            const url = import.meta.env.VITE_API_URL + '/api/persona/datos'
            const respuesta = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `${token}`
                }
            })
            const data = await respuesta.json()
            return data
        }
        catch (error) {
            console.log(error);
            return {status: false, message: 'Error al conectar con el servidor'}
        }
    }
    return {status: false, message: 'Sin usuario'}
}