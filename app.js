import express from 'express'
import productManager from './src/db.js'
import handlebars from 'express-handlebars'
import __dirname from "./src/utils.js";
import { routerProducts } from "./src/routes/routerProducts.js";
import { routerCarts } from "./src/routes/routerCarts.js";
import { routerViews } from "./src/routes/routerViews.js";
import { Server } from "socket.io";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname +'/public'))

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/', routerViews)

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars.engine())

const PORT  = 8080
const server = app.listen(PORT,()=>{
    console.log('Escuchando en puerto ' + server.address().port)
}).on('error',err=>console.log('Fallo el servidor',err))

const io = new Server(server)

routerViews.get('/realtimeproducts',async (req,res)=>{
    console.log('hollaaaaa')
    
    io.on('connection', async socket=>{
        console.log('Usuario conectado')
        socket.emit('messageServer', await productManager.getProducts())

        socket.on('messageClient', async product=>{
            await productManager.addProduct(product)
            io.emit('messageServer', await productManager.getProducts())
        })
    })
    res.status(200).render('realtimeproducts')
}) 
