//env
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const app = express();

const MongoClient = require('mongodb').MongoClient;
//react파일 연결
app.use(express.static(path.join(__dirname, '/my-react-app/dist')));
app.use(express.urlencoded({extended : true}))
app.use(express.json());

let db;

MongoClient.connect(process.env.MONGO_URL, function(error, client){
  if (error) return console.log('error');
  //서버띄우는 코드 여기로 옮기기
  db = client.db('todoreact')
  app.listen(process.env.PORT, function(){
    console.log('listening on 3000')
  });
})

app.get('/product',(req,res)=>{
  res.json({name : 'black shoes'})
  console.log(req)
})

app.post('/todo', (req,res)=>{
  db.collection('todo').insertOne({_id:1, todoTitle: req.body.title},(error, result)=>{
    if(error) console.log(error);
    console.log(result);
    console.log('todo제목 db저장완료')
  })
})










//라우팅 react담당 그래서 *
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/my-react-app/dist/index.html'));
});


