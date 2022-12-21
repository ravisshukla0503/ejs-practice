const passport = require('passport');
const { Strategy } = require('passport-local');
//import model
const { comparehash } = require('../utils/helper')

passport.serializeUser((user, done) => {
    console.log("serialising");
    console.log(user);
    done(null, user);
});

passport.deserializeUser( async(id, done) => {
    const user = await user.findId(id);
    if(!user) throw new Error("no users found")
    done(null, user)
})

passport.use(
    new Strategy({
        usernameField : 'email',
    }, 
    (email, password, done) => {
        console.log(email);
        console.log(password);
        if(!email || !password){
            throw new Error("missing creidential")
        }
        const userDb = await user.findOne({email});
        if(!userDb)
        throw new Error("please register")
        const isValid = comparehash(password , userDb.password);
        if(!isValid){
            done(null, null)
        }
        done(null, userDb)

    }
    )
)