
export async function getReciclando(){ 
    try {
        const url = import.meta.env.VITE_API_URL + '/api/recic_maquina/consultar'
        const datos = {
            "Maquina": "62616c5a-babe-49fa-b1a0-e6206b8ee911"
        }
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type' : 'application/json',
            }
        })
        const data = await respuesta.json()
        return data
    } catch (error) {
        console.log(error);
        return {status: false, message: 'Error al conectar con el servidor'}
    }
}

export async function terminarReciclado(){ 
    try {
        const url = import.meta.env.VITE_API_URL + '/api/reciclado/registro_sinP'
        const datos = {
            "Maquina": "62616c5a-babe-49fa-b1a0-e6206b8ee911"
        }
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type' : 'application/json',
            }
        })
        const data = await respuesta.json()
        return data
    } catch (error) {
        console.log(error);
        return {status: false, message: 'Error al conectar con el servidor'}
    }
}
export async function iniciarReciclado(){ 
    try {
        const url = import.meta.env.VITE_API_URL + '/api/recic_maquina/eliminar_registros'
        const datos = {
            "Maquina": "62616c5a-babe-49fa-b1a0-e6206b8ee911"
        }
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type' : 'application/json',
            }
        })
        const data = await respuesta.json()
        return data
    } catch (error) {
        console.log(error);
        return {status: false, message: 'Error al conectar con el servidor'}
    }
}
export async function asignarReciclado(datos, token){ 
    try {
        const url = import.meta.env.VITE_API_URL + '/api/reciclado/asignarPersona'
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': token
            }
        })
        const data = await respuesta.json()
        return data
    } catch (error) {
        console.log(error);
        return {status: false, message: 'Error al conectar con el servidor'}
    }
}