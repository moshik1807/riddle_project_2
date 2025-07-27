# Riddle Project

פרויקט שרת Node.js לניהול חידות ושחקנים עם מערכת הרשאות ואימות.

## תיאור הפרויקט

המערכת מאפשרת:
- רישום והתחברות משתמשים
- ניהול חידות (יצירה, עדכון, מחיקה)
- מעקב אחר זמני פתרון של שחקנים
- מערכת הרשאות לאדמינים ומשתמשים רגילים

## טכנולוגיות

- **Node.js** - סביבת ריצה
- **Express.js** - פריימוורק שרת
- **MongoDB** - בסיס נתונים לחידות
- **Supabase** - בסיס נתונים למשתמשים
- **JWT** - אימות משתמשים
- **bcrypt** - הצפנת סיסמאות

## מבנה הפרויקט

```
├── dal/
│   ├── dalPlayer.js      # חיבור לבסיס הנתונים של השחקנים (Supabase)
│   └── dalRIddle.js      # חיבור לבסיס הנתונים של החידות (MongoDB)
├── middleware/
│   └── auth.js           # מידלוור אימות (לא פעיל כרגע)
├── routers/
│   ├── routerPlayer.js   # ניתוב עבור פעולות שחקנים
│   └── routerRiddle.js   # ניתוב עבור פעולות חידות
├── services/
│   ├── authService.js    # שירותי אימות ואבטחה
│   ├── playerService.js  # שירותי ניהול שחקנים
│   └── riddleService.js  # שירותי ניהול חידות
└── expressServer.js      # קובץ השרת הראשי
```

## התקנה והפעלה

### דרישות מוקדמות
- Node.js (גרסה 14 ומעלה)
- MongoDB
- חשבון Supabase

### שלבי התקנה

1. **שכפול הפרויקט**
```bash
git clone [repository-url]
cd riddle-project
```

2. **התקנת התלויות**
```bash
npm install
```

3. **הגדרת משתני סביבה**
צור קובץ `.env` בשורש הפרויקט:
```env
MONGODB_URI=your_mongodb_connection_string
PUBLIC_PROJECT_URL=your_supabase_project_url
PUBLIC_ANON_API_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret_key
```

4. **הפעלת השרת**
```bash
node expressServer.js
```

השרת יפעל על פורט 2123.

## API Endpoints

### שחקנים (`/player`)

#### רישום משתמש
```http
POST /player/signup
Content-Type: application/json

{
  "name": "username",
  "password": "password"
}
```

#### התחברות
```http
POST /player/login
Content-Type: application/json

{
  "name": "username", 
  "password": "password"
}
```

#### עדכון זמן ממוצע (דורש אימות)
```http
POST /player/updeatPlayers
Authorization: Bearer <token>
Content-Type: application/json

{
  "everageTime": 120
}
```

### חידות (`/riddle`)

#### קבלת כל החידות
```http
GET /riddle/getAll
```

#### קבלת חידות לפי רמה
```http
GET /riddle/getByLevel?level=easy
```

#### יצירת חידה (דורש הרשאת אדמין)
```http
POST /riddle/create
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "taskDescription": "תיאור החידה",
  "correctAnswer": "התשובה הנכונה",
  "hint": "רמז",
  "level": "easy"
}
```

#### עדכון חידה (דורש הרשאת אדמין)
```http
PUT /riddle/updeate
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "id": "riddle_id",
  "taskDescription": "תיאור מעודכן",
  "correctAnswer": "תשובה מעודכנת",
  "hint": "רמז מעודכן"
}
```

#### מחיקת חידה (דורש הרשאת אדמין)
```http
POST /riddle/delete
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "id": "riddle_id"
}
```

## מערכת ההרשאות

המערכת תומכת בשני סוגי משתמשים:
- **user** - משתמש רגיל (יכול לפתור חידות ולעדכן זמנים)
- **admin** - מנהל (יכול לנהל חידות)

## מבנה בסיס הנתונים

### MongoDB (חידות)
```javascript
{
  _id: ObjectId,
  taskDescription: String,
  correctAnswer: String, 
  hint: String,
  level: String
}
```

### Supabase (משתמשים)
```sql
users {
  id: integer,
  name: text,
  password: text,
  everageTime: integer,
  role: text
}
```

## אבטחה

- סיסמאות מוצפנות באמצעות bcrypt
- אימות באמצעות JWT tokens
- הרשאות מבוססות תפקיד (RBAC)
- אימות טוקן בכל בקשה מוגנת

## פיתוח עתידי

רעיונות לשיפור:
- הוספת מערכת ניקוד
- לוח תוצאות
- קטגוריות חידות נוספות
- מערכת תגובות/דירוגים
- API documentation עם Swagger

## תרומה לפרויקט

1. צור fork של הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. בצע commit לשינויים (`git commit -m 'Add amazing feature'`)
4. דחף לbranch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## רישיון

פרויקט זה מופץ תחת רישיון MIT.

## יצירת קשר

במקרה של שאלות או בעיות, פתח issue בrepository או צור קשר עם המפתחים.