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
  /**
   * @todo 마이페이지,회원가입 링크 만들기
  */  

  return (
    <>
      <div className='login'>
        <Link to={'/auth'}>로그인</Link>
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
