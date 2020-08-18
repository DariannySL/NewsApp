import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {Container, Row, Col, Card, FormGroup, Button, Form} from 'react-bootstrap'

export default function MyNewsEdit ({selectedNewsUser, onClose, onAccept, newsTitle, newsSummary, newsContent, newsCategory, newsPortada, categorias,
    onNewsTitleChanged, onNewsSummaryChanged, onNewsContentChanged, onNewsCategoryChanged, onNewsPortadaChanged}) {
   
    const newsSubmit = (e) => {
        e.preventDefault();
        const newsTitle = e.target.elements["newsTitle"].value;
        const newsSummary = e.target.elements["newsSummary"].value;
        const newsCategory = e.target.elements["newsCategory"].value;
        const newsPortada = e.target.elements["newsPortada"].value;
        const newsContent = e.target.elements["newsContent"].value;


        onAccept({
            Titular: newsTitle,
            Resumen: newsSummary,
            IdCategoria: newsCategory,
            Portada: newsPortada,
            Contenido: newsContent
        })
    }

    const modules = {
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

    const formats = [
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
   
    return (

        <div className="modal fade show"  style={{display:'block'}} role="dialog">
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">Actualizar categorias</h5>
                <button type="button" className="close" onClick = {onClose} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                
                <Form className='form-group' id='newsForm' onSubmit={newsSubmit} method='post'>
                    <div className='form-group'>

                        <FormGroup>
                            <Form.Label htmlFor="userTitle">Titular</Form.Label>
                            <Form.Control type='text' name="userTitle" id="userTitle" className='form-control' required
                                onChange={onNewsTitleChanged} value={newsTitle}>     
                            </Form.Control>
                        </FormGroup>

                        <Form.Label htmlFor="newsSummary">Resumen</Form.Label>
                        <Form.Control as='textarea' name="newsSummary" id="newsSummary" className='form-control' required
                            onChange={onNewsSummaryChanged} value={newsSummary}>     
                        </Form.Control>

                        <Form.Label htmlFor="newsCategory">Categoria</Form.Label>
                        <Form.Control as="select" name="newsCategory" id="newsCategory" className='form-control' required
                            onChange={onNewsCategoryChanged} defaultValue={selectedNewsUser.IdCategoria}> 
                                {categorias == null ? null
                                :categorias.map((item, index) => <option key={index} value={item.IdCategoria}>{item.NombreCategoria}</option>)}
                        </Form.Control>

                        <Form.Label htmlFor="newsPortada">Portada</Form.Label>
                        <Form.Control type="file" class="form-control-file" id="newsPortada" name="newsPortada" required
                            onChange={onNewsPortadaChanged}> value={newsPortada}
                        </Form.Control>

                        <Form.Label htmlFor="newsContent">Contenido</Form.Label>
                        <ReactQuill name="newsContent" id="newsContent"
                            onChange={onNewsContentChanged} value={newsContent} theme='snow' modules={this.modules}
                            formats={this.formats}>
                        </ReactQuill>

                    </div>
                </Form>

            </div>

            <div className="modal-footer">
                <button type="button" className = "btn btn-secondary" data-dismiss="modal" onClick = {onClose}>Cerrar</button>
                <button type="submit" className = "btn btn-primary" form = "newsForm">Guardar</button>
            </div>
            </div>
        </div>
    </div>


    )

}
