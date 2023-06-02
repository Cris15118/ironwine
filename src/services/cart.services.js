import service from "./config.services";


const getCartservice = () =>{
    return service.get("/cart")
}

const addCartService = (productId)=>{
    return service.patch(`/cart/${productId}/add`)
}

const pullCartService = (productId)=>{
    return service.patch(`/cart/${productId}/pull`)
}

const deleteCartService= () =>{
    return service.put("/cart/deleteall")
}


export{
    getCartservice,
    addCartService,
    pullCartService,
    deleteCartService
}