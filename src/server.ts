import express from 'express'
import path from 'path'
import generateCalendar from "./calendar";
const app = express()
app.listen(3000)

app.use(express.static(path.join(__dirname,'../client/build')))
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})
app.get('/:year', (req,res)=>{
    res.send(JSON.stringify(generateCalendar(~~req.params.year)))
})