import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {
  let [inputText, setInputText] = useState('');
  let [todo, setTodo] = useState([]);
  let onChange = (e) => {
    setInputText(e.target.value);
  };

  const addTodo = () => {
    setTodo([...todo, inputText]);
    setInputText('');
  };

  return (
    <>
      <div className='nav'>
  <Link to={'/mypage'} className="mr-3">마이페이지</Link>
  <Link to={'/auth'} className="mr-3">로그인</Link>
  <Link to={'/signup'}>회원가입</Link>
</div>

      <div className='container'>
        <div className='todoBox d-flex'>
          <input
            onChange={onChange}
            value={inputText}
            className='todoInput'
            type='text'
            placeholder='할일 입력'
          />
          <button
            className='btn btn-primary'
            style={{fontSize:"15px",width:"60px"}}
            onClick={() => {
              addTodo();
              axios
                .post('/todo', {
                  title: inputText,
                })
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            입력
          </button>
        </div>
        <div className='resultList'>
          {todo.map((a, i) => {
            return (
              <div className='listBox' key={i}>
                <ul className='list-group'>
                  <li className='list-group-item d-flex justify-content-between'>{a}
                <button
                  className='btn btn-danger del-button'
                  onClick={() => {
                    let copy = [...todo];
                    copy.splice(i, 1);
                    setTodo(copy);
                  }}
                  >
                  삭제
                </button>
                  </li>
                  </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
