import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
    let anecdotes = useSelector(state => {
      if ( state.filter === 'ALL' ) {
        return state.anecdotes
      }
      return state.anecdotes.filter(anecdote =>
        anecdote.content.toLocaleLowerCase().includes(state.filter.toLocaleLowerCase()))
    })
       
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
      dispatch({ type: 'anecdotes/increase', payload: anecdote.id })
      dispatch({ type: 'notification/notificationReducer', payload: 'you voted: ' + anecdote.content })
      setTimeout(() => {
        dispatch({ type: 'notification/notificationReducer', payload: '' })
      }, 5000)
    }

    return (
        <div>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        </div>
    )
}

export default AnecdoteList