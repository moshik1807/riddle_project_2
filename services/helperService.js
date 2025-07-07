import {readFile,writeFile} from "node:fs/promises"
// import { resolve } from "node:path"
// const path = resolve('./', 'texts/riddles.txt')

export async function readText(path){
    try{
        const file = await readFile(path,'utf8')
        const fileJson = JSON.parse(file)
        return fileJson
    }
    catch(err){
        console.log(err)
    }
}



export async function creat(path,obj){
    try{
        const file = await readFile(path,'utf8')
        const fileJson = JSON.parse(file)
        fileJson.push(obj)
        await writeFile(path, JSON.stringify(fileJson,null,2))
    }
    catch(err){
        console.log(err)
    }
}

export async function delet(path,id){
    try{
        const file = await readFile(path,'utf8')
        const fileJson = JSON.parse(file)
        fileJson.forEach((element,i)=>{
            if(element.id == id){
                fileJson.splice(i,1)
                return
            }
        })
         await writeFile(path, JSON.stringify(fileJson,null,2))
    }
    catch(err){
        console.log(err)
    }
}


