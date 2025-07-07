import promptSync from 'prompt-sync';
const input = promptSync();
import * as importFile from './imports.js'


async function creatRiddleObj(){
    const x = await importFile.readText()
    // console.log(x)
    const bewArrayRiddle = x.map(r => new importFile.Riddel(r))
    return bewArrayRiddle
}


function riddleByLevel(readyRiddle){
    const level = input("enter level:easy,medium,or hard  ")
    const arrayRiddle = readyRiddle.filter((riddle)=> riddle.level == level)
    return arrayRiddle
}


function Game(arrayRiddle,player){
    // console.log(arrayRiddle)
    for (const ridd of arrayRiddle){
        ridd.startTime()
        ridd.ask()
        ridd.endTime(player)
    }
    player.printTimes()
}


const readyRiddle = await creatRiddleObj()
const RiddleByLevel =  riddleByLevel(readyRiddle)
const PlayerName = input('enter your name: ')
const player = new importFile.Player(PlayerName)
Game(RiddleByLevel,player)