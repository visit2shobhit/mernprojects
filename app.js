const express = require('express');
const app = express();
const PORT = 4000;

const customMiddileware = (req,res,next) => {
    console.log('Middleware is running');
    next()
}

app.use(customMiddileware);

app.get('/',(req,res)=>{
    console.log('HOme Page is running');
    res.send('My First Node JS Application');
})

app.listen(PORT,()=>{
    console.log(`server has started listening on ${PORT} PORT`)
})
