import * as imports from './imports.js'
import * as helperService from './services/helperService.js'
import routerRiddle from './routerRiddle.js'
import routerplayer from './routerPlayer.js'
import express, { json } from 'express'

const PORT = 2123
const server = express()
server.use(json())

server.use('/riddle',routerRiddle)
server.use('/player',routerplayer)

server.listen(PORT,()=>{
    console.log(`server listening to port:${PORT}`)
})

