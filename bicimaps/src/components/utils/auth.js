import axios from 'axios';



async function postLogin(URL, loginData) {

    try{
        const { data } = await axios.post(URL, loginData, {
                        headers : {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true})
        console.log(data)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`
        return data
        }
    catch(error){
        console.log(data)
        return null
    }
    
}

export { postLogin }