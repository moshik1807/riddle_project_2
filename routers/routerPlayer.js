import express from 'express'
import * as imports from '../imports.js'
const routerPlayer = express.Router()

routerPlayer.get('/getAll', async (req, res) => {
    const players = await imports.dalPlayer.readPlayer()
    res.json(players)
})




routerPlayer.post('/updeatPlayers', async (req, res) => {
    try{
    const player = req.body
    await imports.playerService.playerMeneger(player)
    res.end("update player")
    }
    catch(err){
        res.status(500).json({erroe:'error'})
    }
})


export default routerPlayer
