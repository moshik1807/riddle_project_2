import { readFile, writeFile } from 'node:fs/promises'
const path = '../texts/player.txt'
import * as x from './helperService.js'

//מדפיס את כל השחקנים
export async function readAllPlayers(path){
   const riddles = await x.readText(path)
   console.log(riddles)
}


//בודק אם השחקן נמצא ברשימה ומחזיר ערך בוליאני
export async function cheakIfPlayerInText(path,player){
    const file = await readFile(path,"utf8")
    const players = JSON.parse(file)
    for (let i = 0; i < players.length; i++) {
        if (players[i].name === player.name) {
        return {exists: true, index: i}
        }
    }
    return { exists: false }
}


//"אם השחקן עקף את הזמן שלו אז מוחק אותו מרשימת השחקנים ומחזיר "אמת
export async function addPlayer(path,player){   
     try{
        const delet = false
        const players = await readFile(path,'utf8')
        const playersJson = JSON.parse(players)
        const cheak = await cheakIfPlayerInText(path,player)
        if(cheak.exists){
            if(player.everegTime < playersJson[cheak.index].everegTime){
                playersJson.splice(cheak.index, 1)
                delet = true
            }
        }
        return delet
        }
        catch(err){
        console.log(err)
    }
}


//דוחף שחקן למיקום מתאים ברשימת השחקנים לפי הזמן הממוצע שלו
export async function pushPlayer(player){
    const players = await readFile(path,'utf8')
    const playersJson = JSON.parse(players)
    let add = false
        for (let i = 0; i < playersJson.length; i++) {
            if (player.everegTime < playersJson[i].everegTime) {
                playersJson.splice(i, 0, player)
                add = true
                break
            }
        }
        if(!add){
            playersJson.push(player)
        }
        await writeFile(path, JSON.stringify(playersJson,null,2))
}


//מנהל את תהליך הוספת\עריכת שחקן
export async function playerMeneger(path,player){
    const x = await addPlayer(path,player)
    if(!x){
       pushPlayer(player) 
    }
}
   



