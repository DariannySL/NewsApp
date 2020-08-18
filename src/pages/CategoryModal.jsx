import React from 'react'

export default function CategoryModal ({onClose, onAccept, categoryNameError, onCategoryNameChanged, categoryName}) {
    
    const categoryNameHasError = categoryNameError !== ''

    const categorySubmit = (e) => {
        e.preventDefault();
        const categoryName = e.target.elements["categoryName"].value;

        onAccept({
            NombreCategoria: categoryName
        })
    }

    return (

        <div  className="modal fade show"  style={{display:'block'}} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modalLabel">Agregar categorias</h5>
                    <button type="button" className="close" onClick = {onClose} data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    
                    <form className = 'form-group' id = 'categoryForm' onSubmit = {categorySubmit} method = 'post'>
                        <div className = 'form-group'>

                            <label htmlFor = "categoryName">Nombre</label>
                            <input name = "categoryName" id = "categoryName" className = {categoryNameHasError ? 'form-control is-invalid' : 'form-control'}
                                onChange = {onCategoryNameChanged} value = {categoryName}>     
                            </input>

                            {categoryNameHasError ?
                                <div className = "invalid-feedback">
                                    {categoryNameError}
                                </div> :null}
                        </div>
                    </form>

                </div>

                <div className="modal-footer">
                    <button type="button" className = "btn btn-secondary" data-dismiss="modal" onClick = {onClose}>Cerrar</button>
                    <button type="submit" className = "btn btn-primary" form = "categoryForm">Guardar</button>
                </div>
                </div>
            </div>
        </div>

    )
}

 