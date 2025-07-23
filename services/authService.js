import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { supabase } from '../dal/dalPlayer.js'


export async function checkUser(UserName) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('name', UserName)
    if (error) {
        throw new Error(error.message)
    }
    return {bool:data.length > 0,player:data[0]}
}


export async function addUser(user){
    const {name,password} = user
    const hashedPassword = await bcrypt.hash(password, 10)
    const {error} = await supabase
    .from('users')
    .insert([{name,everegTime:null,password:hashedPassword,role:"user"}])
    if(error){
        throw new Error(error.message)
    }
}

export async function checkPlayerInDB(user){
    try{
    const {name,password} = user
    const check = await checkUser(name)
    if(!check.bool){
        return
    }
    const isPasswordValid = await bcrypt.compare(password, check.player.password)
    if(!isPasswordValid){
        return
    }
    const token = jwt.sign(
             { 
                id: check.player.id,
                name: check.player.name, 
                role: check.player.role 
             }, 
             process.env.JWT_SECRET, 
             { expiresIn: '1h' }
    )   
    return token
    }catch(err){
        console.log(err)
    }
}
