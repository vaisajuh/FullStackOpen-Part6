import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    let anecdotes = useSelector(state => {
      if ( state.filter === 'ALL' ) {
        return state.anecdotes
      }
      return state.anecdotes.filter(anecdote =>
        anecdote.content.toLocaleLowerCase().includes(state.filter.toLocaleLowerCase()))
    })
       
    const dispatch = useDispatch()
  
    const vote = async (anecdote) => {
      let temp = {content: anecdote.content, id: anecdote.id, votes: anecdote.votes + 1}
      dispatch(updateAnecdote(temp))
      dispatch(setNotification(`you voted '${temp.content}'`, 5))
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