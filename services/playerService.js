import { readFile, writeFile } from 'node:fs/promises'
const path = '../dataBase/player.txt'
import * as x from './helperService.js'
import * as dalPlayer from '../dal/dalPlayer.js'

//מדפיס את כל השחקנים
export async function readAllPlayers(path){
   const riddles = await x.readText(path)
   console.log(riddles)
}


//בודק אם השחקן נמצא ברשימה ומחזיר ערך בוליאני
export async function cheakIfPlayerInText(path,player){
    const players = await dalPlayer.readPlayer(path)
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
        let delet = true
        const players = await dalPlayer.readPlayer(path)
        const cheak = await cheakIfPlayerInText(path,player)
        if(cheak.exists){
            if(player.everegTime <= players[cheak.index].everegTime){
                players.splice(cheak.index, 1)
                await dalPlayer.writePlayer(path, players)
            }
            else{
                delet = false
            }
        }
        return delet
        }
        catch(err){
        console.log(err)
    }
}


//דוחף שחקן למיקום מתאים ברשימת השחקנים לפי הזמן הממוצע שלו
export async function pushPlayer(path,player){
    const players = await dalPlayer.readPlayer(path)
    let add = false
        for (let i = 0; i < players.length; i++) {
            if (player.everegTime < players[i].everegTime) {
                players.splice(i, 0, player)
                add = true
                break
            }
        }
        if(!add){
            players.push(player)
        }
        await dalPlayer.writePlayer(path,players)
}


//מנהל את תהליך הוספת\עריכת שחקן
export async function playerMeneger(path,player){
    const x = await addPlayer(path,player)
    if(x){
       await pushPlayer(path,player) 
    }
}
playerMeneger(path,{"name":"dd","everegTime":"0.3"})



