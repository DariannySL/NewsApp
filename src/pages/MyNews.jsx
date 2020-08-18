import React, { Component } from 'react'
import axios from 'axios'
import {Container, Form, Button, Table, ButtonGroup} from 'react-bootstrap'
import {getToken} from '../components/helpers/token'
import MyNewsEdit from '../pages/MyNewsEdit'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default class MyNews extends Component {
    
    state = {
        data: null,
        loading: true,
        categorias: null,
        updateNewsUserOpen: false,
        newsUserNameError: '',
        selectedNewsUser: null
    }

    closeNewsUserModal = () => {
        this.setState({
            updateNewsUserOpen: false
        })
    }

    updateNewsUser = () => {
        const {selectedNewsUser} = this.state

        axios.put(`api/noticias/${selectedNewsUser.IdNoticia}`, selectedNewsUser)
        .then(res => {
            this.setState({
                data: this.state.data.map(item => (
                    item.selectedNewsUser === selectedNewsUser.selectedNewsUser ? selectedNewsUser:item
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
                updateNewsUserOpen: false
            })
        }) 
    }

    newsUserDeleteRequest = (e) => {
        if(window.confirm("¿Desea eliminar esta noticia?")) {
            this.newsUserDelete(parseInt(e.target.value))
        }
    }

    newsUserDelete(IdNoticia) {
        axios.delete(`api/noticias/${IdNoticia}`)
        .then(() => {
            this.setState({
                data: this.state.data.filter(item => item.IdNoticia !== IdNoticia)
            })
        })
    }

    componentDidMount() {
        const token = getToken();
        const AuthStr = 'Bearer '.concat(token);
        console.log(AuthStr);

        axios.get("api/noticias/getnoticiasbyuser", {
            headers: {
                Authorization: AuthStr
            }
        })
        .then(res => {
            this.setState({data: res.data})
        })
        .catch(e => {
            console.log("Error")
        })
        .finally(() => {
            this.setState({loading: false})
            console.log(this.state.data)
        })

        axios.get("api/categorias")
        .then(res => {
            this.setState({categorias: res.data})
        })
    }
    
    render() {

        const {categorias, loading, data, selectedNewsUser, updateNewsUserOpen} = this.state;

        return (
            <Container id="container">
                <div className = "d-flex align-items-center header">

                    <div className = "flex-frow-1">
                        <h2>Repositorio de noticias</h2>
                    </div>

                </div>

                { updateNewsUserOpen? <MyNewsEdit
                    onClose = {this.closeNewsUserModal}
                    onAccept = {this.updateNewsUser}
                    categorias = {categorias}

                    onNewsTitleChanged = {(e) => {
                        this.setState({selectedNewsUser: {...selectedNewsUser, Titular: e.target.value}})
                    }}

                    onNewsSummaryChanged = {(e) => {
                        this.setState({selectedNewsUser: {...selectedNewsUser, Resumen: e.target.value}})
                    }}

                    onNewsContentChanged = {(e) => {
                        this.setState({selectedNewsUser: {...selectedNewsUser, Contenido: e.target.value}})
                    }}

                    onNewsCategoryChanged = {(e) => {
                        this.setState({selectedNewsUser: {...selectedNewsUser, IdCategoria: e.target.value}})
                    }}
                
                /> :null} 

                <div className="table-responsive">

                    <Table className = "table table-hover">
                        <thead className = ".thead-dark"> 
                            
                            <tr>
                                <th>Tit&uacute;lo</th>
                                <th>Fecha</th>
                                <th style = {{width: "154px"}}></th>
                            </tr>

                        </thead>
                        
                        <tbody>
                            {loading?
                            <tr>
                                <td>Cargando...</td>
                            </tr>
                            : data.map((item, index) => <tr key={index}>
                                <td>
                                    {item.Titular}
                                </td>
                                <td>
                                    {item.FechaCreacion}
                                </td>
                                <td>
                                    <ButtonGroup>

                                        <Button className = "btn btn-secondary" onClick = {() => {
                                            this.setState({
                                                selectedNewsUser: item,
                                                updateNewsUserOpen: true
                                            })
                                        }}>Actualizar</Button>

                                        <Button className = "btn btn-danger"
                                            onClick={this.newsUserDeleteRequest} value={item.IdNoticia}
                                        >
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
