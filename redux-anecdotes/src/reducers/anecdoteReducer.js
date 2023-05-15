import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSLice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increase(state, action) {
      const id = action.payload
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

export const { createAnecdote, increase, appendAnecdote, setAnecdotes } = anecdoteSLice.actions
export default anecdoteSLice.reducer