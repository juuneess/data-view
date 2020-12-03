import { combineReducers } from '@reduxjs/toolkit'

import dataViewReducer from '../src/components/dataView/dataViewSlice'
// import serviceReducer from '../features/service/serviceSlice'
// import serviceHistoryReducer from '../features/service/serviceHistorySlice'
// import serviceModalsReducer from '../features/service/serviceModalsSlice'
// import windowServiceReducer from '../features/service/windowServiceSlice'
// import confirmModalReducer from '../components/Modal/confirmModalSlice'

// import ndlReducer from '../features/service/ndlSlice'



const rootReducer = combineReducers({
  dataView : dataViewReducer,
  // service : serviceReducer,
  // serviceHistory : serviceHistoryReducer,
  // serviceModals : serviceModalsReducer,
  // windowService : windowServiceReducer,
  // confirmModal : confirmModalReducer,

  // ndlReducer : ndlReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
