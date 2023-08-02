import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
/**
 * @todo passport라이브러리 미들웨어 구축
 */
function Login() {



  return (
    <div className='container mt-5'>
      <h2>로그인</h2><br/>
    <Form method='POST' action='/login'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>아이디</Form.Label>
        <Form.Control type="text" placeholder="아이디를 입력해주세요" name="id"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control type="password" placeholder="비밀번호를 입력해주세요" name="pw"/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" type="submit">
        로그인
      </Button>
    </Form>
    </div>
  );
}
export default Login;