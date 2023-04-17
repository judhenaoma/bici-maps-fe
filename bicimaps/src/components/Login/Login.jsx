import React, { useState } from 'react';
import './login.css';
import { Navbar } from '../Navbar/Navbar';
import { postLogin } from '../utils/auth';
import { useNavigate} from 'react-router-dom';

const URL_LOGIN = 'https://bicimaps.herokuapp.com/api/login/';

function Login( { setLoggedIn }){

    const navigate = useNavigate();

    const [credentials , setCredentials] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    

    const handleChange = (e) => {

        setCredentials({...credentials, 
            [e.target.name]: e.target.value})
        
        console.log(credentials)

        }

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedCredentials = JSON.stringify(credentials);
        postLogin(URL_LOGIN, parsedCredentials)
            .then(( data ) => {
                console.log(data);
                if(data?.access){
                    setLoggedIn(true);
                    navigate('/map')
                }
                else{
                    setError('Usuario o contraseña incorrectos');
                }
            }
        )
    }
    return(
        <>
            <Navbar/>
            <div className="wrapper">
                <div className="form_box login"> 
                <h2>Bienvenid@</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input_box">
                            <input name="email" 
                                type="email" 
                                value={credentials.email}
                                onChange = {handleChange} 
                                required/>
                                {credentials.email === "" ? 
                                    (<label> Email</label>) : 
                                    null
                                }
                        </div>
                        <div className="input_box">
                            <input type="password" 
                                name="password" 
                                value={credentials.password}
                                onChange = {handleChange} 
                                required/>
                                
                            {credentials.password === '' ? (<label> Contraseña</label>) : null}
                        </div>
                        <div className="recordarCuenta">
                            <label><input type="checkbox" disabled/> Recordarme</label>
                            <a href="#">Olvidaste la contraseña?</a>
                        </div>
                        {error ? <p className="error">{error}</p> : null}
                        <button type="submit" className="btn-ing">Ingresar</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export { Login }; 