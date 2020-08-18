import React from 'react'


export default function UserModal ({onClose, onAccept, userError, onNameChanged, onLastNameChanged, onEmailChanged, onPasswordChanged, onRolChanged,
    userName, userLastName, userEmail, userPassword, userRol, userId}) {
    
    // const categoryNameHasError = categoryNameError !== ''

    const userSubmit = (e) => {
        e.preventDefault();
        const userId = e.target.elements["userId"].value;
        const userName = e.target.elements["userName"].value;
        const userLastName = e.target.elements["userLastName"].value;
        const userEmail = e.target.elements["userEmail"].value;
        const userPassword = e.target.elements["userPassword"].value;
        const userRol = e.target.elements["userRol"].value;

        onAccept({
            IdUsuario: userId,
            NombreUsuario: userName,
            Apellidos: userLastName,
            Email: userEmail,
            Contraseña: userPassword,
            IdRol: userRol
        })
        
    }

    return (

        <div  className="modal fade show"  style={{display:'block'}} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modalLabel">Agregar usuario</h5>
                    <button type="button" className="close" onClick = {onClose} data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    
                    <form className = 'form-group' id = 'userForm' onSubmit = {userSubmit} method = 'post'>
                        <div className = 'form-group'>

                            <input type="hidden" name = "userId" id = "userId" className = 'form-control' value = {userId}></input>

                            <label htmlFor = "userName">Nombre</label>
                            <input name = "userName" id = "userName" className = {userError.nameError ? 'form-control is-invalid' : 'form-control'}
                                onChange = {onNameChanged} value = {userName}>     
                            </input>
                            {userError.nameError ? <div className="invalid-feedback">{userError.nameError}</div> : null}

                            <label htmlFor = "userLastName">Apellidos</label>
                            <input name = "userLastName" id = "userLastName" className = {userError.lastNameError ? 'form-control is-invalid' : 'form-control'}
                                onChange = {onLastNameChanged} value = {userLastName}>     
                            </input>
                            {userError.lastNameError ? <div className="invalid-feedback">{userError.lastNameError}</div> : null}

                            <label htmlFor = "userEmail">Email</label>
                            <input name = "userEmail" id = "userEmail" className = {userError.emailError ? 'form-control is-invalid' : 'form-control'}
                                onChange = {onEmailChanged} value = {userEmail}>     
                            </input>
                            {userError.emailError ? <div className="invalid-feedback">{userError.emailError}</div> : null}

                            <label htmlFor = "userPassword">Contraseña</label>
                            <input type="password" name = "userPassword" id = "userPassword"
                                className = {userError.passwordError ? 'form-control is-invalid' : 'form-control'} onChange = {onPasswordChanged} value = {userPassword}>     
                            </input>
                            {userError.passwordError ? <div className="invalid-feedback">{userError.passwordError}</div> : null}

                            <label htmlFor = "userRol">Rol</label>
                            {/* <ComboBox name="userRol" id="userRol" value = {userRol} onChange = {onRolChanged}></ComboBox> */}
                            <select name="userRol" id="userRol" className = {'form-control'} value = {userRol} onChange = {onRolChanged}>

                                <option value="2">Estandar</option>
                                <option value="3">Editor</option>
                                <option value="1">Administrador</option>
                            </select>

                        </div>
                    </form>

                </div>

                <div className="modal-footer">
                    <button type="button" className = "btn btn-secondary" data-dismiss="modal" onClick = {onClose}>Cerrar</button>
                    <button type="submit" className = "btn btn-primary" form = "userForm">Guardar</button>
                </div>
                </div>
            </div>
        </div>

    )
}

 