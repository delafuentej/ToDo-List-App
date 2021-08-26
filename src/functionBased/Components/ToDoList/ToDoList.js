import React from "react";
import ToDoItem from "../ToDoItem/ToDoItem";

const ToDoList=(props)=>{
   
        return(
            <ul>
                {props.todos.map(todo=>(
                    <ToDoItem 
                    key={todo.id} 
                    todo={todo} 
                    handleChangeProps={props.handleChangeProps}
                    deleteTodoProps={props.deleteTodoProps}
                    setUpdateProps={props.setUpdateProps}
                    
                    />
                ))}
            </ul>
        )
    }




export default ToDoList;