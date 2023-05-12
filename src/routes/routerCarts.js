import {Router} from 'express'
import productManager from '../db.js'

export const routerCarts = Router()

routerCarts.post('/',async (req,res)=>{
    res.status(200).json(await productManager.addCart())
})
routerCarts.get('/:cid',async (req,res)=>{
    const {cid} = req.params
    const cart = await productManager.getCarts(cid)
    let response
    if (cart.length) {
        response= cart[0].products
    } else {
        response ='Carrito inexistente' 
    }
    res.status(200).json(response)
})
routerCarts.post('/:cid/product/:pid',async (req,res)=>{
    const {cid, pid} = req.params
    const cart = await productManager.updateCart(cid,pid)
    res.status(200).json(cart)
})
