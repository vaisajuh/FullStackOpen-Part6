import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      notificationReducer(state, action) {
        return action.payload
      }
    }
})


export const { notificationReducer } = notificationSlice.actions
export default notificationSlice.reducer
