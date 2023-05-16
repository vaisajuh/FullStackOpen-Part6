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

export const setNotification = (message, duration) => {
  return async dispatch => {
    dispatch(notificationReducer(message))
    setTimeout(() => {
      dispatch(notificationReducer(''))
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
