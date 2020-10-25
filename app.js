const express = require('express');
const app = express();
const PORT = 4000;
const mongoose = require('mongoose');
const {MONGOURL} = require('./config');
require('./models/user');
const customMiddileware = (req,res,next) => {
    console.log('Middleware is running');
    next()
}
app.use(express.json());
const auth = require('./routes/auth');
app.use(auth);

mongoose.connect(MONGOURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo');
})


mongoose.connection.on('error',()=>{
    console.log('Error in connecting');
})

app.use(customMiddileware);

app.get('/',(req,res)=>{
    console.log('HOme Page is running');
    res.send('My First Node JS Application');
})

app.listen(PORT,()=>{
    console.log(`server has started listening on ${PORT} PORT`)
})
