import { readFile, writeFile } from 'node:fs/promises'
const path = '../texts/riddles.txt'
import * as x from './helperService.js'
import promptSync from 'prompt-sync'
const prompt = promptSync()

export async function readAllRiddles(path) {
    const riddles = await x.readText(path)
    console.log(riddles)
}

export function addRiddle(path) {
    const newRiddle = {}
    newRiddle["level"] = prompt("enter level")
    newRiddle["name"] = prompt("enter name")
    newRiddle["taskDescription"] = prompt("enter taskDescription")
    newRiddle["correctAnswer"] = prompt("enter correctAnswer")
    newRiddle["timer"] = prompt("enter timer")
    newRiddle["hint"] = prompt("enter hint")
    x.creat(path, newRiddle)
}

export async function updeatRid(path) {
    const objById = prompt("enter id riddle you whant to change")
    let y = await x.readText(path)
    for (let element of y) {
        if (element.id == objById) {
            element["taskDescription"] = prompt("enter taskDescription updeat")
            element["correctAnswer"] = prompt("enter correctAnswer updeat")
            element["hint"] = prompt("enter hint updeat")
        }
    }
    await writeFile(path, JSON.stringify(y, null, 2))
}

export function deletRiddle(path) {
    const objById = prompt("enter id object to you whant delet")
    x.delet(path, objById)
}
