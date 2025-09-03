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
    const x = await checkUser(user.name)
    if(x.bool){
        return 'enter other name'
    }
    const {name,password} = user
    if(!password){
        throw Error('Password is missing')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const {error} = await supabase
        .from('users')
        .insert([{name, everageTime: null, password: hashedPassword, role:"user"}])
    if(error){
        console.error('Supabase insert error:', error)
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



const auth = (roles) => (req, res, next) => {    
    try {
        const authHeader = req.headers['authorization']
        if (!authHeader) return res.status(403).send('Unauthorized - no token')
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(typeof decoded === 'string') throw new Error('Not Token Provided')
        req.user = {
            name: decoded.name,
            role: decoded.role
        };
        if (!roles.includes(decoded.role)) {
            return res.status(403).send('Unauthorized - role not allowed')
        }
        next();
    } catch (error) {
        console.error(error)
        res.status(403).send('Unauthorized - invalid token')
    }
};



export default auth;
