import React, { Component } from 'react';
import TodoItem from './todo-item'
import '../style/todo-list.scss'
export default class TodoList extends Component {
  constructor(props) {
    super(props)
    
  }
  render(){
    let todos;
    if(this.props.todos){
      todos = this.props.todos.map(todo => {
        if(todo.unFinish){
          unFinish --;
        }
        return (
        <TodoItem 
          todo = {todo}
          key = {todo.id}
          toggle = {this.props.toggle}
          deleteTodo = {this.props.deleteTodo}
        />
        )
      })
    }
    return (
      <ul className="todo-list">
        {todos}
      </ul>
    )
  }
}