const express = require('express');
const app = express();
const port = 5000;
const evaluate = require('./modules/evaluate');
const resultList = require('./modules/resultList');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));

app.listen(port,()=>{
    console.log('Server is listening at port: ', port);
})

app.get('/resultList', (req,res)=>{
    console.log('returning resultList: ', resultList);
    res.send(resultList);
})

app.post('/evaluate', (req,res)=>{
    let expression = req.body;
    console.log(expression);
    console.log(expression.inputValue);
    let result = evaluate(expression.inputValue);
    resultList.push({expression, result});
    res.sendStatus(200);
})