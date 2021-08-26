import React, {useState, useEffect} from "react";
import ToDoList from "../ToDoList/ToDoList";
import ToDoInput from "../ToDoInput/ToDoInput";
import Header from "../Header/Header";
import { v4 as uuidv4 } from "uuid";
//style
import "./ToDoContainer.css"

const ToDoContainer=(props)=> {
  
  const[todos, setTodos]=useState(getInitialTodos())

  function getInitialTodos() {
    // getting stored items
    const temp = localStorage.getItem("todos")
    const savedTodos = JSON.parse(temp)
    return savedTodos || []
  }

  const handleChange = (id) => {
    setTodos((prevState) => 
       prevState.map((todoObj) => {
        if (todoObj.id === id) {
          return {
            ...todoObj,
            completed: !todoObj.completed,
          };
        }
        return todoObj;
      }),
    );
  };

  const deleteTodo = (id) => {
    setTodos([
        ...todos.filter((todoObj) => {
          return todoObj.id !== id;
        }),
      ]);
  };
  
  const addToDoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    setTodos([...todos, newTodo])
    
  };

  const setUpdate=(updateTitle, id)=>{
      setTodos(todos.map(todoObj=>{
            if(todoObj.id===id){
                todoObj.title=updateTitle
            }
            return todoObj;
        })

      )
  }
//componentDidMount
  useEffect(()=>{
    console.log("test run");
    const temp= localStorage.getItem("todos");
    const loadedTodos= JSON.parse(temp);
      if(loadedTodos){
        setTodos(loadedTodos)
      }
  
},[setTodos])

//componentDidUpdate
useEffect(()=>{
    const temp=JSON.stringify(todos)
    localStorage.setItem("todos", temp)

}, [todos])



  /* componentDidMount(){
    fetch(`https://jsonplaceholder.typicode.com/todos?_limit=10`)
    .then(response=>response.json())
    .then(data=>this.setState({
      todos:data
    }))

  } */
  /*
  componentDidUpdate(prevProps, prevState){
     // arrays können nicht direkt miteinander verglichen werden
    // => if(previousState.todos !== this.state.todos) wäre IMMER true
    // Stattdessen: Arrays ins String umwandeln 
    if(prevState.todos!==this.state.todos){
      const temp=JSON.stringify(this.state.todos);
       // Hier ist es sinnvoll, die neuen Daten/State in einer Datenbank zu speichern
      // in unserem Fall in localStorage
      localStorage.setItem("todos",temp)
    }
  }
  componentDidMount(){
      const temp= localStorage.getItem("todos");
      const loadedTodos= JSON.parse(temp);
      if(loadedTodos){
        this.setState({
          todos:loadedTodos
        })
      }
  }

*/


  
    return (
      
      <React.Fragment>
        <div className="container">
          <div className="inner">
            <Header />
            <ToDoInput addToDoItemProps={addToDoItem} />

            <ToDoList
              todos={todos}
              handleChangeProps={handleChange}
              deleteTodoProps={deleteTodo}
              setUpdateProps={setUpdate}
            />
          </div>
        </div>
       
      </React.Fragment>

    );
  
}
export default ToDoContainer;
