import { readFile, writeFile } from 'node:fs/promises'
const path = '../dataBase/riddles.txt'


 export async function readRiddle(){
    const players = await readFile(path,"utf8")
    const jsonPlayers = JSON.parse(players)
    return jsonPlayers
}

export async function writeRiddle(players){
    return await writeFile(path, JSON.stringify(players,null,2))
}