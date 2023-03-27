export function addProduct(prod){
    return { type: 'addProduct', payload: prod }
}
export function removeProduct(prodId)
{
    return {type: 'removeProduct',payload: prodId}
}
export function editProduct(prodId){
    return { type: 'editProduct', payload: prodId }
}
export function addToCart(item){
   return { type:'addToCart',payload:item} 
}
export function removeFromCart(id){
    return { type:'removeToCart',payload:id} 
 }
