import React, {Component} from 'react'
import axios from 'axios'
import {Container, ButtonGroup, Button, Table} from 'react-bootstrap'
import CategoryModal from './CategoryModal'
import '../pages/Category.css'

export default class Category extends Component {

    state = {
        loading: true,
        data: null,
        categoryModalOpen: false,
        updateCategoryOpen: false,
        categoryNameError: '',
        selectedCategory: null,
    }

    componentDidMount() {
        axios.get("api/categorias")
        .then(res => {
            this.setState({data:res.data, loading:false})
        })
    }

    closeCategoryModal = () => {
        this.setState({
            categoryModalOpen: false,
            updateCategoryOpen: false
        })
    }

    categoryClic = () => {
        this.setState({
            categoryModalOpen: true
        })
    }

    createCategory = (data) => {

        if(!(data.NombreCategoria)) {
            this.setState({categoryNameError: "Este campo es obligatorio"})
            return;
        }

        axios.post("api/categorias", data)
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
                categoryModalOpen: false
            })
        })
    }

    updateCategory = () => {
        const {selectedCategory} = this.state
        if(!(selectedCategory.NombreCategoria)) {
            this.setState({
                categoryNameError: "Este campo es obligatorio"})
            return;
        }

        axios.put(`api/categorias/${selectedCategory.IdCategoria}`, selectedCategory)
        .then(res => {
            this.setState({
                data: this.state.data.map(item => (
                    item.IdCategoria === selectedCategory.IdCategoria ? selectedCategory:item
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
                updateCategoryOpen: false
            })
        }) 
    }

    categoryDeleteRequest = (e) => {
        if(window.confirm("¿Desea eliminar esta categoria?")) {
            this.categoryDelete(parseInt(e.target.value))
        }
    }

    categoryDelete(IdCategoria) {
        axios.delete(`api/categorias/${IdCategoria}`)
        .then(() => {
            this.setState({
                data: this.state.data.filter(item => item.IdCategoria !== IdCategoria)
            })
        })
    }

    render() {
        const {loading, data, categoryModalOpen, categoryNameError, selectedCategory, updateCategoryOpen} = this.state;
    
        return(
            <Container id="container">
                <div className = "d-flex align-items-center header">

                    <div className = "flex-frow-1">
                        <h2>Categorias</h2>
                    </div>

                    <div className = "right">
                        <button className = "btn btn-primary" onClick = {this.categoryClic}>Agregar categoria</button>
                    </div>

                </div>

                { categoryModalOpen? <CategoryModal
                    onClose = {this.closeCategoryModal}
                    onAccept = {this.createCategory}
                    categoryNameError = {categoryNameError}
                    onCategoryNameChanged = {() => {
                        this.setState({categoryNameError: ''})
                }}/> :null}

                { updateCategoryOpen? <CategoryModal
                    categoryName = {selectedCategory.NombreCategoria}
                    onClose = {this.closeCategoryModal}
                    onAccept = {this.updateCategory}
                    categoryNameError = {categoryNameError}
                    onCategoryNameChanged = {(e) => {
                        this.setState({categoryNameError: '',
                        selectedCategory: {...selectedCategory, NombreCategoria: e.target.value}})
                }}/> :null}

                <div className="table-responsive">

                    <Table className = "table table-hover">
                        <thead className = ".thead-dark"> 
                            
                            <tr>
                                <th>Nombre</th>
                                <th style = {{width: "154px"}}></th>
                            </tr>

                        </thead>
                        
                        <tbody>
                            {loading?
                            <tr>
                                <td>Cargando...</td>
                            </tr>
                            : data.map((item, index) => <tr key = {index}>
                                <td>
                                    {item.NombreCategoria}
                                </td>
                                <td>
                                    <ButtonGroup>

                                        <Button className = "btn btn-secondary" onClick = {() => {
                                            this.setState({
                                                selectedCategory: item,
                                                updateCategoryOpen: true
                                            })
                                        }}>Actualizar</Button>

                                        <Button className = "btn btn-danger" onClick = {this.categoryDeleteRequest} value = {item.IdCategoria}>
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