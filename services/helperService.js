import {readFile,writeFile} from "node:fs/promises"
import * as dalRiddle1 from '../dal/dalRiddle.js'


export async function readText(path){
    try{
        const file = await dalRiddle1.readRiddle(path)
        return file
    }
    catch(err){
        console.log(err)
    }
}



export async function creat(path,obj){
    try{
        const file = await dalRiddle1.readRiddle(path)
        file.push(obj)
        await dalRiddle1.writeRiddle(path,file)
    }
    catch(err){
        console.log(err)
    }
}

export async function delet(path,id){
    try{
        const file = await dalriddle.readRiddle(path)
        file.forEach((element,i)=>{
            if(element.id == id){
                file.splice(i,1)
                return
            }
        })
         await dalRiddle1.writeRiddle(path,file)
    }
    catch(err){
        console.log(err)
    }
}


