import axios from 'axios';



async function postSignup(URL, signudpData) {

    try{
        const { data } = await axios.post(URL, signudpData, {
                        headers : {
                            'Content-Type': 'application/json',
                        }})
        console.log(data)
        return data

        }
    catch(error){
        console.log(error)
        return null
    }

}

export { postSignup }