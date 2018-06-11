import React, {Component} from 'react';
import '../style/todo-header.scss'
export default class TodoHeader extends Component{
  constructor(props){
    super(props);
    this.state = {
      value:''
    }
  }
  handleChange = (e)=>{
    this.setState({
      value: e.target.value
    })
  }
  handleSubmit=(e)=>{
    if(e.keyCode != 13) return;
    let value = this.state.value;
    if(!value.match(/\S/)) return;
    this.props.addTodo(
      {
        title: value,
        finished: false
      }
    )
    this.setState({
      value: ''
    })
    
  }
  render(){
    return (
      <header className="todo-header">
        
        <input className="add-item-input" type="text" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleSubmit}/>
        
        <input type="checkbox" checked={this.props.unfinish == 0} onChange={this.props.finishAll}/>
      </header>
    )
  }
}