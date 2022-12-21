const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const cors = require('cors');
const path = require('path');
const { hashpassword, comparedhash} = require('./utils/helper');
const passport = require('passport');
const passportLocal = require('./strategy/locals');
const MongoStore = require('connect-mongo')

const app = express();


app.use(cors());
app.use(cookieParser());
app.use(session({
    secret : 'cat',
    resave : 'false',
    saveunintialized : 'false',
    store : MongoStore.create({
        mongoUrl : "mongodb://localhost:27017/databasenme"
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session())

//app.set('views', path.join(__dirname , 'views'))
app.set('view engine', 'ejs');

app.get("/" ,(req, res)=>{
    
    res.render('app',{
        foo : "bar"
    })
})

app.get("/item", (req, res) => { 
    res.cookie('visited', true, { maxAge : 10000000});
    res.send("done")
})

app.post('/data', (req, res) => {
    const {data} = req.session;
    if(data){
        res.send(data);
    }else{
        res.send("no req.session")
    }
});

app.post('/register', (req, res) => {
    const password = hashpassword(req.body.password);
    const data = new model(req.body.email, password); //learn bcryt
});

/*app.get('/login', async (req, res) => {
    const {email, password} = req.body;
    const data = await user.findOne({email});
    if(!data){
        res.send("please register")
    }
    const authenticate = comparedhash(password, data.password);
    if(!authenticate){
        res.send("correct email or pass")
    }else{
        req.session.user = data;
       return res.send("login successfully")
    }
})*/

app.get('/login', passport.authenticate('local') , (req, res) =>{
    console.log(email)
    res.send('login')
})

app.listen(5000 ,(err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("port worked")
    }
});
