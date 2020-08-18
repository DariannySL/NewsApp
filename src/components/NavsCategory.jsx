import React from 'react';
import {Nav} from 'react-bootstrap';

export default function NavsCategory ({categorias, categorySelected, currentCategory}) {
    return(
        <Nav variant="tabs" activeKey={currentCategory}>
            
            {categorias !== null? categorias.map((item, index) =>
                <Nav.Item key={index}>
                    <Nav.Link eventKey={item.IdCategoria} onClick={() => {
                        categorySelected(item.IdCategoria)
                    }}>{item.NombreCategoria}</Nav.Link>
                </Nav.Item>
            ): null}
            
        </Nav>
    )
}