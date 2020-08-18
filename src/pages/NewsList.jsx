import React, {Component} from 'react';
import axios from 'axios'
import {Container} from 'react-bootstrap'
import NewsCards from '../components/NewsCards'
import NavsCategory from '../components/NavsCategory'
import '../pages/NewsList.css'
import PaginationF from '../components/Pagination'


export default class News extends Component {

    state = {
        loading: true,
        noticias: [],
        categorias: [],
        search: '',
        currentCategory: 0,
        activePage: 0
    }

    componentDidMount() {
        axios.get("api/noticias")
        .then(res => {
            this.setState({noticias: res.data})
        })
        axios.get("api/categorias")
        .then(res => {
            this.setState({categorias: res.data})
        })
        .finally(() => {
            this.setState({loading: false})
        })
    }

    onCategorySelected = (IdCategoria) => {
        this.setState({loading: true, currentCategory: IdCategoria})
        axios.get("api/noticias/getallnoticias")
        .then(res => {
            this.setState({noticias: res.data.filter(item => item.IdCategoria === IdCategoria)})
        })
        .finally(() => {
            this.setState({loading: false})
        })
    }

    onSearchNews = (e) => {

        e.preventDefault()
        this.setState({loading: true, currentCategory: 0})
        axios.get("api/noticias/getallnoticias")
        .then(res => {
            this.setState({noticias: res.data.filter(item => item.Titular.toLowerCase().includes(this.state.search))})
        })
        .finally(() => {
            this.setState({loading: false})
        });
    }

    newsDeleteRequest = (e) => {
        if(window.confirm("¿Desea eliminar esta noticia?")) {
            this.newsDelete(parseInt(e.target.value))
        }
    }

    newsDelete(IdNoticia) {
        axios.delete(`api/noticias/${IdNoticia}`)
        .then(() => {
            this.setState({
                data: this.state.data.filter(item => item.IdNoticia !== IdNoticia)
            })
        })
    }

    render() {
        const {noticias, loading, categorias, search, currentCategory, activePage} = this.state;

        return (

            <Container className="container">

                <div className="navsCategory">
                    <NavsCategory categorias={categorias} categorySelected={this.onCategorySelected} 
                        currentCategory={currentCategory}>
                    </NavsCategory>
                </div>

                <div>
                    <form onSubmit={this.onSearchNews} className="formSearch">
                        <input  value={this.state.search} className="form-control txtSearch" 
                            onChange={(event)=>{
                                this.setState({search: event.target.value})
                            }}
                        />
                        <button type="submit" className="btn btn-primary btnSearch" >
                        <span>Buscar</span>
                        </button>
                    </form>
                </div>

                {loading? "Cargando...": noticias.map((item, index) => <div key={index}>
                    <NewsCards noticia={item}/>
                </div>)}

                <div className="pagination">
                    {<PaginationF activePage={activePage} onSelectedPage={this.goToPage}/>}
                </div>

            </Container>

        )
    }
    
    goToPage = (page) => {
        this.setState({activePage: page})
        let numPage = page;
        if(numPage == 1) {
            numPage = 0;
        }
        axios.get(`api/noticias/?page=${page}`)
        .then(res => {
            if(res.data !== null) {
                this.setState({
                    noticias: res.data
                })
            }
        })
    }

}