const express = require('express')
const app = express()
const cors = require('cors')
 const fs = require('node:fs/promises')
const bodyParser = require('body-parser')
const data = require('./data.json')
const { json } = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send('welcome')
})
app.post('/deposit',(req,res)=>{
    fs.writeFile(__dirname+"/data.json",JSON.stringify({balance:req.body.deposit}))
    .then(result=>{
      console.log(result);
      res.redirect("back")
      res.end()
    })
  })
  app.post('/widraw',(req,res)=>{
    let widrawal=Number(req.body.widraw)
    let parseData=data.balance
    let balance=Number(parseData)-widrawal
    console.log(data);
    fs.writeFile(__dirname+"/data.json",JSON.stringify({balance:balance}))
    .then(result=>{
        console.log(result);
        res.redirect("back")
    })
  })
  app.get('/balance',(req,res)=>{
  res.json(data)
  res.redirect('/balance')
  })
app.listen(3000,()=>{
    console.log("server stated");
})