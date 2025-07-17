import { MongoClient } from "mongodb";
import 'dotenv/config' 
export const client = new MongoClient(process.env.MONGODB_URI)

export async function connectToMongo(){
    try{
        await client.connect()
        console.log('connect to db')
    }
    catch(error){
        console.log(error)
    }
}

export const db = client.db('riddle_project')



