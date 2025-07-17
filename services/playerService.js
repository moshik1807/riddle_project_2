import { supabase } from '../dal/dalPlayer.js'

export async function checkPlayer(playerName) {
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('name', playerName)
    if (error) {
        throw new Error(error.message)
    }
    return {bool:data.length > 0,player:data[0]}
}

function AverageTimeCheck(firstPlayer,lastPlayer) {
    return firstPlayer.everegTime > lastPlayer.everegTime
}

async function updatePlayer(player){
    const {data,error} = await supabase
    .from('players')
    .update({everegTime:player.everegTime})
    .eq('name',player.name)
    if(error){
        throw new Error(error.message)
    }
}

async function addPlayer(player){
    const {data,error} = await supabase
    .from('players')
    .insert([player])
    if(error){
        throw new Error(error.message)
    }
}


export async function playerMeneger(player){
    const check = await checkPlayer(player.name)
    if(check.bool){
        if(AverageTimeCheck(check.player,player)){
            await updatePlayer(player)
        }
    }
    else{
        await addPlayer(player)
    }
}