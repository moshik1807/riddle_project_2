import { readFile, writeFile } from 'node:fs/promises'
// import path from 'node:path'
const filePath =  '../dataBase/Player.txt'


 export async function readPlayer(){
    const players = await readFile(filePath,"utf8")
    const jsonPlayers = JSON.parse(players)
    return jsonPlayers
}

export async function writePlayer(players){
    return await writeFile(filePath, JSON.stringify(players,null,2))
}