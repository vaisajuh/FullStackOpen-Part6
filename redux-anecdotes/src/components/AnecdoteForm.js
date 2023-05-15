import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      /*
      dispatch({ type: 'anecdotes/createAnecdote', payload: content })
      */
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch({ type: 'anecdotes/appendAnecdote', payload: newAnecdote })
      dispatch({ type: 'notification/notificationReducer', payload: content })
      setTimeout(() => {
        dispatch({ type: 'notification/notificationReducer', payload: '' })
      }, 5000)
    }
    
  return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
      )
}

export default AnecdoteForm