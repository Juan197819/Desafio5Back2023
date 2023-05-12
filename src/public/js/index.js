const socket = io.connect()

const form = document.getElementById('form')
const tbody = document.getElementById('tbody')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const newProduct= {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
        code: document.getElementById('code').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
        status:true,
    }
    socket.emit('messageClient',newProduct)
})
socket.on('messageServer',data=>{
    const i = data.map(p=>{
        return ( `<tr class='trCart'>
        <td>${p.title}</td>
        <td>${p.description}</td>
        <td>${p.price}</td>
        <td>${p.stock}</td>
        <td>${p.category}</td>
    </tr>`)
    })
    tbody.innerHTML=i.join('')
})
            
            