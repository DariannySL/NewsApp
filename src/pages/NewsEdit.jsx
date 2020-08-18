import React, {Component} from 'react'
import {Container, Row, Col, Card, FormGroup, Button, Form} from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../pages/NewsEdit.css'
import axios from 'axios'

class NewsEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorias: null,

            noticias: {
                Usuario: '',
                IdEstado: 1,
                IdCategoria: 0,
                Titular: '',
                Portada: null,
                Resumen: '',
                Contenido: '',
                FechaCreacion: new Date(),
                FechaPublicacion: new Date(),
            },

            titleError: '',
            summaryError: '',
            imageError: ''
        }
    }

    modules = {
        toolbar: {
            container: [
                [{'header': '1'}, {'header': '2'}, {'font': []}],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'},
                    {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean'], ['code-block']
            ],
        },
        clipboard: {
            matchVisual: false,
        },
    }

    formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underLine',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code-block',
    ]

    validate = () => {

        var portada = document.querySelector('input[type=file]').files[0];

        if(!(this.state.noticias.Titular)) {
            this.setState({titleError: 'Este campo es obligatorio'})
            return false;
        }
        else if(!(this.state.noticias.Resumen)) {
            this.setState({summaryError: 'Este campo es obligatorio'})
            return false;
        }
        else if(portada == null) {
            this.setState({imageError: 'Este campo es obligatorio'})
            return false;
        }

        return true;
    }

    getImage = (e) => {

        let file = e.target.files[0];

        let quill = this.quill.getEditor();
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            this.onChangeNewsImage(reader.result);
        }, false);

        if(file) {
            reader.readAsDataURL(file);
        }
    }

    onChangeNewsTitle = (value) => {
        this.setState( {
            noticias: {
                ...this.state.noticias,
                Titular:value
            }
        })
    }

    onChangeNewsContent = (value) => {
        this.setState( {
            noticias: {
                ...this.state.noticias,
                Contenido:value
            }
        })
    }

    onChangeNewsSummary= (value) => {
        this.setState( {
            noticias: {
                ...this.state.noticias,
                Resumen:value
            }
        })
    }

    onChangeNewsImage= (value) => {
        this.setState( {
            noticias: {
                ...this.state.noticias,
                Portada:value
            }
        })
    }

    onChangeNewsPublish= (value) => {
        this.setState( {
            noticias: {
                ...this.state.noticias,
                IdEstado:value
            }
        })
    }

    componentDidMount() {
        axios.get("api/categorias")
        .then(res => {
            this.setState({categorias: res.data})
        })
    }

    createNews = (e) => {
        e.preventDefault();

        if(!this.validate()) {
            return;
        }

        const IdCategoria = parseInt(e.target.elements["IdCategoria"].value);
        const noticias = this.state.noticias;
        noticias.IdCategoria = IdCategoria;

        console.log(noticias);

        axios.post("api/noticias", this.state.noticias)
        .then(() => {
            this.setState({
                noticias: {
                    Usuario: '',
                    IdEstado: 1,
                    IdCategoria: 0,
                    Titular: '',
                    Portada: null,
                    Resumen: '',
                    Contenido: '',
                    FechaCreacion: new Date(),
                    FechaPublicacion: new Date(),
                }
            })
        })
        // .catch(err=>{
        //     if(err.response.status === 400)
        //         alert("Los datos ingresados no son validos.")
        //     else
        //         alert("Error inesperado.")
        // })
    }

    render() {
        const {categorias, titleError, summaryError, imageError} = this.state;
        return(
            <Container id='container'>
                <Row>
                    <Col xl={12} lg={12} md={8} sm={12} xs={12}>

                        <h2 className="titlePrimary">Noticias</h2>

                        <form id="newsForm" method="post" encType="multipart/form-data" onSubmit={this.createNews}>

                            <FormGroup>
                                <Form.Label className="label">Tit&uacute;lo</Form.Label>
                                <Form.Control type='text' name='titular' id='titular'
                                    onChange={(e) => this.onChangeNewsTitle(e.target.value)}
                                    value={this.state.noticias.Titular} onInput={() => {this.setState({titleError:''})}}>
                                </Form.Control>
                                {titleError?<div className="text-danger">{titleError}</div> :null}
                            </FormGroup>

                            <Form.Group>
                                <Form.Label className="label">Resumen</Form.Label>
                                <Form.Control as="textarea"
                                    onChange={(e) => this.onChangeNewsSummary(e.target.value)}
                                    value={this.state.noticias.Resumen} onInput={() => {this.setState({summaryError:''})}}>
                                </Form.Control>
                                {summaryError?<div className="text-danger">{summaryError}</div> :null}
                            </Form.Group>

                            <Form.Group controlId="IdCategoria">
                                <Form.Label className="label">Categor&iacute;a</Form.Label>
                                <Form.Control as="select">
                                    {categorias == null ? null
                                    :categorias.map((item, index) => <option key={index} value={item.IdCategoria}>{item.NombreCategoria}</option>)}
                                </Form.Control>
                            </Form.Group>

                            <FormGroup>                                
                                <Form.Label className="label">Portada</Form.Label>
                                <Form.File id="portada" name="portada" accept="image/*" onChange={(e) => this.getImage(e)}
                                onInput={() => {this.setState({imageError:''})}}/>
                                {imageError?<div className="text-danger">{imageError}</div> :null}
                            </FormGroup>

                            <FormGroup>
                                <ReactQuill
                                    ref={(el) => this.quill = el}
                                    value={this.state.noticias.Contenido}
                                    onChange={(e) => this.onChangeNewsContent(e)}
                                    theme='snow'
                                    modules={this.modules}
                                    formats={this.formats}
                                    id='content'>
                                </ReactQuill>
                            </FormGroup>

                            <div className = "d-flex align-items-center header">
                                <FormGroup className="button">
                                    <Button className="btn btn-primary" type="submit" form="newsForm">Guardar borrador</Button>
                                </FormGroup>
                            </div>

                        </form>

                    </Col>

                    {/* <Col xl={3} lg={3} md={4} sm={12} xs={12}>
                        <Card>
                            <Card.Header>
                                Configuración noticia
                            </Card.Header>
                            
                            <Card.Body>
                                <FormGroup>
                                    <Form.Label className="">Publicar</Form.Label>
                                    <Form.Control as='select' name='idestado' id='idestado'
                                        onChange={(e) => this.onChangeNewsPublish(parseInt(e.target.value))}
                                        // value={this.state.news.isPublish}
                                        >
                                        <option value='1'>No publicar</option>
                                        <option value='2'>Publicar</option>
                                    </Form.Control>
                                </FormGroup>

                                <FormGroup>
                                    <Button className = "btn btn-secondary"  onClick={(e) => console.log(this.state.noticias)}>
                                        Guardar
                                    </Button>
                                </FormGroup>
                            </Card.Body>
                        </Card>
                    </Col> */}
                </Row>
            </Container>
        )
    }
}

export default NewsEdit;