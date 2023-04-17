import '../Login/login.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Navbar({ loggedIn, userName }){
    return(
        <section>
                <header>
                    <a href="/" className="logo"> <img src= {logo} width="20%"/></a>
                    <nav className="navBar">
                        <Link to="/"> Inicio </Link>
                        {loggedIn ? <Link to="/map"> Mapa </Link>: null}
                        {!loggedIn ? <Link to="/signup"> Registrarse </Link>:null}
                        <Link to="https://github.com/andresaris1/ppi_01" target='_blank'> Repositorio </Link>
                        { !loggedIn ? <Link to="/login" >Ingresar</Link> : <h3>{userName}</h3>}
                    </nav>
                </header>
        </section>
    )
}

export { Navbar }