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
//passport 라이브러리
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

let db;
MongoClient.connect(process.env.MONGO_URL, function(error, client){
  if (error) return console.log('error');
  //서버띄우는 코드 여기로 옮기기
  db = client.db('todoreact')
  app.listen(process.env.PORT, function(){
    console.log('listening on 3000')
  });
})

app.post('/todo', (req,res)=>{
  db.collection('todocount').findOne({name:'게시물갯수'},(error,result)=>{
    if(error) console.log('todocount collection못찾음'+error)
    console.log(result)
    let total = result.total;
    db.collection('todo').insertOne({_id:(total+1), todoTitle: req.body.title},(error, result)=>{
      if(error) console.log('제목저장실패'+error);
      console.log('todo제목 db저장완료')
      db.collection('todocount').updateOne({name:'게시물갯수'},{$inc : {total:1}},(error,result)=>{
        if(error) console.log('수정오류'+error)
      })
    })
  })
})


app.post('/login',passport.authenticate('local', {failureRedirect : '/auth'}),(req,res)=>{
  res.redirect('/')
})

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
  //console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러)

    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
    if (입력한비번 == 결과.pw) {
      return done(null, 결과)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

//Session data 만들고-> cookie만들어서 사용자의 브라우저로 보내줌
passport.serializeUser(function (user, done) {
  done(null, user.id)
});

/**
 * 세션아이디를 바탕으로 유저의 정보를 DB에서 찾음
 * req.user에 정보를 저장해줌
 * 
 * @param 아이디 - user의 id 
 */
passport.deserializeUser(function (id, done) {
  db.collection('login').findOne({id:id}, (error,result)=>{done(null,result)})
}); 

/**
 * 로그인 확인 미들웨어
 * @param {Object} req - Express의 request 객체
 * @param {Object} req.user - 사용자 정보. DB에서 모든 정보를 담고 있음. deserializeUser에서 정보를 담음
 * @param {Object} res - Express의 response 객체
 * @param {Function} next - 다음 미들웨어를 호출하는 함수
 */

const isLoggedIn = (req,res,next) => { 
  if(req.user) next()
  else res.send('로그인안하셨는데요?')
}

app.get('/api/mypage',isLoggedIn,(req,res)=>{
  console.log(req.user)
  res.json({사용자:req.user})
})











//라우팅 react담당 그래서 *
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/my-react-app/dist/index.html'));
});


