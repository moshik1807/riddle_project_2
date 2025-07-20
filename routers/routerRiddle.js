import * as riddleService from '../services/riddleService.js'

import express from 'express'


const routerRiddle = express.Router()


routerRiddle.get('/getAll',async(req,res)=>{
    const riddles = await riddleService.getAllRiddles()
    res.json(riddles)
})

routerRiddle.get('/getByLevel',async(req,res)=>{
    console.log(req.query)
    const riddles = await riddleService.getRiddlesByLevel(req.query.level)
    res.json(riddles)
})

routerRiddle.post('/create',(req,res)=>{
    riddleService.addRiddle(req.body)
    res.end("add")
})


routerRiddle.post('/delete',(req,res)=>{
    riddleService.deleteRiddle(req.body.id)
    res.end("delete")
})

routerRiddle.put('/updeate',async(req,res)=>{
    riddleService.updeatRiddle(req.body)
    res.end('updat')
})

export default routerRiddle