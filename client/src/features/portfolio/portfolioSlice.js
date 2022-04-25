import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// import portfolio service
import portfolioService from './portfolioService'


const initialState = {
    holdings:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// add stock holding
export const addHolding = createAsyncThunk('holdings/create', async (stockData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return portfolioService.addHolding(stockData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get stock holdings
export const getPortfolio = createAsyncThunk('portfolio/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return portfolioService.getPortfolio(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)       
    }
})

export const portfolioSlice = createSlice({
    name: 'holding',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addHolding.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addHolding.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.holdings.push(action.payload)
            })
            .addCase(addHolding.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPortfolio.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPortfolio.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.holdings = action.payload
            })
            .addCase(getPortfolio.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = portfolioSlice.actions
export default portfolioSlice.reducer