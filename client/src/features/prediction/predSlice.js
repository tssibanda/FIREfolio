import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// import prediction service
import predService from './predService'

const initialState = {
    predictions:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// get stock holdings
export const getPrediction = createAsyncThunk('stock/predict', async (symbol, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return predService.getPrediction(symbol,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)       
    }
})

export const predSlice = createSlice({
    name: 'prediction',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPrediction.pending, (state) => {
                state.isLoading = true
                state.predictions =[]
            })
            .addCase(getPrediction.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.predictions = action.payload
                // state.predictions.push(action.payload)
            })
            .addCase(getPrediction.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = predSlice.actions
export default predSlice.reducer