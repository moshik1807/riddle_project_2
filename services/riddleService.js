// import { readFile, writeFile } from 'node:fs/promises'
import * as dalRiddle2 from '../dal/dalriddle.js'
const path = '../dataBase/riddles.txt'
import * as x from './helperService.js'
import promptSync from 'prompt-sync'
const prompt = promptSync()

export async function readAllRiddles() {
    const riddles = await x.readText()
    console.log(riddles)
    return riddles
}

export async function readRiddleById(id){
    const riddles = await x.readText()
    let riddle
    for(const e of riddles){
        if(e.id == id){
            riddle = e
        }
    }
    return riddle
}

export function addRiddle() {
    const newRiddle = {}
    newRiddle["level"] = prompt("enter level")
    newRiddle["name"] = prompt("enter name")
    newRiddle["taskDescription"] = prompt("enter taskDescription")
    newRiddle["correctAnswer"] = prompt("enter correctAnswer")
    newRiddle["timer"] = prompt("enter timer")
    newRiddle["hint"] = prompt("enter hint")
    x.creat(newRiddle)
}

export async function updeatRid() {
    const objById = prompt("enter id riddle you whant to change")
    let y = await x.readText()
    for (let element of y) {
        if (element.id == objById) {
            element["taskDescription"] = prompt("enter taskDescription updeat")
            element["correctAnswer"] = prompt("enter correctAnswer updeat")
            element["hint"] = prompt("enter hint updeat")
        }
    }
    await dalRiddle2.writeRiddle(y)
}

export function deletRiddle() {
    const objById = prompt("enter id object to you whant delet")
    x.delet(objById)
}


