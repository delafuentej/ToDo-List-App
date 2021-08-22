import React from "react";
import ToDoList from "../ToDoList/ToDoList";
import ToDoInput from "../ToDoInput/ToDoInput";
import Header from "../Header/Header";
import { v4 as uuidv4 } from "uuid";
//style
import "./ToDoContainer.css"

class ToDoContainer extends React.Component {
  state = {
    todos: [
      {
        id: uuidv4(),
        title: "Schlafen",
        completed: true,
      },
      {
        id: uuidv4(),
        title: "Essen",
        completed: true,
      },
      {
        id: uuidv4(),
        title: "Programmieren",
        completed: false,
      },
    ],
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
