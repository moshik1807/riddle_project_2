import routerRiddle from './routers/routerRiddle.js'
import routerplayer from './routers/routerPlayer.js'
import express, { json } from 'express'

const PORT = 2123
const server = express()
server.use(json())

server.use('/player', (req, res, next) => {
    next();
})

server.use('/riddle',routerRiddle)
server.use('/player',routerplayer)

server.listen(PORT,()=>{
    console.log(`server listening to port:${PORT}`)
})

