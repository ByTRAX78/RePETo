export async function getReciclados(){
    const token = JSON.parse(localStorage.getItem('token'))
    if(token){
        try {
            const url = import.meta.env.VITE_API_URL + '/api/reciclado/mis_datos'
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