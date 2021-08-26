import React, { useState, useEffect } from "react";
//style:
import "./ToDoItem.css";

const ToDoItem = (props) => {
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(true);
    };

    const handleUpdateDone = (e) => {
        if (e.key === "Enter") {
            setEdit(false);
        }
    };
    /* const componentWillUnmount(){
          console.log("Cleaning up...")
      } */

    const completedStyle = {
        fontStyle: "italic",
        color: "595959",
        opacity: 0.4,
        textDecoration: "line-through",
    };

    const { completed, id, title } = props.todo;

    let viewMode = {};
    let editMode = {};

    if (edit) {
        viewMode.display = "none";
    } else {
        editMode.display = "none";
    }

    useEffect(() => {
        return () => {
          console.log("Cleaning up...")
        }
      }, [])

    return (
        <li className="item">
            <div onDoubleClick={handleEdit} style={viewMode}>
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={completed}
                    onChange={() => {
                        props.handleChangeProps(id);
                    }}
                />

                <button 
                className="btn-item" 
                onClick={() => props.deleteTodoProps(id)}>
                    Delete
                </button>

                <span style={completed ? completedStyle : null}>{title}</span>
            </div>

            <input
                type="text"
                className="textInput"
                style={editMode}
                value={title}
                onChange={(e) => {
                    props.setUpdateProps(e.target.value, id);
                }}
                onKeyDown={handleUpdateDone}
            />
        </li>
    );
};

export default ToDoItem;


