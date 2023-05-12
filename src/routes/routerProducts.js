import {Router} from 'express'
import productManager from '../db.js'

export const routerProducts = Router()

routerProducts.get('/',async (req,res)=>{
    const {limit} = req.query
    const productos = await productManager.getProducts(limit)
    console.log(productos);
    res.status(200).json(productos)
}) 
routerProducts.get('/:pid',async (req,res)=>{
    const {pid} = req.params
    res.status(200).json(await productManager.getProductById(pid))
})
routerProducts.post('/',async (req,res)=>{
    const product = req.body
    res.status(200).json(await productManager.addProduct(product))
})
routerProducts.put('/:pid',async (req,res)=>{
    const product = req.body
    const {pid} = req.params
    res.status(200).json(await productManager.updateProduct(pid, product))
})
routerProducts.delete('/:pid',async (req,res)=>{
    const {pid} = req.params
    res.status(200).json(await productManager.deleteProduct(pid))
})
