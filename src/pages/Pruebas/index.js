import React, { Component } from 'react'
import CreateTaskForm from '../../components/CreateTaskForm'
import ListOfSimpleTasks from '../../components/ListOfSimpleTasks'
import UserButton from '../../components/UserButton'
export default class Prueba extends Component {

  render() {
    let tareas = [[1, 'MiTarea1', 'Descripcion1'], [2, 'MiTarea2', 'Descripcion2'], [3, 'MiTarea3', 'Descripcion3'],[4, 'MiTarea1', 'Descripcion1'], [5, 'MiTarea2', 'Descripcion2'], [6, 'MiTarea3', 'Descripcion3'],[7, 'MiTare', 'Descripcion7'], [8, 'MiTarea8', 'Descripcion8'], [9, 'MiTarea9', 'Descripcion9'],[10, 'MiTarea10', 'Descripcion10'], [11, 'MiTarea11', 'Descripcion11'], [12, 'MiTarea12', 'Descripcion12']]
    
    return (
        <div>
            {/*<CreateTaskForm/>*/}
            <UserButton username="Sergio"/>
      </div>
    )
  }
}
