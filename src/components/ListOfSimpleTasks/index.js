import React, { Component } from 'react'
import SimpleTask from '../SimpleTask'
import CardGroup from 'react-bootstrap/CardGroup';
import { splitInParts } from '../../utils/auxiliaryFunctions/splitInParts'

export default class index extends Component {
    constructor(props){
        super();
        this.state = {
            group : props.group,
            array:splitInParts(props.tasks, 5)
        }
        console.log(this.state.array)
    }

    render() {
        return (
            <div>
                <h2>{this.state.group}</h2>
                {this.state.array.map(taskGroup => 
                    <CardGroup key={taskGroup[0][0]}>
                        {taskGroup.map(task => <SimpleTask key={task["id"]} title={task["name"]} description={task["description"]}/>)}
                    </CardGroup>
                )}
        </div>
        )
    }
}
