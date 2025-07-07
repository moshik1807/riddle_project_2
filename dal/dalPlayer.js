import { readFile, writeFile } from 'node:fs/promises'
const path = '../texts/player.txt'


 export async function readPlayer(path){
    const players = await readFile(path,"utf8")
    const jsonPlayers = JSON.parse(players)
    return jsonPlayers
}

export async function writePlayer(path,players){
    return await writeFile(path, JSON.stringify(players,null,2))
}