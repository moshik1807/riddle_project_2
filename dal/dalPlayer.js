// import { readFile, writeFile } from 'node:fs/promises'
// import path from 'node:path'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// const filePath = path.resolve(__dirname, '../dataBase/player.txt')


//  export async function readPlayer(){
//     const players = await readFile(filePath,"utf8")
//     const jsonPlayers = JSON.parse(players)
//     return jsonPlayers
// }

// export async function writePlayer(players){
//     return await writeFile(filePath, JSON.stringify(players,null,2))
// }
import 'dotenv/config' 
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
    process.env.PUBLIC_PROJECT_URL,
    process.env.PUBLIC_ANON_API_KEY
)

