
import { useDispatch, useSelector } from 'react-redux'
import { increase} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    let anecdotes = useSelector(state => state)
    anecdotes = anecdotes.sort(function(a,b){return b.votes-a.votes})
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(increase(id))
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        </div>
    )
}

export default AnecdoteList