import React, {Component} from 'react'
import axios from 'axios'
import {Container, Form, Button, Row, Col} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import qs from 'qs'

class Login extends Component {
    constructor(props) {
        super(props);

        let loggedIn = false;

        this.state = {

            user: {
                username: '',
                password: '',
                grand_type: 'password'
            },

            loggedIn,
            userError: {
                userNameError: '',
                passwordError: ''
            }

        }
    }

    validate = (user) => {
        if(!(user.username)) {
            this.setState({userError: {
                ...this.state.userError, 
                userNameError: 'Este campo es obligatorio'
            }})
            return false;
        }
        else if(!(user.password)) {
            this.setState({userError: {
                ...this.state.userError, 
                passwordError: 'Este campo es obligatorio'
            }})
            return false;
        }

        return true;
    }

    onChangeUserName = (value) => {
        this.setState( {
            user: {
                ...this.state.user,
                username:value
            }
        })
    }

    onChangeUserPassword = (value) => {
        this.setState( {
            user: {
                ...this.state.user,
                password:value
            }
        })
    }

    login = (e) => {
        e.preventDefault();
        if(!this.validate(this.state.user)) {
            return;
        }

        let data = qs.stringify({
            grant_type: "password",
            username: this.state.user.username,
            password: this.state.user.password
        },
            {encode: false}
        );
        let config = {
            method: "post",
            url:"token",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },

            data: data
        };
    
        axios(config)
        .then(res => {
            localStorage.setItem('token', res.data.access_token);
            console.log(res.data);
            this.setState({loggedIn: true})
        })
        .catch(e => {
            if(e.response.status === 400)
                alert("Los datos ingresados no son validos.")
            else
                alert(e.response.message)
        })
        .finally(() => {
            this.setState({
                user:{
                    username: '',
                    password: '',
                    grand_type: 'password'
                }
            })
        })
    }
              


    render() {
        
        const {userError} = this.state;

        return (

            <Container id='container'>
                <Row>
                    <Col xl={9} lg={9} md={8} sm={12} xs={12}>

                        <h2>Inicio de sesi&oacute;n</h2>
                        
                        <Form id="loginForm" onSubmit={this.login}>

                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Email" 
                                    onChange={(e) => this.onChangeUserName(e.target.value)}
                                    value={this.state.user.username} onInput={() => this.setState({userError: {...this.state.userError, userNameError: ''}})}/>
                                {userError.userNameError?<div className="text-danger">{userError.userNameError}</div> :null}
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Contraseña" 
                                    onChange={(e) => this.onChangeUserPassword(e.target.value)}
                                    value={this.state.user.password} onInput={() => this.setState({userError: {...this.state.userError, passwordError: ''}})}/>
                                {userError.passwordError?<div className="text-danger">{userError.passwordError}</div> :null}
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Iniciar sesi&oacute;n
                            </Button>

                        </Form>

                    </Col>
                </Row>
            </Container>

        )
    }
}

export default Login