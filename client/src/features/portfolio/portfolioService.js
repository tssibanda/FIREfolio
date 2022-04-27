import axios from 'axios'

// api url
const API_URL = 'api/portfolio/'

// add new holding
const addHolding = async (stockData, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, stockData, config)

    return response.data
}

// get user portfolio
const getPortfolio = async (token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// delete a holding
const deleteHolding = async (holdingId, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + holdingId, config)

    return response.data
}

const portfolioService = {
    addHolding,
    getPortfolio,
    deleteHolding,
}

export default portfolioService