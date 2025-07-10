import * as imports from './imports.js'
import * as helperService from './services/helperService.js'


import express from 'express'


const routerRiddle = express.Router()


routerRiddle.get('/getAll',async(req,res)=>{
    const riddles = await imports.riddleService.readAllRiddles()
    res.json(riddles)
})



routerRiddle.post('/create',(req,res)=>{
    helperService.creat(req.body)
    res.end("add")
})


routerRiddle.post('/delete',(req,res)=>{
    helperService.delet(req.body.id)
    res.end("delete")
})

routerRiddle.put('/updeate',async(req,res)=>{
    const riddles = await imports.riddleService.readAllRiddles()
    const updeatRiddle = req.body
    for(let e of riddles){
        if(e.id == updeatRiddle.id){
            e.taskDescription = updeatRiddle.taskDescription
            e.correctAnswer = updeatRiddle.correctAnswer
            e.hint = updeatRiddle.hint
            break
        }
    }
    imports.dalriddle.writeRiddle(riddles)
    res.end("updeat")
})

export default routerRiddle