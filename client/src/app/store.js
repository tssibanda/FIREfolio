import { configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import portfolioReducer from '../features/portfolio/portfolioSlice';
import predictionReducer from '../features/prediction/predSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    portfolio: portfolioReducer,
    predictions: predictionReducer,
  },
});
