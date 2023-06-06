import service from "./config.services";

const getHistorialService = ()=>{
    console.log("ENTRA RUTA HISTORIAL GET")
    return service.get("/historial")
}

const addHistorialService = () =>{
    console.log("ENTRA RUTA HISTORIAL ADD ")
    return service.post("/historial/add")
}

export {
getHistorialService,
addHistorialService

}