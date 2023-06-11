require('dotenv').config()
const express= require('express')
const connect = require('./config/db.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
connect()
const app = require('./app.js');
const { login, signup, getUsers, logout } = require('./controllers/user.controller.js')

//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json())
//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(express.urlencoded({extended: true}))
// using the cookie parser middleware

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    
}));
// app.use(cors())


app.get('/', (req, res)=>{
    res.send('hello from backend')
})
app.post("/login", login);
app.post("/signup", signup);
app.get('/getUsers', getUsers);
//checking the route if it is working or not
// app.get('/logout', testing)
app.get('/logout', logout)
app.listen(4000, () => console.log("Server is listening at http://localhost:4000"));
// console.log(app);
