import { Link } from "react-router-dom";

function Welcome(){
  return(
    <div>
      <h1>회원가입을 환영합니다!</h1>
      <h3><Link to={'/auth'}>로그인하러가기</Link></h3>
    </div>
  )
}

export default Welcome;