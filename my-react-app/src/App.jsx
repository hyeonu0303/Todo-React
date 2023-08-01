import './App.css';
import {useState} from "react";
import axios from 'axios';

function App() {
  let [inputText, setInputText] = useState('');
  let [todo, setTodo] = useState([]);
  let onChange = (e)=>{
    setInputText(e.target.value);
  }
  
  const addTodo = () => {
    setTodo([...todo, inputText]);
    setInputText('');
  };
  return (
    <>
    <div className='container'>
      <div className='todoBox d-flex'>
        <input onChange={onChange} value={inputText} className='todoInput' type="text" placeholder='할일 입력'/>
        <button className='btn btn-primary' onClick={()=>{
          addTodo();
          axios.post('/todo', {
            title:inputText
        })
        .then(function (response) {
              console.log(response)  
        }).catch(function (error) {
            console.log(error)
        }).then(function() {
            // 항상 실행
        });
        }}>입력</button>
      </div>
      <div className='resultList'>
        {
          todo.map((a,i)=>{
            return <>
              <ul className="list-group">
                <li key={i} className="list-group-item">{a}
                <button onClick={()=>{
                  let copy = [...todo];
                  copy.splice(i,1);
                  setTodo(copy);
                }}>삭제</button></li>
              </ul>              
            </>
          })
        }
      </div>
    </div>
    </> 
  );
}
export default App
