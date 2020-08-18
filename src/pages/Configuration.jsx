import React, { Component } from 'react'
import { Container, Form, FormGroup, Button } from 'react-bootstrap'
import axios from 'axios'

export default class Configuration extends Component {

    state = {
        paginacion: {
            IdPaginacion: 0,
            Page_size: 0
        }
    }

    componentDidMount() {
        axios.get("api/paginacion")
        .then(res => {
            this.setState({paginacion: {
                ...this.state.paginacion,
                IdPaginacion: res.data[0].IdPaginacion,
                Page_size: res.data[0].Page_size
            }})
        })
    }

    onChangePageSize = (value) => {
        this.setState( {
            paginacion: {
                ...this.state.paginacion,
                Page_size: value
            }
        })
    }

    updatePagination = (e) => {
        e.preventDefault();
        const {paginacion} = this.state;
        console.log(paginacion);
        axios.put(`api/paginacion/${paginacion.IdPaginacion}`, paginacion)
    }

    render() {
        const {paginacion} = this.state;

        return (
            <Container>
                <Form id="paginationForm" onSubmit={this.updatePagination}>

                    <FormGroup>
                        <Form.Label>N&uacute;mero de noticias por p&aacute;gina</Form.Label>
                        <Form.Control required type="number" min="1" max="45" onChange={(e) => this.onChangePageSize(e.target.value)}
                        value={paginacion.Page_size}></Form.Control>
                    </FormGroup>
                    
                </Form>
                <Button variant="primary" type="submit" form="paginationForm">
                    Guardar
                </Button>
            </Container>
        )
    }
}
