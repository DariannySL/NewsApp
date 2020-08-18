import React, {Component} from 'react'
import axios from 'axios'
import {Container, ButtonGroup, Button, Table} from 'react-bootstrap'
import CategoryModal from './UserModal'
import '../pages/User.css'

export default class User extends Component {

    state = {
        loading: true,
        data: null,
        userModalOpen: false,
        userUpdateModalOpen: false,

        userError: {
            nameError: '',
            emailError: '',
            passwordError:''
        },

        selectedUser: null,
    }

    componentDidMount() {
        axios.get("api/Account")
        .then(res => {
            this.setState({data:res.data, loading:false})
        })
    }

    closeUserModal = () => {
        this.setState({
            userModalOpen: false,
            userUpdateModalOpen: false
        })
    }

    userModalClick = () => {
        this.setState({
            userModalOpen: true
        })
    }

    validate = (user) => {
        if(!(user.NombreUsuario)) {
            this.setState({userError: {
                ...this.state.userError, 
                nameError: 'Este campo es obligatorio'
            }})
            return false;
        }
        else if(!(user.Apellidos)) {
            this.setState({userError: {
                ...this.state.userError, 
                lastNameError: 'Este campo es obligatorio'
            }})
            return false;
        }
        else if(!(user.Email)) {
            this.setState({userError: {
                ...this.state.userError, 
                emailError: 'Este campo es obligatorio'
            }})
            return false;
        }
        else if(!(user.Contraseña)) {
            this.setState({userError: {
                ...this.state.userError, 
                passwordError: 'Este campo es obligatorio'
            }})
            return false;
        }

        return true;
    }

    createUser = (data) => {

        if(!this.validate(data)) {
            return;
        }

        axios.post("api/account/register", data)
        .then(res => {
            this.setState({
                data:[...this.state.data, res.data]
            })
            
        }).catch(e => {

            if(e === 400) {
                alert("Datos invalidos")
            }
            else {
                alert("Ha ocurrido un error")
            }

        }).finally(() => {
            this.setState({
                userModalOpen: false
            })
        })
    }

    updateUser = () => {

        const {selectedUser} = this.state;

        if(!this.validate(selectedUser)) {
            return;
        }

        axios.put(`api/usuarios/${selectedUser.IdUsuario}`, selectedUser)
        .then(res => {
            this.setState({
                data: this.state.data.map(item => (
                    item.IdUsuario === selectedUser.IdUsuario ? selectedUser:item
                ))
            })
        }).catch(e => {

            if(e === 400) {
                alert("Datos invalidos")
            }
            else {
                alert("Ha ocurrido un error")
            }

        }).finally(() => {
            this.setState({
                userUpdateModalOpen: false
            })
        }) 
    }

    userDeleteRequest = (e) => {
        if(window.confirm("¿Desea eliminar este usuario?")) {
            this.userDelete(parseInt(e.target.value))
        }
    }

    userDelete(IdUsuario) {
        axios.delete(`api/usuarios/${IdUsuario}`)
        .then(() => {
            this.setState({
                data: this.state.data.filter(item => item.IdUsuario !== IdUsuario)
            })
        })
    }

    render() {
        const {loading, data, userModalOpen, userError, selectedUser, userUpdateModalOpen} = this.state;
    
        return(
            <Container id="container">
                <div className = "d-flex align-items-center header">

                    <div className = "flex-frow-1">
                        <h2>Usuarios</h2>
                    </div>

                    <div className="right">
                        <button className = "btn btn-primary" onClick = {this.userModalClick}>Agregar Usuario</button>
                    </div>

                </div>

                { userModalOpen? <CategoryModal
                    onClose = {this.closeUserModal}
                    onAccept = {this.createUser}
                    userError = {userError}

                    onEmailChanged = {() => {
                        this.setState({userError: {
                            ...this.state.userError, emailError: ''
                        }})
                    }}

                    onPasswordChanged = {() => {
                        this.setState({userError: {
                            ...this.state.userError, passwordError: ''
                        }})
                    }}

                /> :null}

                { userUpdateModalOpen? <CategoryModal
                    userName = {selectedUser.NombreUsuario}
                    userLastName = {selectedUser.Apellidos}
                    userEmail = {selectedUser.Email}
                    userPassword = {selectedUser.Contraseña}
                    userRol = {selectedUser.IdRol}
                    userId = {selectedUser.IdUsuario}

                    onClose = {this.closeUserModal}
                    onAccept = {this.updateUser}
                    userError = {userError}

                    onNameChanged = {(e) => {
                        this.setState({userError: {
                            ...this.state.userError, nameError: ''
                        }, selectedUser: {...selectedUser, NombreUsuario: e.target.value}})
                    }}

                    onLastNameChanged = {(e) => {
                        this.setState({userError: {
                            ...this.state.userError, lastNameError: ''
                        }, selectedUser: {...selectedUser, Apellidos: e.target.value}})
                    }}

                    onEmailChanged = {(e) => {
                        this.setState({userError: {
                            ...this.state.userError, emailError: ''
                        }, selectedUser: {...selectedUser, Email: e.target.value}})
                    }}

                    onPasswordChanged = {(e) => {
                        this.setState({userError: {
                            ...this.state.userError, passwordError: ''
                        }, selectedUser: {...selectedUser, Contraseña: e.target.value}})
                    }}

                    onRolChanged = {(e) => {
                        this.setState({selectedUser: {...selectedUser, IdRol: parseInt(e.target.value)}})
                    }}

                /> :null}

                <div className="table-responsive">

                    <Table className = "table table-hover">
                        <thead>
                            
                            <tr>
                                <th>Email</th>
                                <th>Rol</th>
                                <th style = {{width: "20px"}}></th>
                            </tr>

                        </thead>
                        
                        <tbody>
                            {loading?
                            <tr>
                                <td>Cargando...</td>
                            </tr>
                            : data.map((item, index) => <tr key = {index}>
                            
                                <td>{item.Email}</td>
                                <td>{item.Rol}</td>

                                <td>
                                    <ButtonGroup>

                                        <Button className = "btn btn-secondary" onClick = {() => {
                                            this.setState({
                                                selectedUser: item,
                                                userUpdateModalOpen: true
                                            })
                                        }}>Actualizar</Button>

                                        <Button className = "btn btn-danger" onClick = {this.userDeleteRequest} value = {item.IdUsuario}>
                                            Eliminar
                                        </Button>

                                    </ButtonGroup>
                                </td>
                            </tr>)}
                        </tbody>
                    </Table>

                </div>
                
            </Container>
        )
    }
}