import React from "react";
//style:
import  "./ToDoItem.css";



class ToDoItem extends React.Component{

    state={
        edit:false,
    }
    
    handleEdit=()=>{
        this.setState({
            edit:true,
        })
    }
    handleUpdateDone=e=>{
        if(e.key==="Enter"){
            this.setState({
                edit:false
            })
        }
    }
    
    render(){

        const{completed, id, title}= this.props.todo;

        let viewMode={}
        let editMode={}

        if(this.state.edit){
            viewMode.display="none"
        }else{
            editMode.display="none"
        }

        


        return(
            
            <li className="item">
                <input 
                type="checkbox"
                className="checkbox"
                checked={completed}
                onChange={()=>{
                    this.props.handleChangeProps(id)
                }}
                
                />
                

                {title}

                
                
                <button
                className="btn-item"
                onClick={()=>
                    this.props.deleteTodoProps(id)}
                >Delete
                </button>

                <div 
                onDoubleClick={this.handleEdit}
                style={viewMode}
                >...
                </div>

                <input 
                type="text" 
                className="textInput"
                style={editMode}
                value={title}
                onChange={
                    e=>{
                        this.props.setUpdateProps(e.target.value,id)
                    }
                }
                onKeyDown={this.handleUpdateDone}
                />
 
               

            </li>
            
        )

    }

}



export default ToDoItem;