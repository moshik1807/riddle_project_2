// const  = '../dataBase/player.txt'
import * as x from './helperService.js'
import * as dalPlayer from '../dal/dalPlayer.js'

//מדפיס את כל השחקנים
export async function readAllPlayers(){
   const riddles = await x.readText()
   console.log(riddles)
}


//בודק אם השחקן נמצא ברשימה ומחזיר ערך בוליאני
export async function cheakIfPlayerInText(player){
    const players = await dalPlayer.readPlayer()
    for (let i = 0; i < players.length; i++) {
        if (players[i].name === player.name) {
        return {exists: true, index: i}
        }
    }
    return { exists: false }
}


//"אם השחקן עקף את הזמן שלו אז מוחק אותו מרשימת השחקנים ומחזיר "אמת
export async function addPlayer(player){   
     try{
        let delet = true
        const players = await dalPlayer.readPlayer()
        const cheak = await cheakIfPlayerInText(player)
        if(cheak.exists){
            if(player.everegTime <= players[cheak.index].everegTime){
                players.splice(cheak.index, 1)
                await dalPlayer.writePlayer(players)
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
export async function pushPlayer(player){
    const players = await dalPlayer.readPlayer()
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
        await dalPlayer.writePlayer(players)
}


//מנהל את תהליך הוספת\עריכת שחקן
export async function playerMeneger(player){
    const x = await addPlayer(player)
    if(x){
       await pushPlayer(player) 
    }
}



