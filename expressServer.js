import routerRiddle from './routers/routerRiddle.js'
import routerplayer from './routers/routerPlayer.js'
import express, { json } from 'express'
import cors from 'cors'

const PORT = 2123
const server = express()

server.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

server.use(json())

server.use('/riddle',routerRiddle)
server.use('/player',routerplayer)

server.listen(PORT,()=>{
    console.log(`server listening to port:${PORT}`)
})

