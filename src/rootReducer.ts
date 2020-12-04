import { combineReducers } from '@reduxjs/toolkit'

import dataViewReducer from '../src/components/dataView/dataViewSlice'
import modalReducer from '../src/components/modal/modalSlice'

const rootReducer = combineReducers({
  dataView : dataViewReducer,
  modal : modalReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
