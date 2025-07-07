import {readFile,writeFile} from "node:fs/promises"
import * as dalRiddle from '../dal/daRiddle.js'

// import { resolve } from "node:path"
// const path = resolve('./', 'texts/riddles.txt')

export async function readText(path){
    try{
        const file = await dalRiddle.readRiddle(path)
        return file
    }
    catch(err){
        console.log(err)
    }
}



export async function creat(path,obj){
    try{
        const file = await dalRiddle.readRiddle(path)
        file.push(obj)
        await writeRiddle(path,file)
    }
    catch(err){
        console.log(err)
    }
}

export async function delet(path,id){
    try{
        const file = await dalRiddle.readRiddle(path)
        file.forEach((element,i)=>{
            if(element.id == id){
                file.splice(i,1)
                return
            }
        })
         await writeRiddle(path,file)
    }
    catch(err){
        console.log(err)
    }
}


