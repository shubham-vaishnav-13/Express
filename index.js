import express from 'express'

const app = express()

const port = 3000

// app.get("/",(req,res)=>{
//     res.send("hello from Shubham ....")
// })
// app.get("/macha-tea",(req,res)=>{
//     res.send("hello from Macha Tea....")
// })
// app.get("/black-tea",(req,res)=>{
//     res.send("hello from Black tea ....")
// })

app.use(express.json())
let teaData = []
let nextId = 1

// add a tea
app.post('/teas',(req,res)=>{
    const {name,price} = req.body
    const newTea = {id : nextId++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)

})

// get a  tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

// get a tea by id
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea) return res.status(404).send("Not Found ....")
    res.status(200).send(tea)
})


// update tea

app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea) return res.status(404).send("Not Found ....")
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

// delete tea
app.delete('/teas/:id',(req,res)=>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index == -1){
        return res.status(404).send("File Not Found ....")
    }
    teaData.splice(index,1);
    res.status(204).send("Deleted Sucess ...")
})


app.listen(port,()=>{
    console.log(`Server is Running on port ${port}`)
})