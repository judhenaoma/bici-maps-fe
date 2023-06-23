import { useContext, useEffect } from 'react'
import { useAxios } from '../utils/useAxios'
import { AppContext } from '../../context/AppContext'


function Profile () { 
    const { user, setUser } = useContext(AppContext)
    const api = useAxios()

    useEffect( () => {

        const getProfileInfo =  async () => {
           const response = await api.get('https://bicimaps.herokuapp.com/api/user-detail/')
            if(response.status === 200){
                setUser(response.data)
            } 
        }
        getProfileInfo()

    }, [] )

    return(
        <div className='text-center mt-12'>
            <h1 className='font-extrabold text-lg' >Bienvenido, {user.first_name} {user.last_name}</h1>
            <i>Email registrado: {user.email}</i>
            <hr className='mt-3' />
        </div>
    )
}

export { Profile }