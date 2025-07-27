import * as riddleService from '../services/riddleService.js'
import auth from '../services/authService.js'
import express from 'express'


const routerRiddle = express.Router()

routerRiddle.get('/getAll',async(req,res)=>{
    const riddles = await riddleService.getAllRiddles()
    res.json(riddles)
})

routerRiddle.get('/getByLevel',async(req,res)=>{
    const riddles = await riddleService.getRiddlesByLevel(req.query.level)
    res.json(riddles)
})

routerRiddle.post('/create',auth(['admin']),(req,res)=>{
    riddleService.addRiddle(req.body)
    res.end("add")
})


routerRiddle.post('/delete',auth(['admin']),(req,res)=>{
    riddleService.deleteRiddle(req.body.id)
    res.end("delete")
})

routerRiddle.put('/updeate',auth(['admin']),async(req,res)=>{
    riddleService.updeatRiddle(req.body)
    res.end('updat')
})

export default routerRiddle