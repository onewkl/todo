import React,{Component} from 'react';
import '../style/todo-item.scss'
export default class TodoItem extends Component{
  constructor(props){
    super(props);
  }
  handleToggle = e => {
    let todo = this.props.todo;
    todo.finished = !todo.finished;
    this.props.toggle(todo)
  }
  handleDelete = () => {
    this.props.deleteTodo([this.props.todo])
  }
  render(){
    return(
      <li className="todo-item">
        <input type="checkbox"  checked = {this.props.todo.finished} onChange={this.handleToggle}/>
        <span>{this.props.todo.title}</span>
        <a onClick={this.handleDelete}>删除</a>
      </li>
    )
  }
}