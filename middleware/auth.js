// import jwt from 'jsonwebtoken'

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// // פונקציית Middleware לאימות טוקן והרשאות
// export function authenticateToken(requiredRole = null) {
//     return (req, res, next) => {
//         // קבלת הטוקן מהכותרת
//         const authHeader = req.headers['authorization']
//         const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN
        
//         if (!token) {
//             return res.status(401).json({ error: 'Access token required' })
//         }
        
//         try {
//             // אימות הטוקן
//             const user = jwt.verify(token, JWT_SECRET)
//             req.user = user
            
//             // בדיקת הרשאות אם נדרש
//             if (requiredRole) {
//                 if (requiredRole === 'admin' && user.role !== 'admin') {
//                     return res.status(403).json({ error: 'Admin access required' })
//                 }
                
//                 if (requiredRole === 'player' && user.role === 'guest') {
//                     return res.status(403).json({ error: 'Player account required' })
//                 }
//             }
            
//             next()
//         } catch (error) {
//             return res.status(403).json({ error: 'Invalid or expired token' })
//         }
//     }
// }