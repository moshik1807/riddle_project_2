import express from 'express'
import {playerMeneger} from '../services/playerService.js'
import { addUser,checkPlayerInDB } from '../services/authService.js'
import auth from '../services/authService.js'
const routerPlayer = express.Router()




routerPlayer.post('/signup', async (req, res) => {
    try {
        const player = req.body;
        await addUser(player);
        const token = await checkPlayerInDB(player);

        if (token) {
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
});

routerPlayer.post('/login',async(req,res)=>{
        const player = req.body
        const token = await checkPlayerInDB(player)
        console.log(token)
        res.send({token})
})



routerPlayer.post('/updeatPlayers', auth(['user']),async (req, res) => {
  try {
    const {everageTime} = req.body;
    const name = req.user.name
    await playerMeneger({name:name,everageTime:everageTime});

    res.send("Player data saved successfully!");
  } catch (err) {
    console.error('Error in /updeatPlayers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



export default routerPlayer
