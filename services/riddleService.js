import {connectToMongo,db} from '../dal/dalRIddle.js'
import { ObjectId } from "mongodb"

await connectToMongo()

export async function getAllRiddles(){
    const riddles = await db.collection('riddles')
    .find().toArray()
    return riddles
}

export async function getRiddlesByLevel(Level){
    const riddles = await db.collection('riddles')
    .find({level:Level}).toArray()
    return riddles
}

export async function addRiddle(riddleObj){
    await db.collection('riddles')
    .insertOne(riddleObj)
}

export async function updeatRiddle(riddleObj){
    await db.collection('riddles')
    .updateOne({_id:new ObjectId(riddleObj.id)},
    {$set:{
        taskDescription:riddleObj.taskDescription,
        correctAnswer:riddleObj.correctAnswer,
        hint:riddleObj.hint
    }})
}

export async function deleteRiddle(id){
    await db.collection('riddles')
    .deleteOne({_id:new ObjectId(id)})
}
