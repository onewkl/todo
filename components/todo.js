import React, {Component} from 'react';
import TodoHeader from './todo-header';
import TodoList from './todo-list';
import TodoFooter from './todo-footer'
import request from '../util/store';
import '../style/todo.scss'
export default class Todo extends Component{
  constructor(){
    super()
    this.state = {
      unfinish: 0
    };
    this.reLoad();
  }
  addTodo = todo => {
    request('addTodo', todo)
      .then(res => {
        this.reLoad();
      });
  }
  finishAll = () => {
    request('finishAll', this.state.unfinish != 0)
      .then(()=>{
        this.reLoad()
      })
  }
  reLoad = () => {
    request('getTodo')
      .then(res => {
        this.setState({
          list: res.data.list,
          unfinish: res.data.unfinish
        });
      })
  }
  toggle = (todo) => {
    request('updateTodo', todo)
      .then(res => {
        this.reLoad()
      })
  }
  deleteTodo = todos => {
    request('deleteTodo',todos)
      .then(res => {
        this.reLoad()
      })
  }
  render(){
    return (
      <div className="todo-container">
        <h1 className="todo-title">TODO</h1>
        <div className="todo-wrapper">
          <TodoHeader
           addTodo={this.addTodo}
           unfinish = {this.state.unfinish}
           finishAll = {this.finishAll}
          />
          <TodoList
           refresh = {this.reLoad}
           todos = {this.state.list}
           toggle = {this.toggle}
           deleteTodo = {this.deleteTodo}
           />
           <TodoFooter
            unfinish = {this.state.unfinish}
           />
        </div>
      </div>
    )
  }
}