import express from 'express'
import * as imports from './imports.js'
const routerPlayer = express.Router()

routerPlayer.get('/getAll', async (req, res) => {
    const players = await imports.dalPlayer.readPlayer()
    res.json(players)
})

routerPlayer.post('/updeatPlayers', async (req, res) => {
    const player = req.body
    await imports.playerService.playerMeneger(player)
    res.end("update player")
})


export default routerPlayer
