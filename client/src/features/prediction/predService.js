import axios from 'axios'

// api url
const API_URL = 'api/stockanalyser/'

// get stock prediction
const getPrediction = async (symbol, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, symbol ,config)
    return response.data
}
const predService = {
    getPrediction
}
export default predService