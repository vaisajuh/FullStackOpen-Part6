import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSLice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    },
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
    }
  }
})

/*
const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch(action.type) {
    case 'CREATE ANECDOTE':
      return [...state, action.payload]
    case 'INCREASE':
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
      
    default:
      return state
    }
  } 

export const increase = (id) => {
  return {
    type: 'INCREASE',
    payload: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE ANECDOTE',
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

*/

export const { createAnecdote, increase } = anecdoteSLice.actions
export default anecdoteSLice.reducer