import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import parse from 'html-react-parser'
import {Container} from 'react-bootstrap'
import '../pages/ViewNews.css'
import Navs from '../components/NavsCategory'

class ViewNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            news: {},
            isLoaded: false,
        }

        console.log(this.props)
    }

    componentDidMount() {
        if(typeof this.props.location.state !== 'undefined') {

            if(this.props.location.state.hasOwnProperty('news')) {
                this.setState({ 
                    news: this.props.location.state.news
                }, () => {
                    this.setState({
                        isLoaded: true
                    })
                })
            }
        }
    }

    render(){
        
        if(this.state.isLoaded) {
            return (
                <Container>
                    <div className="news">
                        <div className="imageConteiner">
                            <img className="image2" 
                                src={this.state.news.Portada}
                                alt={this.state.news.Titular}>
                            </img>
                            <div className="newsInfo">
                                <h1 className="title">
                                    {this.state.news.Titular}
                                </h1>
                                <div className="date">
                                    {this.state.news.FechaPublicacion}
                                </div>
                            </div>
                        </div>

                        <div className="newsMain">
                            {parse(this.state.news.Contenido)}
                        </div>
                    </div>
                </Container>
            );
        }
        else {
            return (
                <div>
                    Cargando...
                </div>
            )
        }
    }
}

export default withRouter(ViewNews)