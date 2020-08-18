import React, {Component} from 'react';
import{Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import NewsEdit from '../pages/NewsEdit'
import Category from '../pages/Category'
import User from '../pages/User'
import News from '../pages/NewsList'
import ViewNews from '../pages/ViewNews'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Configuration from '../pages/Configuration'
import MyNews from '../pages/MyNews'
import Logout from './Logout'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";  

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")

        let loggedIn = this.props.loggedIn;

        if(token == null) {
            loggedIn = false
        }
        this.state = {
            loggedIn
        }
    }

    render () {

        const {loggedIn} = this.state;

        return(
            <Router>
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={Link} to="/news">News Maxwell</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/news">Noticias</Nav.Link>
                        <Nav.Link as={Link} to="/mynews">Mis noticias</Nav.Link>
                        <Nav.Link as={Link} to="/newsedit">Editor</Nav.Link>
                        <Nav.Link as={Link} to="/configuration">Configuraci&oacute;n</Nav.Link>
                        <Nav.Link as={Link} to="/category">Categorias</Nav.Link>
                        <Nav.Link as={Link} to="/user">Usuarios</Nav.Link>
                        </Nav>
                    <Form inline>
                        {loggedIn? <Button variant="outline-light" to="/logout" onClick={() => {localStorage.removeItem('token'); 
                            this.setState({loggedIn: false})}}>Cerrar sesi&oacute;n</Button>
                        : <Button variant="outline-light" as={Link} to="/login" onClick={() => this.setState({loggedIn: true})}>Iniciar sesión</Button>}
                        <Button variant="outline-light" as={Link} to="/register">Registarse</Button>
                    </Form>
                    </Navbar.Collapse>
                </Navbar>
    
                <Switch>
                    <Route path="/newsedit">
                        <NewsEdit></NewsEdit>
                    </Route>
    
                    <Route path="/category">
                        <Category></Category>
                    </Route>
    
                    <Route path="/user">
                        <User></User>
                    </Route>
    
                    <Route path="/news">
                        <News></News>
                    </Route>
    
                    <Route path="/news2/:id">
                        <ViewNews></ViewNews>
                    </Route>
    
                    <Route path="/register">
                        <Register></Register>
                    </Route>
    
                    <Route path="/login">
                        <Login></Login>
                    </Route>
    
                    <Route path="/configuration">
                        <Configuration></Configuration>
                    </Route>
    
                    <Route path="/mynews">
                        <MyNews></MyNews>
                    </Route>

                    <Route path="/logout">
                        <Logout></Logout>
                    </Route>
                </Switch>
            </Router>
        )

    }
    
}