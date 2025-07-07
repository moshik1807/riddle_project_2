import { readFile, writeFile } from 'node:fs/promises'
const path = '../texts/riddles.txt'


 export async function readRiddle(path){
    const players = await readFile(path,"utf8")
    const jsonPlayers = JSON.parse(players)
    return jsonPlayers
}

export async function writeRiddle(path,players){
    return await writeFile(path, JSON.stringify(players,null,2))
}