import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IModal, Modes} from './ModalTypes';


const initialState: IModal = {
    mode : Modes.create,
    show : true
}

const modalReducer = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        setMode(state, {payload}: PayloadAction<Modes>){
            state.mode = payload
        },
        setModalShow(state, {payload}: PayloadAction<boolean>){
            state.show = payload
        }
    }
})

export const {
    setMode,
    setModalShow
} = modalReducer.actions

export default modalReducer.reducer
