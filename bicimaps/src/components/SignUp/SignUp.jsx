import '../Login/login.css'
import { Navbar } from '../Navbar/Navbar'
import { useState } from 'react';
import { postSignup } from '../utils/signup';
import { useNavigate } from 'react-router-dom';

const URL_SIGNUP = 'https://bicimaps.herokuapp.com/api/sign-up/';

function SignUp(){

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        email: '',
        first_name: '',
        last_name: '',
        has_bike: '',
        password: '',
        birth_date: '2002-03-01',
        occupation: '',
        university: '',
        password_confirmation: ''
    })

    const [validSignUp, setValidSignUp] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })

    }

    const validatePassword = () => {
        if(userInfo.password === userInfo.password_confirmation){
            return true;
        }
        alert('Las contraseñas no coinciden');
        setError('Las contraseñas no coinciden');
        return false;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        console.log(userInfo);

        if(!validatePassword()){
            return;
        }
        const parsedUserInfo = JSON.stringify(userInfo);
        postSignup(URL_SIGNUP, parsedUserInfo)
            .then(( data ) => {
                if(data){
                        setValidSignUp(true);
                        navigate('/login');     
                    }
                else{
                    setError('La contraseña debe tener al menos 8 caracteres');
                }
        }
        ).catch((error) => {
            console.log(error);
        })
    }
    return(
        <>
            <Navbar/>
            <div className="form_box wrapper">
                <form onSubmit={handleSubmit}>

                    <div className="input_box">
                        <input value={userInfo.email} name='email' onChange={handleInputChange} type="email" placeholder='Correo Electrónico' required/>
                    </div>

                    <div className="input_box">
                        <input value={userInfo.first_name} name='first_name' onChange={handleInputChange} type="text" placeholder='Nombres' required/>
                    </div>

                    <div className="input_box">
                        <input value={userInfo.last_name} name='last_name' onChange={handleInputChange} type="text" placeholder='Apellido' required/>
                    </div>

                    <div className="input_box">
                        <select name='has_bike' value={userInfo.has_bike} onChange={handleInputChange}  id='has_bike_field'>
                            <option value="">¿Tienes bici?</option>
                            <option value="True">Sí</option>
                            <option value="False">No</option>
                        </select>
                    </div>
                    <div className="input_box">
                        <input value={userInfo.password} name='password' onChange={handleInputChange} placeholder='Contraseña' type="text"/>
                    </div>

                    <div className="input_box">
                        <input value={userInfo.password_confirmation} name='password_confirmation' onChange={handleInputChange} placeholder='Confirmar contraseña' type="text"/>
                    </div>
                    {error ? <p style={{color:'red'}} >{error}</p>: null}
                    <button type="submit" className="btn-ing">Registrarme</button>

                </form>
            </div>
        </>
    )
}

export { SignUp }