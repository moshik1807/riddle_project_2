import express from 'express'
import {playerMeneger} from '../services/playerService.js'
import { addUser,checkPlayerInDB } from '../services/authService.js'
const routerPlayer = express.Router()


routerPlayer.post('/updeatPlayers', async (req, res) => {
    try{
    const player = req.body
    await playerMeneger(player)
    res.send("Player data saved successfully!")
    }
    catch(err){
        res.status(500).json({erroe:'error'})
    }
})

routerPlayer.post('/signup',async(req,res)=>{
    try{
    const player = req.body
    await addUser(player)
    res.send("user signup")
    }catch(err){
        console.log(err)
        res.send('error')
    }
})

routerPlayer.post('/login',async(req,res)=>{
        const player = req.body
        const token = await checkPlayerInDB(player)
        if(token){
            res.send(token)
        }else{
            res.status(401).json({ error: 'Invalid credentials' })
        }
})

export default routerPlayer
