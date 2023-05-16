import anecdoteService from '../services/anecdotes'
import { createSlice } from '@reduxjs/toolkit'

const anecdoteSLice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increase(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(n => n.id === id)

      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      let newList = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
        )
      newList.sort(function(a,b){return b.votes-a.votes})
      return newList
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { increase, appendAnecdote, setAnecdotes } = anecdoteSLice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort(function(a,b){return b.votes-a.votes})
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = content => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(content.id, content)
    dispatch(increase(updatedAnecdote))
 }
}

export default anecdoteSLice.reducer