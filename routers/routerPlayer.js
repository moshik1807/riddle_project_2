import express from 'express'
import {playerMeneger} from '../services/playerService.js'
const routerPlayer = express.Router()


routerPlayer.post('/updeatPlayers', async (req, res) => {
    try{
    const player = req.body
    await playerMeneger(player)
    res.end("update player")
    }
    catch(err){
        res.status(500).json({erroe:'error'})
    }
})


export default routerPlayer
