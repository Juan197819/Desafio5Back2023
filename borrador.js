const socket = io()

socket.on('messageServer',data=>{
    const {title,description,stock, category, code, price}= data
        const newProduct= {
            title,
        description,
        stock,
        category,lue,
        code,
        price,
    }
    console.log('newPR',newProduct)
})            
            