import React, {Component} from 'react'
import axios from 'axios'
import {Container, Form, Button, Row, Col} from 'react-bootstrap'
import '../pages/Register.css'

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {

            user: {
                Email: '',
                Password: '',
                ConfirmPassword: '',
                Rol: 'Estandar'
            },

            userError: {
                emailError: '',
                passwordError: '',
                confirmPasswordError: '',
                rolError: ''
            }

        }
    }

    validate = (user) => {
        if(!(user.Email)) {
            this.setState({userError: {
                ...this.state.userError, 
                emailError: 'Este campo es obligatorio'
            }})
            return false;
        }
        else if(!(user.Password)) {
            this.setState({userError: {
                ...this.state.userError, 
                passwordError: 'Este campo es obligatorio'
            }})
            return false;
        }
        else if(!(user.ConfirmPassword)) {
            this.setState({userError: {
                ...this.state.userError, 
                confirmPasswordError: 'Este campo es obligatorio'
            }})
            return false;
        }
        else if(!(user.Rol)) {
            this.setState({userError: {
                ...this.state.userError, 
                rolError: 'Este campo es obligatorio'
            }})
            return false;
        }

        return true;
    }

    createUser = (e) => {

        e.preventDefault();
        if(!this.validate(this.state.user)) {
            return;
        }

        axios.post("api/account/register", this.state.user)
        .then(() => {
            this.setState({   
                user: {
                    Email: '',
                    Password: '',
                    ConfirmPassword: '',
                    Rol: 'Estandar'
                }
            })  
        }).catch(e => {

            if(e === 400) {
                alert("Datos invalidos")
            }
            else {
                alert("Ha ocurrido un error")
            }

        })
    }

    onChangeUserEmail = (value) => {
        this.setState( {
            user: {
                ...this.state.user,
                Email:value
            }
        })
    }

    onChangeUserPassword = (value) => {
        this.setState( {
            user: {
                ...this.state.user,
                Password:value
            }
        })
    }

    onChangeUserPasswordC = (value) => {
        this.setState( {
            user: {
                ...this.state.user,
                ConfirmPassword:value
            }
        })
    }

    render() {
        
        const {userError} = this.state;

        return (

            <Container id='register-content'>
                <Row>
                    <Col xl={9} lg={9} md={8} sm={12} xs={12}>

                        <h2>Registrarse</h2>
                        
                        <Form id="registerForm" method="post" encType="multipart/form-data" onSubmit={this.createUser}>

                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Email" 
                                    onChange={(e) => this.onChangeUserEmail(e.target.value)}
                                    value={this.state.user.Email} onInput={() => {this.setState({userError: {...this.state.userError, emailError: ''}})}}/>
                                {userError.emailError?<div className="text-danger">{userError.emailError}</div> :null}
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Contraseña" 
                                    onChange={(e) => this.onChangeUserPassword(e.target.value)}
                                    value={this.state.user.Password} onInput={() => {this.setState({userError: {...this.state.userError, passwordError: ''}})}}/>
                                {userError.passwordError?<div className="text-danger">{userError.passwordError}</div> :null}
                            </Form.Group>

                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirmar contraseña</Form.Label>
                                <Form.Control type="password" name="confirmPassword" placeholder="Contraseña" 
                                    onChange={(e) => this.onChangeUserPasswordC(e.target.value)}
                                    value={this.state.user.ConfirmPassword} onInput={() => {this.setState({userError: {...this.state.userError, confirmPasswordError: ''}})}}/>
                                {userError.confirmPasswordError?<div className="text-danger">{userError.confirmPasswordError}</div> :null}
                            </Form.Group>

                            <Button variant="primary" type="submit" form="registerForm">
                                Registrarse
                            </Button>

                        </Form>

                    </Col>
                </Row>
            </Container>

        )
    }
}

export default Register