import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/authApi'
import { scrapsApi } from './scraps/scrapsApi'

export const makeStore = () => {
  return configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [scrapsApi.reducerPath]: scrapsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, scrapsApi.middleware),
  })
}