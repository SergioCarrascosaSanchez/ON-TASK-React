import React, { Component } from 'react'
import SimpleTask from '../SimpleTask'
import CardGroup from 'react-bootstrap/CardGroup';
import { splitInParts } from '../../utils/auxiliaryFunctions/splitInParts'
import { Link } from 'react-router-dom';

export default class index extends Component {
    constructor(props){
        super();
        this.state = {
            groupId: props.groupId,
            group : props.group,
            array:splitInParts(props.tasks.sort((a,b)=> {return a.id - b.id}), 4)
        }
    }

    render() {
        const url = '/groups/'+this.state.groupId
        if(this.state.array.length === 0){
            return(
                <div>
                    <Link to={url} style={{ textDecoration: 'none', color:'black' }}>
                        <h4 className="mt-5">{this.state.group}</h4>
                    </Link>
                    <p className="fs-6 text-muted">No tienes tareas asignadas en este grupo</p>
                </div>
            )
        }
        return (
            <div>
                <Link to={url} style={{ textDecoration: 'none', color:'black' }}>
                    <h4 className="mt-5">{this.state.group}</h4>
                </Link>
                {this.state.array.map(taskGroup => 
                    <CardGroup key={"taskGroup"+taskGroup[0]["id"]}>
                        {taskGroup.map(task =>
                            <Link key={"SimpleTask"+task["id"]} to={'/tasks/'+task["id"]} style={{ textDecoration: 'none', color:'black' }} onClick={() => {window.localStorage.setItem("group", this.state.groupId)}}>
                                <SimpleTask id={task["id"]} title={task["name"]} description={task["description"]} />
                            </Link>
                            )}
                    </CardGroup>
                )}
            </div>
        )
    }
}
