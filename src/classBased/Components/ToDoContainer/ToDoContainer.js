import React from "react";
import ToDoList from "../ToDoList/ToDoList";
import ToDoInput from "../ToDoInput/ToDoInput";
import Header from "../Header/Header";
import { v4 as uuidv4 } from "uuid";
//style
import "./ToDoContainer.css"

class ToDoContainer extends React.Component {
  state = {
    
    todos: [],
  };

  handleChange = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todoObj) => {
        if (todoObj.id === id) {
          return {
            ...todoObj,
            completed: !todoObj.completed,
          };
        }
        return todoObj;
      }),
    }));
  };

  deleteTodo = (id) => {
    this.setState({
      todos: [
        ...this.state.todos.filter((todoObj) => {
          return todoObj.id !== id;
        }),
      ],
    });
  };
  
  addToDoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  setUpdate=(updateTitle, id)=>{
      this.setState({
        todos:this.state.todos.map(todoObj=>{
            if(todoObj.id===id){
                todoObj.title=updateTitle
            }
            return todoObj;
        })

      })
  }

  /* componentDidMount(){
    fetch(`https://jsonplaceholder.typicode.com/todos?_limit=10`)
    .then(response=>response.json())
    .then(data=>this.setState({
      todos:data
    }))

  } */
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




  render() {
    return (
      
      <React.Fragment>
        <div className="container">
          <div className="inner">
            <Header />
            <ToDoInput addToDoItemProps={this.addToDoItem} />

            <ToDoList
              todos={this.state.todos}
              handleChangeProps={this.handleChange}
              deleteTodoProps={this.deleteTodo}
              setUpdateProps={this.setUpdate}
            />
          </div>
        </div>
       
      </React.Fragment>

    );
  }
}
export default ToDoContainer;
