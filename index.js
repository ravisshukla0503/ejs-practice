const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();


app.use(cors());


//app.set('views', path.join(__dirname , 'views'))
app.set('view engine', 'ejs');

app.get("/" ,(req, res)=>{
    res.render('app',{
        foo : "bar"
    })
})

app.listen(8000 ,(err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("port worked")
    }
});
