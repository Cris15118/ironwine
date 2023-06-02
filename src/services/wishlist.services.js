import service from "./config.services";

const allwishListService = ()=>{
    return service.get("/wishlist")
}

const addWishListService = (productId)=>{
    return service.patch(`/wishlist/${productId}/add`)
}


const pullWishListService = (productId)=>{
    return service.patch(`/wishlist/${productId}/pull`)
}


export  {
    allwishListService,
    addWishListService,
    pullWishListService
}