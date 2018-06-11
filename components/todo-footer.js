import React, {Component} from 'react'
export default class TodoFooter extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <footer>还有{this.props.unfinish}项未完成</footer>
        )
    }
}