import express, {Router} from 'express'
import productManager from '../db.js'
import {Server} from "socket.io";
//import { Server as HttpServer } from "http";

// const app = express()
// const httpServer = new HttpServer(app)
// const io = new IOServer(httpServer)

export const routerViews = Router()

routerViews.get('/',async (req,res)=>{
    const productsList = await productManager.getProducts()
    res.status(200).render('home',{productsList})
}) 
routerViews.post('/realtimeproducts',async (req,res)=>{
    
    const productsList = await productManager.getProducts()
    console.log(productsList);
    res.status(200).render('realtimeproducts',{productsList})
}) 
