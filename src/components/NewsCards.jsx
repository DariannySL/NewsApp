import React from 'react'
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../components/NewsCards.css'
import NewsList from '../pages/NewsList'

export default function NewsCards({noticia}) {

    return(

        <Card className="card">

            <Link to={{
                pathname: 'news2/' + noticia.IdNoticia,
                state: {news: noticia}
            }}>
                <Card.Img className="image" variant="top" src={noticia.Portada}></Card.Img>
            </Link>

            <Card.Body>

                <Card.Title>{noticia.Titular}</Card.Title>

                <Card.Text>
                    {noticia.Resumen}
                </Card.Text>

                <Link to={{
                    pathname: 'news2/' + noticia.IdNoticia,
                    state: {news: noticia}
                }}>
                    <Button style={{width: '100%'}} variant="primary">Leer m&aacute;s</Button>
                </Link>

            </Card.Body>
        </Card>
        
    )
}